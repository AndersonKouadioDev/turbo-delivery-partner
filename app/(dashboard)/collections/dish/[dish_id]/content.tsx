'use client';

import { DishDetails } from '@/components/dashboard/collections/dish/dish-details';
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import Link from 'next/link';
import { DishComplet } from '@/types/models';

export default function Content({ dish }: { dish: DishComplet }) {
    return (
        <div className="w-full h-full pb-10 flex flex-1 flex-col gap-4 lg:gap-6">
            <div className="flex items-center justify-between">
                <Breadcrumbs>
                    <BreadcrumbItem as={Link} href="/collections">
                        Collections
                    </BreadcrumbItem>
                    <BreadcrumbItem as={Link} href={`/collections/${dish.platM.collection.id}`}>
                        {dish.platM.collection.libelle}
                    </BreadcrumbItem>
                    <BreadcrumbItem>{dish.platM.libelle}</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <DishDetails dish={dish} />
        </div>
    );
}
