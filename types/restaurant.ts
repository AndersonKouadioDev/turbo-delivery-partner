export interface DeliveryFee {
    name?: string;
    id?: string;
    zone: string;
    restaurantId?: string;
    longitude?: number;
    latitude?: number;
    distanceDebut: number;
    distanceFin: number;
    prix: number;
    commission: number;
    createdAt?: string;
    updatedAt?: string;
}
