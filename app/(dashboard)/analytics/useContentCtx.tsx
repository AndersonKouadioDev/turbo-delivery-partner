'use client';

import { ChiffreAffaireRestaurant } from '@/types/statistiques.model';
import { useCallback, useEffect, useState } from 'react';
import { TbMoneybag, TbChartBar, TbReceipt, TbClock, TbTrendingUp, TbCheck, TbHourglass } from 'react-icons/tb';
import { formatNumber } from '@/utils/formatNumber';
import { CalendarDate, RangeValue } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { getAllChiffreAffaire } from '@/src/actions/statistiques.action';

interface Props {
    initialData: ChiffreAffaireRestaurant;
}

export default function useContentCtx({ initialData }: Props) {
    const { data: authData } = useSession();
    const [isLoading, setIsLoading] = useState(!initialData);
    const [loader, setLoader] = useState<boolean>(false);
    const [data, setData] = useState<ChiffreAffaireRestaurant>(initialData);
    const [period, setPeriod] = useState(new Set(['customized']));

    const [dates, setDates] = useState<RangeValue<Date | null>>({
        start: null,
        end: null,
    });

    const handleDateChange = (value: RangeValue<CalendarDate>) => {
        setDates({
            start: value.start ? new Date(value.start.toString()) : null,
            end: value.end ? new Date(value.end.toString()) : null,
        });
        handleFetchData();
    };

    const handleFetchData = useCallback(async () => {
        setLoader(true);
        const data = await getAllChiffreAffaire({
            restaurantID: authData?.user.restauranID ?? '',
            dates: {
                start: dates.start,
                end: dates.end,
            },
        });

        if (data) {
            setData((state) => {
                return { ...state, ...data };
            });
        }

        setLoader(false);
    }, [dates.end, dates.start, authData?.user.restauranID]);

    // Calculate total orders and revenue
    const totalOrders = data.nbCommandeTotalTermine + data.nbCommandeTotalEnAttente + data.nbCommandeTotalInitie + data.nbCommandeTotalEnCours;

    const totalRevenue = data.commandeTotalTermine + data.commandeTotalEnAttente + data.commandeTotalInitie + data.commandeTotalEnCours;
    const totalCommission = data.commissionChiffreAffaire + data.commissionCommande;

    // Data for pie chart
    const orderStatusData = [
        { name: 'Terminées', value: data.nbCommandeTotalTermine, color: '#10B981' },
        { name: 'En Attente', value: data.nbCommandeTotalEnAttente, color: '#F59E0B' },
        { name: 'Initiées', value: data.nbCommandeTotalInitie, color: '#3B82F6' },
        { name: 'En Cours', value: data.nbCommandeTotalEnCours, color: '#6366F1' },
    ];

    const statCards = [
        {
            title: "Chiffre d'Affaires Total",
            value: formatNumber(totalRevenue),
            icon: TbTrendingUp,
            color: 'from-green-500 to-green-600',
        },
        {
            title: 'Commandes Totales',
            value: formatNumber(totalOrders),
            icon: TbReceipt,
            color: 'from-yellow-500 to-yellow-600',
        },
        {
            title: 'Commission Totale',
            value: formatNumber(totalCommission),
            icon: TbMoneybag,
            color: 'from-red-500 to-red-600',
        },
    ];

    const detailCards = [
        {
            title: 'Commandes Terminées',
            stats: [
                { label: 'Montant', value: formatNumber(data.commandeTotalTermine), icon: TbMoneybag },
                { label: 'Nombre', value: formatNumber(data.nbCommandeTotalTermine), icon: TbReceipt },
                { label: 'Livraison', value: formatNumber(data.fraisLivraisonTotalTermine), icon: TbChartBar },
            ],
            icon: TbCheck,
            color: 'bg-green-500',
            description: 'Pour les commandes livrées avec paiement reçu du livreur.',
        },
        {
            title: 'Commandes en Attente',
            stats: [
                { label: 'Montant', value: formatNumber(data.commandeTotalEnAttente), icon: TbMoneybag },
                { label: 'Nombre', value: formatNumber(data.nbCommandeTotalEnAttente), icon: TbReceipt },
                { label: 'Livraison', value: formatNumber(data.fraisLivraisonTotalEnAttente), icon: TbChartBar },
            ],
            icon: TbHourglass,
            color: 'bg-yellow-500',
            description: 'Pour les commandes livrées mais dont le paiement du livreur est en attente.',
        },
        {
            title: 'Commandes en Cours',
            stats: [
                { label: 'Montant Total', value: formatNumber(data.commandeTotalEnCours), icon: TbMoneybag },
                { label: 'Nombre', value: formatNumber(data.nbCommandeTotalEnCours), icon: TbReceipt },
                { label: 'Livraison', value: formatNumber(data.fraisLivraisonTotalEnCours), icon: TbChartBar },
            ],
            icon: TbHourglass,
            color: 'bg-violet-500',
            description: 'Pour les commandes actuellement prises en charge par un livreur.',
        },
        {
            title: 'Commandes Initiées',
            stats: [
                { label: 'Montant', value: formatNumber(data.commandeTotalInitie), icon: TbMoneybag },
                { label: 'Nombre', value: formatNumber(data.nbCommandeTotalInitie), icon: TbReceipt },
                { label: 'Livraison', value: formatNumber(data.fraisLivraisonTotalInitie), icon: TbChartBar },
            ],
            icon: TbClock,
            color: 'bg-blue-500',
            description: "Pour les commandes qui viennent d'être passées et qui n'ont pas encore été attribuées.",
        },
    ];

    return {
        data,
        isLoading: loader || isLoading,
        setIsLoading,
        orderStatusData,
        statCards,
        period,
        setPeriod,
        detailCards,
        totalOrders,
        totalRevenue,
        totalCommission,
        handleDateChange,
    };
}
