import React, { Suspense } from 'react';
import Content from './content';
import { getAllChiffreAffaire } from '@/src/actions/statistiques.action';
import { auth } from '@/auth';
import Loading from '@/components/layouts/loading';

export default async function Page() {
    const session = await auth();
    const data = await getAllChiffreAffaire(session?.user?.restauranID ?? '');
console.log({data})
    // if (!data) return <Loading />;
    return (
        <Suspense fallback={<Loading />}>
            <Content initialData={initialData} />
        </Suspense>
    );
}
const initialData = {
    commandeTotalTermine: 3500.75,
    fraisLivraisonTotalTermine: 1500.5,
    nbCommandeTotalTermine: 45,
    commandeTotalEnAttente: 1200.0,
    fraisLivraisonTotalEnAttente: 6000.25,
    nbCommandeTotalEnAttente: 20,
    commandeTotalInitie: 800.0,
    fraisLivraisonTotalInitie: 4000.0,
    nbCommandeTotalInitie: 15,
    commandeTotalEnCours: 950.5,
    fraisLivraisonTotalEnCours: 4500.75,
    nbCommandeTotalEnCours: 18,
    commissionCommande: 25.0,
    commissionChiffreAffaire: 500.0,
    restaurantId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    restaurant: 'Le Gourmet Parisien',
};
