'use client';

import { getAllBonLivraisons } from "@/src/actions/tickets.actions";
import { BonLivraisonVM } from "@/types";
import { PaginatedResponse } from "@/types/models";
import { CalendarDate, RangeValue, Switch } from "@heroui/react";
import { Key, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const columns = [
    { name: 'Référence', uid: 'reference' },
    { name: 'Date et Heure', uid: 'date' },
    { name: 'Livreur', uid: 'livreur' },
    { name: 'Restaurant', uid: 'restaurant' },
    { name: 'Coût livraison', uid: 'coutLivraison' },
    { name: 'Coût commande', uid: 'coutCommande' },
    { name: 'Terminé', uid: 'statut' },
];

interface Props {
    initialData: PaginatedResponse<BonLivraisonVM> | null;
    restaurantId?: string;
}

export default function useContentCtx({ initialData, restaurantId }: Props) {
    const [isLoading, setIsLoading] = useState(!initialData);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [data, setData] = useState<PaginatedResponse<BonLivraisonVM> | null>(initialData);

    const [dates, setDates] = useState<RangeValue<Date | null>>({
        start: null,
        end: null,
    });

    const handleDateChange = (value: RangeValue<CalendarDate>) => {
        setDates({
            start: value.start ? new Date(value.start.toString()) : null,
            end: value.end ? new Date(value.end.toString()) : null,
        });
    };


    // Fonction de récupération des données
    const fetchData = async (page: number) => {
        setCurrentPage(page);
        setIsLoading(true);
        try {
            const newData = await getAllBonLivraisons(restaurantId ?? "", page - 1, pageSize, { dates: { start: dates.start, end: dates?.end } });
            setData(newData);
        } catch (error) {
            toast.error('Erreur lors de la récupération des données');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(1)
    }, [dates.end, dates.start])

    const renderCell = useCallback((bonLivraison: BonLivraisonVM, columnKey: Key) => {
        const cellValue = bonLivraison[columnKey as keyof BonLivraisonVM];
        switch (columnKey) {
            case 'coutLivraison':
                return <p>{String(cellValue) + ' FCFA'}</p>;
            case 'coutCommande':
                return <p>{String(cellValue) + ' FCFA'}</p>;
            case 'statut':
                return cellValue == 'TERMINER' ? <Switch size="sm" color="primary" readOnly isSelected /> : <Switch size="sm" isSelected={false} readOnly />;
            default:
                return cellValue;
        }
    }, []);

    return {
        renderCell,
        columns,
        data,
        fetchData,
        currentPage,
        isLoading,
        handleDateChange
    };
}
