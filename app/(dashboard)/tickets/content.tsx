'use client';

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, RangeValue, CalendarDate, DateRangePicker } from '@heroui/react';
import { title } from '@/components/primitives';
import useContentCtx from './useContentCtx';
import { Calendar, Cherry, CircleFadingPlus, Home, SquareMenu, ToggleRight, User } from 'lucide-react';
import { PaginatedResponse } from '@/types/models';
import { BonLivraisonVM } from '@/types';

interface ContentProps {
    initialData: PaginatedResponse<BonLivraisonVM> | null;
    restaurantId?: string;
}

export default function Content({ initialData, restaurantId }: ContentProps) {
    const { columns, renderCell, data, handlePageChange, currentPage, isLoading, handleDateChange } = useContentCtx({ initialData, restaurantId });

    return (
        <div className="w-full h-full pb-10 flex flex-1 flex-col gap-4">
            <span>Rechercher par période</span>
            <DateRangePicker className="max-w-xs relative" onChange={(value) => handleDateChange(value as RangeValue<CalendarDate>)} />
            <div className="flex items-center justify-between">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Gestions des tickets</h1>
            </div>
            <Table aria-label="Example table with custom cells">
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
                                {column.name}
                            </div>
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={data?.content ?? []} emptyContent={'No rows to display.'}>
                    {(item) => <TableRow key={item.commandeId}>{(columnKey) => <TableCell>{renderCell(item, columnKey) as React.ReactNode}</TableCell>}</TableRow>}
                </TableBody>
            </Table>
            <div className="flex h-fit z-10 justify-center mt-8 fixed bottom-4">
                <div className="bg-gray-200 absolute inset-0 w-full h-full blur-sm opacity-50"></div>
                <Pagination total={data?.totalPages ?? 1} page={currentPage} onChange={handlePageChange} showControls color="primary" variant="bordered" isDisabled={isLoading} />
            </div>
        </div>
    );
}
