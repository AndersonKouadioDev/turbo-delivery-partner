'use client';

import { Control, Controller, FieldErrors } from 'react-hook-form';
import { _createDishSchema } from '@/src/schemas/restaurants.schema';
import { useState } from 'react';
import { Input, RadioGroup, Radio } from "@heroui/react";
import { Collection } from '@/types/models';
import { useSearchParams } from 'next/navigation';

interface CollectionsFormProps {
    control: Control<_createDishSchema>;
    errors: FieldErrors<_createDishSchema>;
    collections: Collection[];
}

export function CollectionsForm({ control, errors, collections }: CollectionsFormProps) {
    const searchParams = useSearchParams();
    const collectionId = searchParams.get('collectionId');
    const collection = collections.find((collection) => collection.id === collectionId);
    const [searchTerm, setSearchTerm] = useState(collection?.libelle || '');

    const filteredCollections = collections.filter((collection) => collection.libelle.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Enregistrer dans une collection</h3>
            <Input type="text" placeholder="Rechercher une collection..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-4" variant="faded" />
            <div className="space-y-2">
                <Controller
                    name="collectionId"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup {...field}
                         isRequired name="collectionId" label="Sélectionner une collection"
                         aria-invalid={errors.collectionId ? 'true' : 'false'}
                         aria-label="collectionId input"
                         errorMessage={errors.collectionId?.message ?? ''}
                         isInvalid={!!errors.collectionId}
                         
                         >
                            {filteredCollections.map((collection) => {
                                return (
                                    <Radio key={collection.id} required value={collection.id}>
                                        {collection.libelle}
                                    </Radio>
                                );
                            })}
                        </RadioGroup>
                    )}
                />
            </div>
        </div>
    );
}
