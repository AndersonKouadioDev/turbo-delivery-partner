import { MarkerData } from '@/types';

export function calculateDistance(pointA: { lat: number; lng: number }, pointB: { lat: number; lng: number }) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = toRad(pointB.lat - pointA.lat);
    const dLng = toRad(pointB.lng - pointA.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(pointA.lat)) * Math.cos(toRad(pointB.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en kilomètres
}

export function getDeliveryOrder(startPoint: { lat: number; lng: number }, markers: MarkerData[]) {
    const unvisited = [...markers]; // Cloner la liste des points
    const deliveryOrder = []; // Liste des endroits triés
    let currentPoint = startPoint;

    while (unvisited.length > 0) {
        // Trouver le point le plus proche
        let closestIndex = 0;
        let closestDistance = calculateDistance(currentPoint, unvisited[0].end);

        for (let i = 1; i < unvisited.length; i++) {
            const distance = calculateDistance(currentPoint, unvisited[i].end);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        }

        // Ajouter le point le plus proche à l'ordre de livraison
        const nextPoint = unvisited.splice(closestIndex, 1)[0];
        if (nextPoint.end.lat && nextPoint.end.lng) {
            deliveryOrder.push({
                point: nextPoint.end,
                distance: closestDistance,
                color: nextPoint.color, // Facultatif si tu veux conserver d'autres informations
            });
        }

        // Mettre à jour le point courant
        currentPoint = nextPoint.end;
    }

    return deliveryOrder;
}
