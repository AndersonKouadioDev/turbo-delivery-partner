import React, { Suspense } from 'react';
import Content from './content';
import { getAllChiffreAffaire } from '@/src/actions/statistiques.action';
import { auth } from '@/auth';
import Loading from '@/components/layouts/loading';

export default async function Page() {
    const session = await auth();
    const data = await getAllChiffreAffaire({ restaurantID: session?.user?.restauranID ?? '' });

    if (!data) return <Loading />;
    return (
        <Suspense fallback={<Loading />}>
            <Content initialData={data} />
        </Suspense>
    );
}
