import { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Libraries, Polyline } from '@react-google-maps/api';
import { Restaurant } from '@/types/models';

interface MapComponentProps {
    fields: any[];
    form: any;
    restaurant: Restaurant;
}

interface MarkerData {
    start: google.maps.LatLngLiteral;
    end: google.maps.LatLngLiteral;
    color: string;
}

// Liste de 20 couleurs distinctes
const ROUTE_COLORS = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEEAD',
    '#D4A5A5',
    '#9B59B6',
    '#3498DB',
    '#1ABC9C',
    '#F1C40F',
    '#E74C3C',
    '#2ECC71',
    '#34495E',
    '#16A085',
    '#F39C12',
    '#8E44AD',
    '#2980B9',
    '#27AE60',
    '#D35400',
    '#C0392B',
];

const LIBRARIES: Libraries = ['places'];

export const MapComponent = ({ fields, form, restaurant }: MapComponentProps) => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const defaultCenter = { lat: restaurant.latitude ?? 0, lng: restaurant.longitude ?? 0 }; // Paris (fallback)
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    // Obtenir la position de l'utilisateur
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Erreur de géolocalisation:', error);
                    setUserLocation(defaultCenter); // Utiliser Paris par défaut en cas d'erreur
                },
            );
        } else {
            console.warn('La géolocalisation n’est pas prise en charge par ce navigateur.');
            setUserLocation(defaultCenter);
        }
    }, []);

    // Suivre les changements de champs pour mettre à jour les marqueurs
    useEffect(() => {
        const updatedMarkers = fields
            .map((field, index) => {
                const startLat = parseFloat(form.watch(`commandes.${index}.lieuRecuperation.latitude`));
                const startLng = parseFloat(form.watch(`commandes.${index}.lieuRecuperation.longitude`));
                const endLat = parseFloat(form.watch(`commandes.${index}.lieuLivraison.latitude`));
                const endLng = parseFloat(form.watch(`commandes.${index}.lieuLivraison.longitude`));

                if (isNaN(startLat) || isNaN(startLng) || isNaN(endLat) || isNaN(endLng)) {
                    return null;
                }

                return {
                    start: { lat: startLat, lng: startLng },
                    end: { lat: endLat, lng: endLng },
                    color: ROUTE_COLORS[index % ROUTE_COLORS.length],
                };
            })
            .filter((marker): marker is MarkerData => marker !== null);

        setMarkers(updatedMarkers);
    }, [fields]);

    const onMapLoad = useCallback(
        (map: google.maps.Map) => {
            mapRef.current = map;
            if (userLocation) {
                map.panTo(userLocation);
            }
        },
        [userLocation],
    );

    return (
        <div className="h-96 w-full rounded-lg overflow-hidden">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} libraries={LIBRARIES}>
                <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={userLocation || defaultCenter} zoom={10} onLoad={onMapLoad}>
                    {markers.map((marker, index) => (
                        <div key={index}>
                            <Marker
                                position={marker.start}
                                // icon={createMarkerIcon('start', marker.color)}
                                label={{
                                    text: `${index + 1}`,
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            />

                            <Marker
                                position={marker.end}
                                // icon={createMarkerIcon('end', marker.color)}
                                label={{
                                    text: `${index + 1}`,
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            />

                            <Polyline
                                path={[marker.start, marker.end]}
                                options={{
                                    strokeColor: marker.color,
                                    strokeOpacity: 0.8,
                                    strokeWeight: 3,
                                }}
                            />
                        </div>
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};
