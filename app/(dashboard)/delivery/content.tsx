'use client';
import { title } from '@/components/primitives';
import { CourseExterne } from '@/types/models';
import createUrlFile from '@/utils/createUrlFile';

import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';
import { IconPlus } from '@tabler/icons-react';
import { ChevronRight, HandPlatter } from 'lucide-react';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

import { DataTable } from './component/data-table';
import { columns } from './component/column';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectItem } from '@nextui-org/react';

interface Props {
    data: CourseExterne[];
}

import Link from 'next/link';

export default function Content({ data }:Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredCourseExternes = data.filter((course) => {
        const code = course.code?.toLowerCase() ?? '';
        const searchTermLower = searchTerm.toLowerCase();

        const matchesSearch = code.includes(searchTermLower);
        const matchesStatus = statusFilter === 'all' || course.statut === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="w-full h-full pb-10 flex flex-1 flex-col gap-4 lg:gap-6">
            <div className="flex items-center justify-between">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Mes Courses</h1>
                <Button as={Link} href="/delivery/create" color="primary" size="sm" startContent={<IconPlus className="h-5 w-5 text-white" />}>
                    Demande de coursier
                </Button>
            </div>
            <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Input placeholder="Rechercher par code" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
                <div className='flex items-center flex-1 gap-4'>
                <Select defaultSelectedKeys={['all']} placeholder="Filtrer par statut" variant="bordered" size="sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <SelectItem key="all">Tous les statuts</SelectItem>
                    <SelectItem key="En attente">En attente</SelectItem>
                    <SelectItem key="En cours">En cours</SelectItem>
                    <SelectItem key="Terminée">Terminée</SelectItem>
                </Select>
                <Button
                    variant="bordered"
                    onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                    }}
                    className=' shrink-0'
                >
                    Réinitialiser les filtres
                </Button>
                </div>
            </div>
            {filteredCourseExternes.length > 0 ? (
                <DataTable columns={columns} data={filteredCourseExternes} />
            ) : (
                <Alert>
                    <AlertTitle>Aucun résultat</AlertTitle>
                    <AlertDescription>Aucune course ne correspond à vos critères de recherche. Essayez de modifier vos filtres.</AlertDescription>
                </Alert>
            )}
        </div>
        </div>
    );
}
