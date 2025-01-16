import React, { Suspense } from 'react';
import Content from './content';
import Loading from '@/components/layouts/loading';
import { findOneRestaurant } from '@/src/actions/restaurant.actions';
import { redirect } from 'next/navigation';

export default async function Page() {
    const data = await findOneRestaurant();
    const restaurant = data?.restaurant;
    if (!restaurant) {
        redirect('/auth/signout');
    }
    return (
        <Suspense fallback={<Loading />}>
            <Content restaurant={restaurant} />
        </Suspense>
    );
}
