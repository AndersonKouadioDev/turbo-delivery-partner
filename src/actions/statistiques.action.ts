'use server';

import { apiClientHttp } from '@/lib/api-client-http';
import { ChiffreAffaireRestaurant } from '@/types/statistiques.model';
import { formatDate } from '@/utils/date-formate';
import { RangeValue } from "@heroui/react";

const BASE_URL = '/api/restaurant/chiffre-affaire';

const statistiquesEndpoints = {
    getAllChiffreAffaire: { endpoint: (restaurantID: string) => `${BASE_URL}/${restaurantID}`, method: 'GET' },
};

export async function getAllChiffreAffaire({ restaurantID, dates }: { restaurantID: string; dates?: RangeValue<string | null> }): Promise<ChiffreAffaireRestaurant | null> {
    try {
        const data = await apiClientHttp.request<ChiffreAffaireRestaurant>({
            endpoint: statistiquesEndpoints.getAllChiffreAffaire.endpoint(restaurantID),
            method: statistiquesEndpoints.getAllChiffreAffaire.method,
            service: 'backend',
            params: {
                dateDebut: dates && dates.start ? formatDate(dates.start, 'YYYY-MM-DD') : '',
                dateFin: dates && dates.end ? formatDate(dates.end, 'YYYY-MM-DD') : '',
            },
        });
        
        return data;
    } catch (error: any) {
        return null;
    }
}
