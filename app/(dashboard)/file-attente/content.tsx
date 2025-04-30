'use client';
import { useState } from 'react';
import { Map, Bike, Database } from 'lucide-react';
import { PageWrapper } from '@/components/commons/page-wrapper';
import { CardHeader } from '@/components/commons/card-header';
import { Card, CardBody, Input } from "@heroui/react";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { NextUICard } from '@/components/commons/next-ui-card';
import { FileAttenteTab } from './file-attente-tab/file-attente-tab';
import { SearchField } from '@/components/commons/form/search-field';
import { useFileAttenteController } from './controller';
import { FileAttenteLivreur, StatistiqueFileAttente } from '@/types/file-attente.model';

interface Props {
    initialData: FileAttenteLivreur[];
    stattitiqueFileAttente: StatistiqueFileAttente | null;
    restaurantId?: string;
    livreurIndisponibles: FileAttenteLivreur[]
}
export default function Content({ initialData, stattitiqueFileAttente, restaurantId, livreurIndisponibles }: Props) {
    const ctrl = useFileAttenteController(initialData, stattitiqueFileAttente, livreurIndisponibles, restaurantId)
    const [searchKey, setSearchKey] = useState("");
    const onChange = (event: any) => {
        setSearchKey(event.target.value)
    }
    return (
        <PageWrapper>
            <CardHeader title='Courses' />
            <div className="space-y-4">
                <div className="flex gap-4 w-full">
                    <SearchField onChange={onChange} searchKey={searchKey} />
                    <div className=''>
                        <Link href={'#'}>
                            <Badge className="rounded-full pr-4 cursor-pointer">
                                <Map className="mr-4" size={30} /> Maps
                            </Badge>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-2  lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1'>
                <NextUICard title={'Flotte de coursiers'} nombreCommande={`${ctrl.statistiqueCommandes ? ctrl.statistiqueCommandes.coursier : 0}`}
                    status={"en attente"} icon={<Bike size={"20"} />}
                    titleClassName='bg-warning-500 rounded-md pl-4 pr-4 text-sm text-white font-bold pb-1' />

                <NextUICard title={'Nombre de commandes'} nombreCommande={`${ctrl.statistiqueCommandes ? ctrl.statistiqueCommandes.commandeEnAttente : 0}`}
                    icon={<Database size={20} />}
                    titleClassName='bg-red-500 rounded-md pl-4 pr-4 text-sm text-white font-bold pb-1' />

                <NextUICard title={'Commandes terminées'} nombreCommande={`${ctrl.statistiqueCommandes ? ctrl.statistiqueCommandes.commandeTermine : 0}`}
                    icon={<Database size={20} />}
                    titleClassName='bg-green-400 rounded-md pl-4 pr-4 text-sm text-white font-bold pb-1' />

                <Card className={`py-1 border-2  bg-purple-800 text-white border-gary-500`}>
                    <div className="pb-0 pt-2 px-4 flex-col items-start card">
                        <p className={`"text-white" font-bold text-md`}>
                            {
                                ctrl.currentDelivery?.commande ? ctrl.currentDelivery.commande?.libelle : `En attente d'une commande prête`
                            }
                        </p>
                    </div>
                    <CardBody className="overflow-visible py-2">
                        <div className="mt-3 ">
                            <div className={`text-md text-gray-500 items-center  text-white font-bold `}>Temps de recupération</div>
                            <div className='flex flex-wrap lg:flex-nowrap xl:flex-nowrap gap-4 justify-between items-center'>
                                <div className={`pt-2 text-gray-400 text-2xl text-white font-bold`}>
                                    {String(ctrl.minutes).padStart(2, "0")} : {String(ctrl.seconds).padStart(2, "0")}
                                </div>

                                <div className='bg-primary mr-1 p-1 rounded-full pl-4 pr-4 text-center text-md flex gap-1'>Position: <span className='font-bold text-1xl'>{ctrl.currentDelivery?.position} 5</span></div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <FileAttenteTab data={ctrl.fileAttentes} searchKey={searchKey}
                timeProgressions={ctrl.timeProgressions}
                currentDelivery={ctrl.currentDelivery}
                livreurIndisponibles={ctrl.livreurIndispoData}
                restaurantId={restaurantId} />
        </PageWrapper>
    );
}
