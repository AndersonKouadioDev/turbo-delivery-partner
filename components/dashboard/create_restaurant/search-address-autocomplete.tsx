'use client';

import { useState, useEffect, useCallback } from 'react';
import { autocomplete, placeDetails } from '@/lib/googlemaps-server';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';
import { Input } from '@nextui-org/react';
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { _createRestaurantSchema } from '@/src/schemas/restaurants.schema';

interface FormStepProps {
    errors: FieldErrors<_createRestaurantSchema>;
    control: Control<_createRestaurantSchema>;
    setValue: UseFormSetValue<_createRestaurantSchema>;
}
export default function SearchAddressAutocomplete({ errors, control, setValue }: FormStepProps) {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<PlaceAutocompleteResult[]>([]);

    const handleInputChange = useCallback(
        async (value: string) => {
            setInput(value);
            setValue('localisation', value, { shouldValidate: true });
            if (value.length > 2) {
                try {
                    const result = await autocomplete(value);
                    setSuggestions(result);
                } catch (error) {
                    console.error('Error fetching autocomplete suggestions:', error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        },
        [setValue],
    );

    const handleSuggestionClick = useCallback(
        async (suggestion: PlaceAutocompleteResult) => {
            setInput(suggestion.description);
            setValue('localisation', suggestion.description, { shouldValidate: true });
            setSuggestions([]);

            try {
                const placeDetailsResult = await placeDetails(suggestion.place_id);
                const compoundCode = placeDetailsResult.result.plus_code?.compound_code || '';
                setValue('idLocation', compoundCode, { shouldValidate: true });
                setValue('longitude', placeDetailsResult.result.geometry?.location.lng.toString() ?? '', { shouldValidate: true });
                setValue('latitude', placeDetailsResult.result.geometry?.location.lat.toString() ?? '', { shouldValidate: true });
            } catch (error) {
                console.error('Error fetching place details:', error);
            }
        },
        [setValue],
    );

    useEffect(() => {
        if (input) {
            setValue('localisation', input, { shouldValidate: true });
        }
    }, [input, setValue]);

    return (
        <div className="grid gap-y-4">
            <Controller
                control={control}
                name="localisation"
                render={({ field }) => (
                    <div className="relative">
                        <Input
                            {...field}
                            isRequired
                            aria-invalid={errors.localisation ? 'true' : 'false'}
                            aria-label="localisation input"
                            errorMessage={errors.localisation?.message ?? ''}
                            isInvalid={!!errors.localisation}
                            label="Localisation"
                            labelPlacement="outside"
                            name="localisation"
                            placeholder="Entrez une adresse"
                            type="text"
                            value={field.value || ''}
                            onValueChange={handleInputChange}
                            variant="bordered"
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute z-50 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                                {suggestions.map((suggestion) => (
                                    <li key={suggestion.place_id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion.description}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            />
            <Controller
                control={control}
                name="idLocation"
                render={({ field }) => (
                    <Input
                        {...field}
                        isRequired
                        aria-invalid={errors.idLocation ? 'true' : 'false'}
                        aria-label="idLocation input"
                        errorMessage={errors.idLocation?.message ?? ''}
                        isInvalid={!!errors.idLocation}
                        label="ID Location"
                        labelPlacement="outside"
                        name="idLocation"
                        placeholder="ID de la localisation"
                        type="hidden"
                        variant="bordered"
                        isReadOnly
                    />
                )}
            />
            <Controller
                control={control}
                name="longitude"
                render={({ field }) => (
                    <Input
                        {...field}
                        isRequired
                        aria-invalid={errors.longitude ? 'true' : 'false'}
                        aria-label="longitude input"
                        errorMessage={errors.longitude?.message ?? ''}
                        isInvalid={!!errors.longitude}
                        label="Longitude"
                        labelPlacement="outside"
                        name="longitude"
                        placeholder="Longitude"
                        type="hidden"
                        variant="bordered"
                        isReadOnly
                    />
                )}
            />
            <Controller
                control={control}
                name="latitude"
                render={({ field }) => (
                    <Input
                        {...field}
                        isRequired
                        aria-invalid={errors.latitude ? 'true' : 'false'}
                        aria-label="latitude input"
                        errorMessage={errors.latitude?.message ?? ''}
                        isInvalid={!!errors.latitude}
                        label="Latitude"
                        labelPlacement="outside"
                        name="latitude"
                        placeholder="Latitude"
                        type="hidden"
                        variant="bordered"
                        isReadOnly
                    />
                )}
            />
        </div>
    );
}
