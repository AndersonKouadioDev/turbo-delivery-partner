import NotFound from '@/app/not-found';
import { RestaurantForm } from '@/components/dashboard/settings/restaurant/restaurant-form';
import { title } from '@/components/primitives';
import { ButtonBack } from '@/components/ui/navigation-ui/button-back';
import { findOneRestaurant } from '@/src/actions/restaurant.actions';

import { Divider } from '@nextui-org/react';

export default async function Restaurant() {
    const data = await findOneRestaurant();

    const restaurant = data?.restaurant;
    if (!restaurant) {
        return NotFound();
    }
    return (
        <div className="w-full gap-4 lg:gap-6">
            <ButtonBack className="bg-background" link="/settings" size="sm" />
            <div className="space-y-4 mt-4">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Restaurant</h1>
                <Divider />
                <RestaurantForm restaurant={restaurant} />
            </div>
        </div>
    );
}
