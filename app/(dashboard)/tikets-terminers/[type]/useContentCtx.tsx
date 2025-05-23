'use client';

import { getAllBonLivraisons } from '@/src/actions/tickets.actions';
import { BonLivraisonVM } from '@/types';
import { PaginatedResponse } from '@/types/models';
import { CalendarDate, RangeValue, Switch } from '@heroui/react';
import { useParams } from 'next/navigation';
import { Key, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const columns = [
    { name: 'Référence', uid: 'reference' },
    { name: 'Date et Heure', uid: 'date' },
    { name: 'Livreur', uid: 'livreur' },
    { name: 'Coût livraison', uid: 'coutLivraison' },
    { name: 'Coût commande', uid: 'coutCommande' },
    { name: "Commission", uid: 'commission' },
    { name: "Commission (Montant fixe)", uid: 'commssionFixe' },
    { name: 'Terminé', uid: 'statut' },
];

interface Props {
    initialData: PaginatedResponse<BonLivraisonVM> | null;
    restaurantId?: string;
}

export default function useContentCtx({ initialData, restaurantId }: Props) {
    const { type } = useParams();
    const [isLoading, setIsLoading] = useState(!initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [data, setData] = useState<PaginatedResponse<BonLivraisonVM> | null>();

    useEffect(() => {
        mapData(initialData)
    }, [initialData])

    const [dates, setDates] = useState<RangeValue<CalendarDate> | null>(null);

    const handleDateChange = (value: RangeValue<CalendarDate>) => {
        if (value.start && value.end) {
            const newDates = {
                start: value.start,
                end: value.end,
            };
            setDates((state) => newDates);
            handlePageChange(1);
        }
    };
    const handlePageChange = (page: number) => {
        setCurrentPage((state) => page);
    };

    useEffect(() => {
        const fetchData = async () => {
            if ((dates?.start && dates?.end) || currentPage || pageSize) {
                setIsLoading(true);
                try {
                    const newData = await getAllBonLivraisons(restaurantId ?? '', currentPage - 1, pageSize, { dates: { start: dates?.start?.toString() ?? '', end: dates?.end?.toString() ?? '' } });
                    mapData(newData)
                } catch (error) {
                    toast.error('Erreur lors de la récupération des données');
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchData();
    }, [dates?.start, dates?.end, currentPage, pageSize, restaurantId]);

    const mapData = (result: PaginatedResponse<BonLivraisonVM> | null) => {
        const data = result?.content.filter((item: BonLivraisonVM) => item.statut === "TERMINER" as any);
        (data && result) && setData({ ...result, content: data })

    }

    const renderCell = useCallback((bonLivraison: BonLivraisonVM, columnKey: Key) => {
        const cellValue = bonLivraison[columnKey as keyof BonLivraisonVM];
        if (columnKey === "commission" && type === "commision-en-pourcentage") {
            return <p className='text-blue-600'>{' 0 (10% CC)'}</p>;
        } else if (columnKey === "commssionFixe" && type === "commision-en-montant-fixe") {
            return <p className='text-purple-600'>{'0 FCFA'}</p>;
        } else {
            switch (columnKey) {
                case 'livreur':
                    return <p>{cellValue?.toString() ?? '-'}</p>;
                case 'coutLivraison':
                    return <p>{String(cellValue) + ' FCFA'}</p>;
                case 'coutCommande':
                    return <p>{String(cellValue) + ' FCFA'}</p>;
                case 'statut':
                    return cellValue == 'TERMINER' ? <Switch size="sm" color="primary" readOnly isSelected /> : <Switch size="sm" isSelected={false} readOnly />;
                default:
                    return cellValue;
            }
        }


    }, []);

    return {
        renderCell,
        columns,
        data,
        handlePageChange,
        currentPage,
        isLoading,
        handleDateChange,
        type
    };
}
