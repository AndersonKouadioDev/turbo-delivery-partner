'use client';
import { RestaurantForm } from '@/components/dashboard/settings/restaurant/restaurant-form';
import { title } from '@/components/primitives';
import { ButtonBack } from '@/components/ui/navigation-ui/button-back';
import { Restaurant } from '@/types/models';
import { Divider } from '@heroui/react';

export default function Content({ restaurant }: { restaurant: Restaurant }) {
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
