import React, { Suspense } from 'react';
import Content from './content';
import Loading from '@/components/layouts/loading';
import { getPaginationCourseExterne } from '@/src/actions/courses.actions';
import { findOneRestaurant } from '@/src/actions/restaurant.actions';
import { redirect } from 'next/navigation';

export default async function DeliveryPage() {
    const data = await findOneRestaurant();
    const restaurant = data?.restaurant;
    if (!restaurant) {
        redirect('/auth/signout');
    }

    const data2 = await getPaginationCourseExterne(restaurant.id ?? '', 0, 5);

    return (
        <Suspense fallback={<Loading />}>
            <Content initialData={data2} restaurant={restaurant} />
        </Suspense>
    );
}
