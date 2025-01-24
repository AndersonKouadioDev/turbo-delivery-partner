'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Libraries, Polyline } from '@react-google-maps/api';
import { Restaurant } from '@/types/models';
import { MarkerData } from '@/types';
import { getDeliveryOrder } from '@/utils/delivery';

interface MapComponentProps {
    markers: MarkerData[];
    restaurant: Restaurant;
}

const LIBRARIES: Libraries = ['places'];

export const MapComponent = ({ markers, restaurant }: MapComponentProps) => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const defaultCenter = { lat: restaurant.latitude ?? 0, lng: restaurant.longitude ?? 0 }; // Paris (fallback)

    const deliveryOrder = getDeliveryOrder(markers[0]?.start ?? { lat: restaurant.latitude, lng: restaurant.longitude }, markers);

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
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={(deliveryOrder[0]?.point.lat != 0 && deliveryOrder[0]?.point) || userLocation || defaultCenter}
                    zoom={12}
                    onLoad={onMapLoad}
                >
                    {markers.map((marker, index) => (
                        <div key={index}>
                            {/* <Marker
                                position={marker.start}
                                // icon={createMarkerIcon('start', marker.color)}
                                label={{
                                    text: `${index + 1}`,
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            /> */}

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
                        </div>
                    ))}
                    <Polyline
                        path={deliveryOrder.map((deliveryOrderPoints) => deliveryOrderPoints.point)}
                        options={{
                            strokeColor: '#F00',
                            strokeOpacity: 0.8,
                            strokeWeight: 3,
                        }}
                    />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};
