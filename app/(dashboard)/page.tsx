import { auth } from '@/auth';
import Content from './home/content';
import { findOneRestaurant } from '@/src/actions/restaurant.actions';

export default async function Page() {
    const restaurant = await findOneRestaurant();
    return <Content restaurant={restaurant} />;
}
