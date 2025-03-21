import React, { Suspense } from 'react';
import Loading from '@/components/layouts/loading';
import Content from './content';
import { auth } from '@/auth';
import { fetchFilleAttente, fetchStatistique } from '@/src/actions/file-attente.actions';

export default async function Page() {
    const session = await auth();
    const data = await fetchFilleAttente(session?.user?.restauranID ?? '');
    const stattitiqueFileAttente = await fetchStatistique()
    return (
        <Suspense fallback={<Loading />}>
            <Content initialData={data} stattitiqueFileAttente={stattitiqueFileAttente} restaurantId={session?.user?.restauranID} />
        </Suspense>
    );
}
