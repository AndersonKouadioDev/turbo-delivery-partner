import React, { Suspense } from 'react';
import Content from './content';
import Loading from '@/components/layouts/loading';
import { getCollections } from '@/src/actions/restaurant.actions';
export default async function Page() {
    const collections = await getCollections()

    return (
        <Suspense fallback={<Loading />}>
            <Content collections={collections} />
        </Suspense>
    );
}
