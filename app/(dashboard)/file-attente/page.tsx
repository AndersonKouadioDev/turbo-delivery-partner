import React, { Suspense } from 'react';
import Loading from '@/components/layouts/loading';
import Content from './content';
import { auth } from '@/auth';
import { fetchFilleAttente, fetchStatistique, livreurIndisponible } from '@/src/actions/file-attente.actions';


export default async function Page() {
    const session = await auth();
    const data = await fetchFilleAttente(session?.user?.restauranID ?? '');
    const stattitiqueFileAttente = await fetchStatistique(session?.user.restauranID ?? '');
    const livreurIndisponibles = await livreurIndisponible(session?.user.restauranID ?? '');
    return (
        <Suspense fallback={<Loading />}>
            <Content initialData={data} stattitiqueFileAttente={stattitiqueFileAttente} restaurantId={session?.user?.restauranID} livreurIndisponibles={livreurIndisponibles} />
        </Suspense>
    );
}
