'use client';

import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Input, Textarea } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';

import { _createRestaurantSchema } from '@/src/schemas/restaurants.schema';

interface FormStepProps {
    errors: FieldErrors<_createRestaurantSchema>;
    control: Control<_createRestaurantSchema>;
}

export const InformationRestauForm: React.FC<FormStepProps> = ({ errors, control }) => {

    return (
        <div className="">
            <div className="grid gap-y-4">
                <Controller
                    control={control}
                    name="nomEtablissement"
                    render={({ field }) => (
                        <Input
                            {...field}
                            isRequired
                            aria-invalid={errors.nomEtablissement ? 'true' : 'false'}
                            aria-label="nomEtablissement input"
                            errorMessage={errors.nomEtablissement?.message ?? ''}
                            isInvalid={!!errors.nomEtablissement}
                            label="Nom de l'établissement"
                            labelPlacement="outside"
                            name="nomEtablissement"
                            placeholder="Entrez le nom de l'établissement"
                            value={field.value ?? ''}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            isRequired
                            aria-invalid={errors.description ? 'true' : 'false'}
                            aria-label="description input"
                            errorMessage={errors.description?.message ?? ''}
                            isInvalid={!!errors.description}
                            label="Description de l'établissement"
                            labelPlacement="outside"
                            name="description"
                            placeholder="Entrez la description de l'établissement"
                            value={field.value ?? ''}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="commune"
                    render={({ field }) => (
                        <Input
                            {...field}
                            isRequired
                            aria-invalid={errors.commune ? 'true' : 'false'}
                            aria-label="commune input"
                            errorMessage={errors.commune?.message ?? ''}
                            isInvalid={!!errors.commune}
                            label="Commune d'implentation de l'établissement"
                            labelPlacement="outside"
                            name="commune"
                            placeholder="Entrez la commune d'implentation de l'établissement"
                            value={field.value ?? ''}
                        />
                    )}
                />
            </div>
        </div>
    );
};
