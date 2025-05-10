'use client';

import { ChiffreAffaireRestaurant } from '@/types/statistiques.model';
import { useCallback, useState } from 'react';
import { TbMoneybag, TbChartBar, TbReceipt, TbClock, TbTrendingUp, TbCheck, TbHourglass } from 'react-icons/tb';
import { formatNumber } from '@/utils/formatNumber';
import { CalendarDate, RangeValue } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { getAllChiffreAffaire } from '@/src/actions/statistiques.action';

interface Props {
    initialData: ChiffreAffaireRestaurant | null;
}

export default function useContentCtx({ initialData }: Props) {
    const { data: authData } = useSession();
    const [isLoading, setIsLoading] = useState(!initialData);
    const [loader, setLoader] = useState<boolean>(false);
    const [data, setData] = useState<ChiffreAffaireRestaurant | null>(initialData);
    const [period, setPeriod] = useState(new Set(['customized']));

    const [dates, setDates] = useState<RangeValue<CalendarDate> | null>(null);

    const handleFetchData = useCallback(
        async (dateRange = dates) => {
            setLoader(true);
            const data = await getAllChiffreAffaire({
                restaurantID: authData?.user.restauranID ?? '',
                dates: {
                    start: dateRange?.start?.toString() ?? '',
                    end: dateRange?.end?.toString() ?? '',
                },
            });

            if (data) {
                setData(data);
            }

            setLoader(false);
        },
        [authData?.user.restauranID],
    );

    const handleDateChange = (value: RangeValue<CalendarDate>) => {
        if (value.start && value.end) {
            const newDates = {
                start: value.start,
                end: value.end,
            };
            setDates(newDates);
            handleFetchData(newDates);
        }
    };
    // Calculate total orders and revenue
    const totalOrders = data && data.nbCommandeTotalTermine + data.nbCommandeTotalEnAttente + data.nbCommandeTotalInitie + data.nbCommandeTotalEnCours;

    const totalRevenue = data && data.commandeTotalTermine + data.commandeTotalEnAttente + data.commandeTotalInitie + data.commandeTotalEnCours;
    const totalCommission = data && data.commissionChiffreAffaire + data.commissionCommande;
    const totalFraisLivraison = data?.fraisLivraisonTotalTermine;

    // Data for pie chart
    const orderStatusData = [
        { name: 'Terminées', value: data && data.nbCommandeTotalTermine, color: '#10B981' },
        { name: 'En Attente', value: data && data.nbCommandeTotalEnAttente, color: '#F59E0B' },
        { name: 'Initiées', value: data && data.nbCommandeTotalInitie, color: '#3B82F6' },
        { name: 'En Cours', value: data && data.nbCommandeTotalEnCours, color: '#6366F1' },
    ];

    const statCards = [
        {
            title: "Chiffre d'Affaires Total",
            value: totalRevenue ? formatNumber(totalRevenue) : 0,
            icon: TbTrendingUp,
            color: 'from-green-500 to-green-600',
            url: '/delivery/commande-terminers'
        },
        {
            title: 'Commandes Totales',
            value: totalOrders ? formatNumber(totalOrders) : 0,
            icon: TbReceipt,
            color: 'from-yellow-500 to-yellow-600',
        },
        {
            title: 'Commission Totale',
            value: totalCommission ? formatNumber(totalCommission) : 0,
            icon: TbMoneybag,
            color: 'from-red-500 to-red-600',
        },
        {
            title: 'Total Frais Livraison Terminée',
            value: totalFraisLivraison ? formatNumber(totalFraisLivraison) : 0,
            icon: TbMoneybag,
            color: 'from-red-500 to-red-600',
            url: '/tikets-terminers'
        },
    ];

    const detailCards = [
        {
            title: 'Commandes Terminées',
            stats: [
                { label: 'Montant', value: data && data.commandeTotalTermine ? formatNumber(data.commandeTotalTermine) : 0, icon: TbMoneybag },
                { label: 'Nombre', value: data && data.nbCommandeTotalTermine ? formatNumber(data.nbCommandeTotalTermine) : 0, icon: TbReceipt },
                { label: 'Livraison', value: data && data.fraisLivraisonTotalTermine ? formatNumber(data.fraisLivraisonTotalTermine) : 0, icon: TbChartBar },
            ],
            icon: TbCheck,
            color: 'bg-green-500',
            description: 'Pour les commandes livrées avec paiement reçu du livreur.',
        },
        {
            title: 'Commandes en Attente',
            stats: [
                { label: 'Montant', value: data && data.commandeTotalEnAttente ? formatNumber(data.commandeTotalEnAttente) : 0, icon: TbMoneybag },
                { label: 'Nombre', value: data && data.nbCommandeTotalEnAttente ? formatNumber(data.nbCommandeTotalEnAttente) : 0, icon: TbReceipt },
                { label: 'Livraison', value: data && data.fraisLivraisonTotalEnAttente ? formatNumber(data.fraisLivraisonTotalEnAttente) : 0, icon: TbChartBar },
            ],
            icon: TbHourglass,
            color: 'bg-yellow-500',
            description: 'Pour les commandes livrées mais dont le paiement du livreur est en attente.',
        },
        {
            title: 'Commandes en Cours',
            stats: [
                { label: 'Montant Total', value: data && data.commandeTotalEnCours ? formatNumber(data.commandeTotalEnCours) : 0, icon: TbMoneybag },
                { label: 'Nombre', value: data && data.nbCommandeTotalEnCours ? formatNumber(data.nbCommandeTotalEnCours) : 0, icon: TbReceipt },
                { label: 'Livraison', value: data && data.fraisLivraisonTotalEnCours ? formatNumber(data.fraisLivraisonTotalEnCours) : 0, icon: TbChartBar },
            ],
            icon: TbHourglass,
            color: 'bg-violet-500',
            description: 'Pour les commandes actuellement prises en charge par un livreur.',
        },
        {
            title: 'Commandes Initiées',
            stats: [
                { label: 'Montant', value: data && data.commandeTotalInitie ? formatNumber(data.commandeTotalInitie) : 0, icon: TbMoneybag },
                { label: 'Nombre', value: data && data.nbCommandeTotalInitie ? formatNumber(data.nbCommandeTotalInitie) : 0, icon: TbReceipt },
                { label: 'Livraison', value: data && data.fraisLivraisonTotalInitie ? formatNumber(data.fraisLivraisonTotalInitie) : 0, icon: TbChartBar },
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
        dates,
    };
}
