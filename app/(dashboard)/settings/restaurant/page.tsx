export const dynamic = 'force-dynamic';

import NotFound from '@/app/not-found';
import { findOneRestaurant } from '@/src/actions/restaurant.actions';
import Content from './content';

export default async function Restaurant() {
    const data = await findOneRestaurant();

    const restaurant = data?.restaurant;
    if (!restaurant) {
        return NotFound();
    }
    return <Content restaurant={restaurant} />;
}
