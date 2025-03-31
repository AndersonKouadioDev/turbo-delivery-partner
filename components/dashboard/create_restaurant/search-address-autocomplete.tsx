'use client';

import { useState, useEffect, useCallback } from 'react';
import { autocomplete, placeDetails } from '@/lib/googlemaps-server';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';
import { Input } from "@heroui/react";
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { _createRestaurantSchema } from '@/src/schemas/restaurants.schema';

interface FormStepProps {
    errors: FieldErrors<_createRestaurantSchema>;
    control: Control<_createRestaurantSchema>;
    setValue: UseFormSetValue<_createRestaurantSchema>;
}
export default function SearchAddressAutocomplete({ errors, control, setValue }: FormStepProps) {
    const [input, setInput] = useState<string>('');
    const [suggestions, setSuggestions] = useState<PlaceAutocompleteResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = useCallback(async (value: string) => {
        setInput(value);
        if (value.length > 2 && !loading) {
            try {
                const result = await autocomplete(value);
                setSuggestions(result);
            } catch (error) {
                console.error('Error fetching autocomplete suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    }, []);

    const handleSuggestionClick = async (suggestion: PlaceAutocompleteResult) => {
        setLoading(true);
        setInput(suggestion.description);
        setValue('localisation', suggestion.description, { shouldValidate: true });
        setSuggestions([]);
        try {
            const details = await placeDetails(suggestion.place_id);
            const compoundCode = details.result.plus_code?.compound_code || suggestion.description;
            setValue('idLocation', compoundCode, { shouldValidate: true });
            setValue('longitude', details.result.geometry?.location.lng.toString() ?? '', { shouldValidate: true });
            setValue('latitude', details.result.geometry?.location.lat.toString() ?? '', { shouldValidate: true });
        } catch (error) {
            console.error('Error fetching place details:', error);
        } finally {
            setLoading(false);
        }
    };

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
                        {!loading && suggestions && suggestions.length > 0 && (
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
        </div>
    );
}
