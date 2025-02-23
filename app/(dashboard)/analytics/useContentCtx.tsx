'use client';

import { ChiffreAffaireRestaurant } from '@/types/statistiques.model';
import { useState } from 'react';
import { TbMoneybag, TbChartBar, TbReceipt, TbClock, TbTrendingUp, TbCheck, TbHourglass } from 'react-icons/tb';
import { formatNumber } from '@/utils/formatNumber';

interface Props {
    initialData: ChiffreAffaireRestaurant;
}

export default function useContentCtx({ initialData }: Props) {
    const [isLoading, setIsLoading] = useState(!initialData);
    const [data, setData] = useState<ChiffreAffaireRestaurant>(initialData);

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
        },
    ];

    return {
        data,
        isLoading,
        orderStatusData,
        statCards,
        detailCards,
        totalOrders,
        totalRevenue,
        totalCommission,
    };
}
