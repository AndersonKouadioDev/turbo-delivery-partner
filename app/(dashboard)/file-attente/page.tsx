import React, { Suspense } from 'react';
import Loading from '@/components/layouts/loading';
import Content from './content';
import { auth } from '@/auth';
import { fetchFilleAttente } from '@/src/actions/file-attente.actions';

const datas = [
    {
        id: 1,
        nomComplet: 'Tony Reichert',
        statut: 'RECUPERATION',
        commande: 'commande#142533',
        heureJour: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0,
        },
        position: 1,
        progression: 80,
        estRetirerDeLaFileAttente: false,
    },
    {
        id: 2,
        nomComplet: 'Rachel Glover',
        statut: 'SE_PREPARE',
        commande: 'commande#1478552533',
        heureJour: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0,
        },
        position: 2,
        progression: 10,
        estRetirerDeLaFileAttente: false,
    },
    {
        id: 3,
        nomComplet: 'Darryl Fitzpatrick',
        statut: '',
        heureJour: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0,
        },
        commande: 'commande#59638',
        position: 4,
        progression: 0,
        estRetirerDeLaFileAttente: false,
    },
    {
        id: 4,
        nomComplet: 'Natalie Hartley',
        statut: '',
        commande: 'commande#7855',
        heureJour: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0,
        },
        position: 8,
        progression: 0,
        estRetirerDeLaFileAttente: false,
    },
    {
        id: 5,
        nomComplet: 'Joshua Glover',
        statut: '',
        commande: 'commande#14278533',
        heureJour: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0,
        },
        position: 6,
        progression: 0,
        estRetirerDeLaFileAttente: false,
    },
    {
        id: 6,
        nomComplet: 'Christopher Crooks',
        statut: '',
        heureJour: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0,
        },
        commande: 'commande#142543',
        position: 2,
        progression: 0,
        estRetirerDeLaFileAttente: true,
    },
];

export default async function Page() {
    const session = await auth();
    const data = await fetchFilleAttente(session?.user?.restauranID ?? '');

    return (
        <Suspense fallback={<Loading />}>
            <Content initialData={datas} />
        </Suspense>
    );
}
