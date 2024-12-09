import { RestaurantName } from '@/components/dashboard/settings/restaurant/restaurant-name';
import { title } from '@/components/primitives';
import { ButtonBack } from '@/components/ui/navigation-ui/button-back';
import { restaurants } from '@/data';
import { Divider } from '@nextui-org/react';

export default async function Restaurant() {
    const restaurant = restaurants[0];
    return (
        <div className="w-full gap-4 lg:gap-6">
            <ButtonBack className="bg-background" link="/settings" size="sm" />
            <div className="space-y-4 mt-4">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Restaurant</h1>
                <Divider />
                <RestaurantName name={restaurant.name} id={restaurant.id} />
            </div>
        </div>
    );
}
