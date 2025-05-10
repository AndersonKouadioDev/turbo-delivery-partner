import { SORT_OPTIONS } from "@/data";
import { getPaginationCourseExterne } from "@/src/actions/courses.actions";
import { CourseExterne, PaginatedResponse, Restaurant } from '@/types/models';
import { useState, useEffect } from "react";



export function useContentCtx(initialData: PaginatedResponse<CourseExterne> | null, restaurant: Restaurant) {
    type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

    const getStatusColor = (statut: string) => {
        switch (statut?.toUpperCase()) {
            case 'VALIDER':
                return 'warning';
            case 'TERMINER':
                return 'success';
            case 'ANNULER':
                return 'danger';
            case 'EN_ATTENTE':
                return 'secondary';
            default:
                return 'default';
        }
    };

    const getCommandeStatusColor = (statut: string) => {
        switch (statut?.toUpperCase()) {
            case 'EN_ATTENTE_VERSEMENT':
                return 'warning';
            case 'TERMINER':
                return 'success';
            case 'ANNULER':
                return 'danger';
            case 'RECUPERER':
                return 'secondary';
            case 'EN_COURS_LIVRAISON':
                return 'secondary';
            default:
                return 'default';
        }
    };

    const getStatusBorderClass = (statut: string) => {
        switch (statut.toUpperCase()) {
            case 'VALIDER':
                return 'border-2 border-warning';
            case 'TERMINER':
                return 'border-2 border-success';
            case 'ANNULER':
                return 'border-2 border-danger';
            case 'EN_ATTENTE':
                return 'border-2 border-secondary';
            default:
                return 'border border-default';
        }
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState<SortOption>(SORT_OPTIONS.DATE_DESC);
    const [expandedDelivery, setExpandedDelivery] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [data, setData] = useState<PaginatedResponse<CourseExterne> | null>(initialData);
    const [dataFilter, setDataFilter] = useState<CourseExterne[]>(data?.content ?? []);
    const [isLoading, setIsLoading] = useState(!initialData);

    useEffect(() => {
        mapData(initialData)
    }, [initialData])

    const handleFilter = (status: string, _data?: PaginatedResponse<CourseExterne> | null) => {
        setIsLoading(true);
        setStatusFilter(status);

        if (status == 'all') {
            setDataFilter(data?.content ?? []);
        } else {
            const dd = typeof _data == 'undefined' ? data : _data;
            const dataFilter = dd?.content.filter((d) => d.statut?.toUpperCase() == status) ?? [];
            setDataFilter(dataFilter);
        }
        setIsLoading(false);
    };

    // Fonction de récupération des données
    const fetchData = async (page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        try {
            const newData = await getPaginationCourseExterne(restaurant.id ?? '', page - 1, pageSize);
            setData(newData);
            setStatusFilter('all');
            mapData(newData)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const mapData = (result: PaginatedResponse<CourseExterne> | null) => {
        const data = result?.content.filter((item: CourseExterne) => item.statut === "TERMINER" as any);
        data && setDataFilter(data)
    }
    console.log("data2", data)
    // Handlers

    const handleReset = () => {
        setSearchTerm('');
        setSortBy(SORT_OPTIONS.DATE_DESC);
        setCurrentPage(1);
    };

    const toggleExpand = (deliveryId: string) => {
        setExpandedDelivery(expandedDelivery === deliveryId ? null : deliveryId);
    };

    return {
        getStatusColor,
        handleReset,
        toggleExpand,
        searchTerm,
        statusFilter,
        sortBy,
        currentPage,
        dataFilter,
        isLoading,
        getStatusBorderClass,
        fetchData,
        handleFilter,
        getCommandeStatusColor,
        data,
        expandedDelivery
    }
}