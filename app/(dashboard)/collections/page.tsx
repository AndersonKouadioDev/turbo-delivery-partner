import React, { Suspense } from 'react';
import Content from './content';
import Loading from '@/components/layouts/loading';
import { getDishesGroupByCollection } from '@/src/actions/restaurant.actions';

export default async function Page() {
    const data = await getDishesGroupByCollection();

    return (
        <Suspense fallback={<Loading />}>
            <Content data={data} />
        </Suspense>
    );
}
