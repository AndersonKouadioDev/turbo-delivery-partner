import { findOneRestaurant } from '@/src/actions/restaurant.actions';
import { Suspense } from 'react';
import Content from './content';

export default async function ActivationDetailsPage() {
    const data = await findOneRestaurant();
    const restaurant = data?.restaurant;
    if (!restaurant) return <></>;

    return (
        <Suspense>
            <Content restaurant={restaurant} />
        </Suspense>
    );
}
