'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
    apiKey: string;
    center: { lat: number; lng: number };
    zoom: number;
    className?: string;
    style?: React.CSSProperties;
    markers?: Array<{
        position: { lat: number; lng: number };
        title?: string;
        icon?: string;
    }>;
    onClick?: (e: google.maps.MapMouseEvent) => void;
    useCurrentLocation?: boolean;
    onLocationError?: (error: string) => void;
    onLocationFound?: (position: { lat: number; lng: number }) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, center: initialCenter, zoom: initialZoom, className, style, markers, onClick, useCurrentLocation, onLocationError, onLocationFound }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);
    const [mapLoaded, setMapLoaded] = useState(false);

    const clearMarkers = useCallback(() => {
        console.log('Clear all markers.');
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
    }, []);

    const initMap = useCallback(async () => {
        if (!mapRef.current || mapLoaded) {
            console.log('Map already initialized or no ref found.');
            return;
        }

        console.log('Initializing Google Map...');
        const loader = new Loader({
            apiKey,
            version: 'weekly',
        });

        try {
            const { Map } = (await loader.importLibrary('maps')) as google.maps.MapsLibrary;

            const mapCenter = useCurrentLocation
                ? await new Promise<{ lat: number; lng: number }>((resolve, reject) => {
                      console.log('Attempting to get current location...');
                      if (!navigator.geolocation) {
                          reject(new Error('Géolocalisation non supportée'));
                          return;
                      }
                      navigator.geolocation.getCurrentPosition(
                          (position) => {
                              const location = {
                                  lat: position.coords.latitude,
                                  lng: position.coords.longitude,
                              };
                              console.log('Current location found:', location);
                              onLocationFound?.(location);
                              resolve(location);
                          },
                          (error) => {
                              console.error('Error getting location:', error);
                              onLocationError?.("Impossible d'obtenir la localisation");
                              resolve(initialCenter);
                          },
                      );
                  })
                : initialCenter;

            mapInstanceRef.current = new Map(mapRef.current, {
                center: mapCenter,
                zoom: initialZoom,
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                rotateControl: true,
                fullscreenControl: true,
            });

            if (onClick) {
                mapInstanceRef.current.addListener('click', (e: any) => {
                    console.log('Map clicked:', e.latLng?.toJSON());
                    onClick(e);
                });
            }

            setMapLoaded(true);
            console.log('Google Map successfully initialized.');
        } catch (error) {
            console.error('Error initializing Google Maps:', error);
        }
    }, [mapLoaded, apiKey, useCurrentLocation, initialCenter, initialZoom, onClick, onLocationFound, onLocationError]);

    useEffect(() => {
        initMap();
        return () => {
            if (mapInstanceRef.current) {
                console.log('Destroying map instance.');
                clearMarkers();
                mapInstanceRef.current = null;
                setMapLoaded(false);
            }
        };
    }, [initMap, clearMarkers]);

    useEffect(() => {
        if (!mapLoaded || !mapInstanceRef.current) return;

        console.log('Updating markers...');
        const { Marker } = google.maps as any;

        if (markers?.length) {
            clearMarkers();
            markers.forEach((markerData) => {
                const marker = new Marker({
                    position: markerData.position,
                    map: mapInstanceRef.current,
                    title: markerData.title,
                    icon: markerData.icon,
                });
                console.log('Marker added:', markerData);
                markersRef.current.push(marker);
            });
        }
    }, [markers, mapLoaded, clearMarkers]);

    useEffect(() => {
        if (mapInstanceRef.current && !useCurrentLocation) {
            console.log('Updating map center and zoom.');
            mapInstanceRef.current.setCenter(initialCenter);
            mapInstanceRef.current.setZoom(initialZoom);
        }
    }, [initialCenter, initialZoom, useCurrentLocation]);

    return <div ref={mapRef} className={`w-full h-full ${className || ''}`} style={{ minHeight: '600px', ...style }} />;
};

export default GoogleMap;