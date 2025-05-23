'use client';

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, RangeValue, CalendarDate, DateRangePicker, Button } from '@heroui/react';
import { title } from '@/components/primitives';
import { Calendar, Cherry, CircleDollarSign, CircleFadingPlus, DollarSign, Home, Printer, SquareMenu, ToggleRight, User } from 'lucide-react';
import { PaginatedResponse } from '@/types/models';
import { BonLivraisonVM } from '@/types';
import useContentCtx from './useContentCtx';

interface ContentProps {
    initialData: PaginatedResponse<BonLivraisonVM> | null;
    restaurantId?: string;
}

export default function Content({ initialData, restaurantId }: ContentProps) {
    const { columns, renderCell, data, handlePageChange, currentPage, isLoading, handleDateChange, type } = useContentCtx({ initialData, restaurantId });
    return (
        <div className="w-full h-full pb-10 flex flex-1 flex-col gap-4 min-w[200px] overflow-auto ">
            <span>Rechercher par période</span>
            <DateRangePicker className="max-w-xs relative" onChange={(value) => handleDateChange(value as RangeValue<CalendarDate>)} />
            <div className="flex items-center justify-between">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Gestions des tickets : Commandes terminées</h1>
            </div>
            <Table aria-label="Example table with custom cells" className='min-w-[700px] w-full '>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
                            <div className="flex gap-2 text-primary">
                                {column.uid === 'reference' ? (
                                    <CircleFadingPlus size={15} />
                                ) : column.uid === 'date' ? (
                                    <Calendar size={15} />
                                ) : column.uid === 'livreur' ? (
                                    <User size={15} />
                                ) : column.uid === 'restaurant' ? (
                                    <Home size={15} />
                                ) : column.uid === 'coutLivraison' ? (
                                    <Cherry size={15} />
                                ) : column.uid === 'coutCommande' ? (
                                    <SquareMenu size={15} />
                                ) : column.uid === 'statut' ? (
                                    <ToggleRight size={15} />
                                ) : (
                                    <></>
                                )}
                                {

                                    (type === "commision-en-montant-fixe" && column.name === "Commission (Montant fixe)") ?
                                        column.name
                                        :
                                        (type === "commision-en-pourcentage" && column.name === "Commission") ?
                                            column.name
                                            :
                                            column.name === "Commission" ? <></>
                                                :
                                                column.name === "Commission (Montant fixe)" ? <></>
                                                    :
                                                    column.name
                                }
                            </div>
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={data?.content ?? []} emptyContent={'No rows to display.'}>
                    {(item) => <TableRow key={item.commandeId}>{(columnKey) => <TableCell>{renderCell(item, columnKey) as React.ReactNode}</TableCell>}</TableRow>}
                </TableBody>
            </Table>
            {/* justify-center */}
            <div className="flex-wrap  lg:flex md:flex xl:flex h-fit z-10  mt-8 fixed bottom-4 items-center w-full">
                <div className="bg-gray-200 absolute inset-0 w-full h-full blur-sm opacity-50"></div>
                <Pagination total={data?.totalPages ?? 1} page={currentPage} onChange={handlePageChange} showControls color="primary" variant="bordered" isDisabled={isLoading} />
                <div className='absolute right-0  bottom-10 lg:bottom-0 xl:bottom-0 lg:right-[30%] md:right-[30%] xl:right-[30%] flex-wrap  lg:flex xl:flex gap-4 items-center pr-4'>
                    <div className=' border border-primary/50 rounded-lg pl-2 pr-2 lg:mt-0  xl:mt-0'>
                        <div className='flex gap-2 items-center '>
                            <CircleDollarSign size={25} className='text-primary font-[1000]' />
                            <div>
                                <div className='text-md'>Total de frais de livraison</div>
                                <span className='text-primary font-[1000]'>{data && data.content.reduce(
                                    (acc, item) => acc + (Number(item.coutLivraison) || 0), 0)} FCFA</span>
                            </div>
                        </div>
                    </div>
                    <div className='border border-primary/50 rounded-lg mt-2  pl-2 pr-2 lg:mt-0  xl:mt-0'>
                        <div className='flex gap-2 items-center' >
                            <CircleDollarSign size={25} className='text-primary font-[1000]' />
                            <div >
                                <div className=''>Total des commandes</div>
                                <span className='text-primary font-[1000]'>{data && data.content.reduce(
                                    (acc, item) => acc + (Number(item.coutCommande) || 0), 0)} FCFA</span>
                            </div>
                        </div>
                    </div>
                    {
                        (type !== "chiffre-affaire") &&
                        <div className='border border-primary/50 rounded-lg mt-2 pl-2 pr-2 lg:mt-0  xl:mt-0'>
                            <div className='flex gap-2 items-center' >
                                <CircleDollarSign size={25} className='text-primary font-[1000]' />
                                <div >
                                    <div className=''>Total des commssions</div>
                                    <span className='text-primary font-[1000]'>250000 FCFA</span>
                                </div>
                            </div>
                        </div>
                    }
                    <Button className='bg-primary h-10 text-white mt-2 lg:mt-0  xl:mt-0'><Printer size={20} /> Imprimer</Button>
                </div>
            </div>
        </div>
    );
}
