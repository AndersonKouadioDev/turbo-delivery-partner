'use server';

import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client();

// Type pour les coordonnées géographiques
type LatLng = {
    lat: number;
    lng: number;
};

// Type pour les options de la carte
type MapOptions = google.maps.MapOptions;

export const autocomplete = async (input: string): Promise<any[]> => {
    if (!input || input.trim() === '') {
        throw new Error("L'entrée pour l'autocomplétion est vide.");
    }
    try {
        const response = await client.placeAutocomplete({
            params: {
                input,
                language: 'fr',
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            },
        });
        if (response.data.status !== 'OK') {
            throw new Error(`Erreur Google Maps API: ${response.data.status}`);
        }
        return response.data.predictions;
    } catch (error) {
        console.error('Erreur lors de l’autocomplétion:', error);
        throw error;
    }
};

export const placeDetails = async (placeId: string) => {
    try {
        const response = await client.placeDetails({
            params: {
                place_id: placeId,
                fields: ['geometry', 'place_id', 'plus_code'],
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            },
        });
        console.log(JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Initialise une nouvelle carte Google Maps
 * @param element - L'élément DOM où la carte sera rendue
 * @param options - Les options de configuration de la carte
 * @returns Une instance de la carte Google Maps
 */
export async function initMap(element: HTMLElement, options: MapOptions): Promise<google.maps.Map> {
    return new google.maps.Map(element, options);
}

/**
 * Ajoute un marqueur sur la carte
 * @param map - L'instance de la carte Google Maps
 * @param position - Les coordonnées du marqueur
 * @param title - Le titre du marqueur (optionnel)
 * @returns Une instance du marqueur
 */
export async function addMarker({ map, position, title }: google.maps.marker.AdvancedMarkerElementOptions): Promise<google.maps.marker.AdvancedMarkerElement> {
    return new google.maps.marker.AdvancedMarkerElement({ map, position, title });
}

/**
 * Effectue une recherche de lieu et retourne les résultats
 * @param query - La requête de recherche
 * @returns Une promesse contenant les résultats de la recherche
 */
export async function searchPlaces(query: string): Promise<google.maps.places.PlaceResult[]> {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    return new Promise((resolve, reject) => {
        service.textSearch({ query }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                resolve(results);
            } else {
                reject(new Error('La recherche de lieu a échoué'));
            }
        });
    });
}

/**
 * Calcule l'itinéraire entre deux points
 * @param origin - Le point de départ
 * @param destination - Le point d'arrivée
 * @param travelMode - Le mode de transport
 * @returns Une promesse contenant le résultat de l'itinéraire
 */
export async function calculateRoute(origin: LatLng, destination: LatLng, travelMode: google.maps.TravelMode): Promise<google.maps.DirectionsResult> {
    const directionsService = new google.maps.DirectionsService();
    return directionsService.route({
        origin,
        destination,
        travelMode,
    });
}

/**
 * Calcule la distance entre deux points
 * @param point1 - Les coordonnées du premier point
 * @param point2 - Les coordonnées du deuxième point
 * @returns La distance en mètres
 */
export async function calculateDistance(point1: LatLng, point2: LatLng): Promise<number> {
    return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(point1.lat, point1.lng), new google.maps.LatLng(point2.lat, point2.lng));
}

/**
 * Affiche un itinéraire sur la carte
 * @param map - L'instance de la carte Google Maps
 * @param directionsResult - Le résultat de l'itinéraire à afficher
 */
export async function displayRoute(map: google.maps.Map, directionsResult: google.maps.DirectionsResult): Promise<void> {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    directionsRenderer.setDirections(directionsResult);
}

/**
 * Ajoute un cercle sur la carte
 * @param map - L'instance de la carte Google Maps
 * @param center - Le centre du cercle
 * @param radius - Le rayon du cercle en mètres
 * @returns Une instance du cercle
 */
export async function addCircle(map: google.maps.Map, center: LatLng, radius: number): Promise<google.maps.Circle> {
    return new google.maps.Circle({
        map,
        center,
        radius,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
    });
}

/**
 * Ajoute un polygone sur la carte
 * @param map - L'instance de la carte Google Maps
 * @param paths - Un tableau de coordonnées définissant le polygone
 * @returns Une instance du polygone
 */
export async function addPolygon(map: google.maps.Map, paths: LatLng[]): Promise<google.maps.Polygon> {
    return new google.maps.Polygon({
        map,
        paths,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
    });
}

/**
 * Effectue une géocodage (adresse vers coordonnées)
 * @param address - L'adresse à géocoder
 * @returns Une promesse contenant le résultat du géocodage
 */
export async function geocodeAddress(address: string): Promise<google.maps.GeocoderResult> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                resolve(results[0]);
            } else {
                reject(new Error('Le géocodage a échoué'));
            }
        });
    });
}

/**
 * Ajoute une infobulle à un marqueur
 * @param map - L'instance de la carte Google Maps
 * @param marker - Le marqueur auquel ajouter l'infobulle
 * @param content - Le contenu HTML de l'infobulle
 */
export async function addInfoWindow(map: google.maps.Map, marker: google.maps.Marker, content: string): Promise<void> {
    const infoWindow = new google.maps.InfoWindow({ content });
    marker.addListener('click', () => infoWindow.open(map, marker));
}

/**
 * Active le mode Street View sur la carte
 * @param map - L'instance de la carte Google Maps
 * @param position - La position initiale pour Street View
 */
export async function enableStreetView(map: google.maps.Map, position: LatLng): Promise<void> {
    const panorama = map.getStreetView();
    panorama.setPosition(position);
    panorama.setVisible(true);
}

/**
 * Ajoute un contrôle personnalisé à la carte
 * @param map - L'instance de la carte Google Maps
 * @param controlDiv - L'élément DOM du contrôle personnalisé
 * @param position - La position du contrôle sur la carte
 */
export async function addCustomControl(map: google.maps.Map, controlDiv: HTMLElement, position: google.maps.ControlPosition): Promise<void> {
    map.controls[position].push(controlDiv);
}

/**
 * Obtient la position actuelle de l'utilisateur
 * @returns Une promesse contenant les coordonnées de l'utilisateur
 */
export async function getUserLocation(): Promise<LatLng> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                },
            );
        } else {
            reject(new Error("La géolocalisation n'est pas supportée par ce navigateur."));
        }
    });
}

/**
 * Ajoute un gestionnaire d'événements à la carte
 * @param map - L'instance de la carte Google Maps
 * @param eventName - Le nom de l'événement (ex: 'click', 'zoom_changed')
 * @param handler - La fonction à exécuter lorsque l'événement se produit
 */
export async function addMapEventListener(map: google.maps.Map, eventName: string, handler: (...args: any[]) => void): Promise<void> {
    map.addListener(eventName, handler);
}
