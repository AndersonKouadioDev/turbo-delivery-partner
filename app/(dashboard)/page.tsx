import Content from './home/content';
import { findOneRestaurant } from '@/src/actions/restaurant.actions';
import Loading from '@/components/layouts/loading';

export default async function Page() {
    const restaurant = await findOneRestaurant();

    if (!restaurant) {
        return <Loading />
    }
    return <Content restaurant={restaurant} />;
}
