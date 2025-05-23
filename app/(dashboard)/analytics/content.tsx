'use client';
import { Card, CardBody, CardHeader, Tooltip, DateRangePicker, RangeValue, CalendarDate } from '@heroui/react';
import { title } from '@/components/primitives';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartConfig } from '@/components/ui/chart';
import { ChiffreAffaireRestaurant } from '@/types/statistiques.model';
import useContentCtx from './useContentCtx';
import { TbArrowUpRight, TbChartBar, TbMoneybag } from 'react-icons/tb';
import { Info } from 'lucide-react';
import Loading from '@/components/layouts/loading';
import Link from 'next/link';

const chartConfig = {
    orders: {
        label: 'Commandes',
        color: 'hsl(var(--chart-3))',
    },
} satisfies ChartConfig;

interface Props {
    initialData: ChiffreAffaireRestaurant | null;
}

export default function Content({ initialData }: Props) {
    const { data, orderStatusData, statCards, detailCards, handleDateChange, dates, isLoading } = useContentCtx({ initialData });

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="w-full h-full flex flex-1 flex-col gap-6 mb-10 p-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className={title({ size: 'h3', class: 'text-primary mb-0' })}>Tableau de bord</h1>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        {/* <Select className="max-w-xs" selectedKeys={period} onSelectionChange={(keys) => setPeriod(keys as any)}>
                    {periods.map((period: { key: string; label: string }) => (
                        <SelectItem key={period.key}>{period.label}</SelectItem>
                    ))}
                </Select> */}
                        <span>Rechercher la période</span>
                        <DateRangePicker className="max-w-xs relative" value={dates} onChange={(value) => handleDateChange(value as RangeValue<CalendarDate>)} />
                    </div>
                    {/* Main Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {statCards.map((stat, index) => (
                            <Card key={index} className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
                                {
                                    stat.url ?
                                        <Link href={stat.url}>
                                            <CardBody className="p-6">
                                                <div className={`flex items-center justify-between`}>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm text-gray-500">{stat.title}</span>
                                                        <span className="text-2xl font-bold">
                                                            {stat.value} {stat.title.includes('Commandes') ? '' : 'XOF'}
                                                        </span>
                                                    </div>

                                                    <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                                                        <stat.icon className="w-6 h-6 text-white" />
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Link>
                                        :
                                        <CardBody className="p-6">
                                            <div className={`flex items-center justify-between`}>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm text-gray-500">{stat.title}</span>
                                                    <span className="text-2xl font-bold">
                                                        {stat.value} {stat.title.includes('Commandes') ? '' : 'XOF'}
                                                    </span>
                                                </div>

                                                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                                                    <stat.icon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </CardBody>

                                }
                            </Card>
                        ))}
                    </div>

                    {/* Distribution des Commandes */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Order Distribution */}
                        <Card className="bg-white border-none shadow-md">
                            <CardHeader>
                                <h2 className="text-xl font-semibold">Distribution des Commandes</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                                {orderStatusData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {orderStatusData.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-sm text-gray-600">
                                                {item.name}: {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            {/* Commission sur Chiffre d'Affaires */}
                            {
                                data?.typeCommission === "POURCENTAGE" &&
                                <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200">
                                    <CardHeader className="pb-0 pt-4 px-6">
                                        <div className='flex gap-2 items-center'>
                                            <h4 className="text-lg font-medium opacity-90">Commission sur Chiffre Affaire</h4>
                                            <Tooltip content="Commission en type pourcentage" className='bg-yellow-200 font-bold'>
                                                <Info size={18} className='cursor-pointer mt-2' />
                                            </Tooltip>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="py-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/20 rounded-lg">
                                                    <TbChartBar className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <p className="text-3xl font-bold">{data?.commissionChiffreAffaire.toLocaleString() ?? 0} XOF</p>
                                                </div>
                                            </div>
                                            <Link href={"/tikets-terminers/commision-en-pourcentage"}>
                                                <TbArrowUpRight className="w-8 h-8 opacity-80" />
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            }


                            {/* Commission par Commande */}
                            {
                                data?.typeCommission === "FIXE" &&
                                <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200">
                                    <CardHeader className="pb-0 pt-4 px-6">
                                        <div className='flex gap-2 items-center'>
                                            <h4 className="text-lg font-medium opacity-90">Commission montant fixe</h4>
                                            <Tooltip content="Commission en type fixe" className='bg-yellow-200 font-bold'>
                                                <Info size={20} className='cursor-pointer' />
                                            </Tooltip>
                                        </div>

                                    </CardHeader>
                                    <CardBody className="py-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/20 rounded-lg">
                                                    <TbMoneybag className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <p className="text-3xl font-bold">{data?.commissionCommande.toLocaleString() ?? 0} XOF</p>
                                                </div>
                                            </div>
                                            <Link href={"/tikets-terminers/commision-en-montant-fixe"}>
                                                <TbArrowUpRight className="w-8 h-8 opacity-80" />
                                            </Link>

                                        </div>
                                    </CardBody>
                                </Card>
                            }

                        </div>
                        {/* Évolution des Commandes */}
                        {/* <Card className="bg-white border-none shadow-md">
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Évolution des Commandes</h2>
                    </CardHeader>
                    <CardBody>
                        <div className="h-[300px]">
                            <ChartContainer config={chartConfig} className="w-full h-full">
                                <AreaChart data={rapportCommande} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
                                    <Area type="monotone" dataKey="orders" fill="rgba(220, 38, 38, 0.2)" stroke="#DC2626" />
                                </AreaChart>
                            </ChartContainer>
                        </div>
                    </CardBody>
                </Card> */}
                    </div>

                    {/* Commissions */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                    {/* Commission sur Chiffre d'Affaires */}
                    {/* <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200">
                    <CardHeader className="pb-0 pt-4 px-6">
                        <h4 className="text-lg font-medium opacity-90">Commission sur Chiffre Affaire</h4>
                    </CardHeader>
                    <CardBody className="py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-lg">
                                    <TbChartBar className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">{data ? data?.commissionChiffreAffaire.toLocaleString() : 0} XOF</p>
                                </div>
                            </div>
                            <TbArrowUpRight className="w-8 h-8 opacity-80" />
                        </div>
                    </CardBody>
                </Card> */}

                    {/* Commission par Commande */}
                    {/* <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200">
                    <CardHeader className="pb-0 pt-4 px-6">
                        <h4 className="text-lg font-medium opacity-90">Commission par Commande</h4>
                    </CardHeader>
                    <CardBody className="py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-lg">
                                    <TbMoneybag className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">{ data ? data?.commissionCommande.toLocaleString() : 0} XOF</p>
                                </div>
                            </div>
                            <TbArrowUpRight className="w-8 h-8 opacity-80" />
                        </div>
                    </CardBody>
                </Card>
            </div> */}

                    {/* Details Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {detailCards.map((card, index) => (
                            <Card key={index} className="bg-white border-none shadow-md">
                                <CardHeader className="flex gap-3 justify-between">
                                    <div className="flex gap-3 items-center">
                                        <div className={`p-2 rounded-lg ${card.color}`}>
                                            <card.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold">{card.title}</h3>
                                    </div>
                                    <Tooltip
                                        content={
                                            <div className="px-1 py-2 max-w-60">
                                                <div className="text-small font-bold">{card.title}</div>
                                                <div className="text-tiny">{card.description}</div>
                                            </div>
                                        }
                                    >
                                        <Info size={20} />
                                    </Tooltip>
                                </CardHeader>
                                <CardBody className="pt-0">
                                    {card.stats.map((stat, statIndex) => (
                                        <div key={statIndex} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                            <div className="flex items-center gap-2">
                                                <stat.icon className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{stat.label}</span>
                                            </div>
                                            <span className="font-medium">
                                                {stat.value} {stat.label === 'Nombre' ? '' : 'XOF'}
                                            </span>
                                        </div>
                                    ))}
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div >
            )
            }
        </>
    );
}
