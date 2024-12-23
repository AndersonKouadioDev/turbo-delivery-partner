
import React, { Suspense } from 'react';
import Content from './content';
import Loading from '@/components/layouts/loading';
import { getDishComplet } from '@/src/actions/restaurant.actions';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { dish_id: string } }) {
    const dish = await getDishComplet(params.dish_id);
    if (!dish) {
        return notFound();
    }
    return (
        <Suspense fallback={<Loading />}>
            <Content dish={dish} />
        </Suspense>
    );
}
