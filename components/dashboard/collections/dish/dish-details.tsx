'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AccompanimentsSection } from '@/components/dashboard/collections/dish/sections/accompaniments-section';
import { OptionsSection } from '@/components/dashboard/collections/dish/sections/options-section';
import { DrinksSection } from '@/components/dashboard/collections/dish/sections/drinks-section';
import { DishComplet } from '@/types/models';
import createUrlFile from '@/utils/createUrlFile';

export function DishDetails({ dish: initialDish }: { dish: DishComplet }) {
    const [dish, setDish] = useState(initialDish);

    const handleUpdate = (field: keyof DishComplet, value: any) => {
        setDish((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-3xl font-bold">{dish.platM.libelle}</CardTitle>
                        <Badge variant="default">{dish.platM.cookTime}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            {dish.platM.imageUrl && (
                                <Image src={createUrlFile(dish.platM.imageUrl, 'restaurant')} alt={dish.platM.libelle} width={500} height={300} className="rounded-lg object-cover w-full h-64" />
                            )}
                            <p className="mt-4 text-gray-600">{dish.platM.description}</p>
                        </div>
                        <div className="space-y-6">
                            <AccompanimentsSection dish={initialDish} accompaniments={dish.accompagnementM} onUpdate={(value) => handleUpdate('accompagnementM', value)} />
                            <OptionsSection dish={initialDish} options={dish.optionPlatM} onUpdate={(value) => handleUpdate('optionPlatM', value)} />
                            {/* <DrinksSection dish={initialDish} drinks={dish.boissonPlatMs} onUpdate={(value) => handleUpdate('boissonPlatMs', value)} /> */}
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Collections</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">{dish.platM.collection.libelle}</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
