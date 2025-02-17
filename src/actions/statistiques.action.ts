'use server';

import { apiClientHttp } from '@/lib/api-client-http';
import { ChiffreAffaireRestaurant } from '@/types/statistiques.model';

const BASE_URL = '/api/restaurant/chiffre-affaire';

const statistiquesEndpoints = {
    getAllChiffreAffaire: { endpoint: (restaurantID: string) => `${BASE_URL}/${restaurantID}`, method: 'GET' },
};

export async function getAllChiffreAffaire(restaurantID: string): Promise<ChiffreAffaireRestaurant | null> {
    try {
        const data = await apiClientHttp.request<ChiffreAffaireRestaurant>({
            endpoint: statistiquesEndpoints.getAllChiffreAffaire.endpoint(restaurantID),
            method: statistiquesEndpoints.getAllChiffreAffaire.method,
            service: 'backend',
        });

        return data;
    } catch (error) {
        return null;
    }
}
