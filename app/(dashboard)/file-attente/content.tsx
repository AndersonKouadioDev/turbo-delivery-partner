'use client';
import { useState } from 'react';
import { Map, Bike, Database } from 'lucide-react';
import { PageWrapper } from '@/components/commons/page-wrapper';
import { CardHeader } from '@/components/commons/card-header';
import { Card, CardBody, Input } from '@nextui-org/react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { NextUICard } from '@/components/commons/next-ui-card';
import { FileAttenteTab } from './file-attente-tab/file-attente-tab';
import { SearchField } from '@/components/commons/form/search-field';

interface Props {
    initialData: any[];
}
export default function Content({ initialData }: Props) {
    const [searchKey, setSearchKey] = useState("");
    const [rowData, setRowData] = useState<any>({})
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
                <NextUICard title={'Flotte de coursiers'} nombreCommande={"20"}
                    status={"en attente"} icon={<Bike size={"20"} />}
                    titleClassName='bg-warning-500 rounded-md pl-4 pr-4 text-sm text-white font-bold pb-1' />

                <NextUICard title={'Nombre de commandes'} nombreCommande={"27"}
                    icon={<Database size={20} />}
                    titleClassName='bg-red-500 rounded-md pl-4 pr-4 text-sm text-white font-bold pb-1' />

                <NextUICard title={'Commandes terminées'} nombreCommande={"02"}
                    icon={<Database size={20} />}
                    titleClassName='bg-green-400 rounded-md pl-4 pr-4 text-sm text-white font-bold pb-1' />

                <Card className={`py-1 border-2 ${rowData.position && "bg-purple-800 text-white"} border-gary-500`}>
                    <div className="pb-0 pt-2 px-4 flex-col items-start card">
                        <p className={`${rowData.position ? "text-white" : "text-gray-500"} font-bold text-md`}>
                            {
                                rowData.commande ? rowData.commande : `En attente d'une commande prête`
                            }
                        </p>
                    </div>
                    <CardBody className="overflow-visible py-2">
                        <div className="mt-3 ">
                            <div className={`text-md text-gray-500 items-center  ${rowData.position ? "text-white" : "text-gray-300 font-bold"}`}>Temps de recupération</div>
                            <div className='flex gap-4 justify-between items-center'>
                                <div className={`pt-2 text-gray-400 text-3xl ${rowData.position ? "text-white" : "text-gray-3"} font-bold`}>{rowData.heure ? rowData.heure : "00 : 00"}</div>
                                {rowData.position &&
                                    <div className='bg-primary mr-3 p-3 rounded-full pl-4 pr-4 text-center'>Position: <span className='font-bold text-1xl'>{rowData.position}</span></div>
                                }
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <FileAttenteTab data={initialData} searchKey={searchKey} setRowData={setRowData} rowData={rowData} />
        </PageWrapper>
    );
}
