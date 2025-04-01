'use client';

import '@smastrom/react-rating/style.css';

import { title } from '@/components/primitives';
import { Image, Avatar } from "@heroui/react";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import Link from 'next/link';
import { Picture, Restaurant } from '@/types/models';
import createUrlFile from '@/utils/createUrlFile';

export default function RestaurantDetail({ restaurant }: { restaurant: Restaurant }) {
    return (
        <div className="w-full h-full p-4 flex flex-col items-start gap-2 justify-start">
            <div className="flex justify-center w-full mb-4">
                <Avatar src={createUrlFile(restaurant?.logo ?? '', 'restaurant') ?? ''} isBordered className="w-24 h-24 md:w-36 md:h-36" />
            </div>
            <h2 className={title({ size: 'h4', class: 'text-center' })}>{restaurant.nomEtablissement}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="font-semibold">Évaluation:</span> <Rating style={{ maxWidth: 150 }} value={4} readOnly />
            </p>
            <p className="text-sm text-gray-500">
                <span className="font-semibold">Adresse:</span> {restaurant?.commune ?? ''}
            </p>
            <p className="text-sm text-gray-500">
                <span className="font-semibold">Téléphone:</span> {restaurant?.telephone ?? ''}
            </p>
            <p className="text-sm text-gray-500">
                <span className="font-semibold">Email:</span> {restaurant?.email ?? ''}
            </p>

            <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="font-semibold">Site web:</span>
                <Link href={restaurant.siteWeb ?? ''} className="text-sm underline text-primary">
                    {restaurant.siteWeb}
                </Link>
            </p>
            <p className="text-sm text-gray-500">
                <span className="font-semibold">Description:</span> {restaurant.description}
            </p>

            <div className="flex justify-center mt-10">{restaurant?.pictures && restaurant?.pictures?.length > 0 && <RestaurantImages images={restaurant.pictures} />}</div>
        </div>
    );
}

export function RestaurantImages({ images }: { images: Picture[] }) {
    return (
        <Carousel className="w-8/12">
            <CarouselContent>
                {images.map((picture) => (
                    <CarouselItem key={picture?.id}>
                        <Image alt={`Image ${picture?.id}`} className="object-cover w-full h-full" src={createUrlFile(picture.pictureUrl ?? '', 'restaurant')} isBlurred radius="sm" />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
