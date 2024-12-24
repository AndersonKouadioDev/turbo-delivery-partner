'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { autocomplete, placeDetails } from '@/lib/googlemaps-server';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';

interface LocationDetails {
    placeId: string;
    latitude: number;
    longitude: number;
    description: string;
}

export default function GoogleMapsAutocomplete() {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<PlaceAutocompleteResult[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationDetails | null>(null);

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        setSelectedLocation(null);

        if (value.length > 2) {
            try {
                const result = await autocomplete(value);
                setSuggestions(result);
            } catch (error) {
                console.error('Error fetching autocomplete suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = async (suggestion: PlaceAutocompleteResult) => {
        setInput(suggestion.description);
        setSuggestions([]);

        try {
            const details = await placeDetails(suggestion.place_id);
            setSelectedLocation({
                placeId: suggestion.place_id,
                latitude: details.result.geometry?.location.lat || 0,
                longitude: details.result.geometry?.location.lng || 0,
                description: suggestion.description,
            });
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative">
                <Input type="text" placeholder="Entrez une adresse" value={input} onChange={handleInputChange} className="w-full" />
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                        {suggestions.map((suggestion) => (
                            <li key={suggestion.place_id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedLocation && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h3 className="font-bold">Localisation sélectionnée :</h3>
                    <p>Description : {selectedLocation.description}</p>
                    <p>ID : {selectedLocation.placeId}</p>
                    <p>Latitude : {selectedLocation.latitude}</p>
                    <p>Longitude : {selectedLocation.longitude}</p>
                </div>
            )}
            <Button className="mt-4 w-full" disabled={!selectedLocation}>
                Utiliser cette localisation
            </Button>
        </div>
    );
}
