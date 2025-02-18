import React, { Suspense } from 'react';
import Loading from '@/components/layouts/loading';
import Content from './content';
import { auth } from '@/auth';
import { fetchFilleAttente } from '@/src/actions/file-attente.actions';

const datas = [
    {
        id: 1,
        nomPrenom: "Tony Reichert",
        status: "RECUPERATION",
        commande: "commande#142533",
        heure: "00 : 23",
        position: 1,
        progression: 80,
        estRetirerDeLaFileAttente: false
    },
    {
        id: 2,
        nomPrenom: "Rachel Glover",
        status: "SE_PREPARE",
        commande: "commande#1478552533",
        heure: "00 : 25",
        position: 2,
        progression: 10,
        estRetirerDeLaFileAttente: false

    },
    {
        id: 3,
        nomPrenom: "Darryl Fitzpatrick",
        status: "",
        heure: "00 : 36",
        commande: "commande#59638",
        position: 4,
        progression: 0,
        estRetirerDeLaFileAttente: false

    },
    {
        id: 4,
        nomPrenom: "Natalie Hartley",
        status: "",
        commande: "commande#7855",
        heure: "00 : 10",
        position: 8,
        progression: 0,
        estRetirerDeLaFileAttente: false

    },
    {
        id: 5,
        nomPrenom: "Joshua Glover",
        status: "",
        commande: "commande#14278533",
        heure: "00 : 56",
        position: 6,
        progression: 0,
        estRetirerDeLaFileAttente: false

    },
    {
        id: 6,
        nomPrenom: "Christopher Crooks",
        status: "",
        heure: "00 : 47",
        commande: "commande#142543",
        position: 2,
        progression: 0,
        estRetirerDeLaFileAttente: true

    }

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
