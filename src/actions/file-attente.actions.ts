'use server';

import { apiClientHttp } from '@/lib/api-client-http';
import { FileAttenteLivreur } from '@/types/file-attente.model';

const BASE_URL = '/api/restaurant/file-attente';

const fileAttenteEndpoints = {
    fetchFilleAttente: { endpoint: (restaurantId: string) => `${BASE_URL}/${restaurantId}`, method: 'GET' },
};

export async function fetchFilleAttente(restaurantID: string): Promise<FileAttenteLivreur[]> {
    try {
        const data = await apiClientHttp.request<FileAttenteLivreur[]>({
            endpoint: fileAttenteEndpoints.fetchFilleAttente.endpoint(restaurantID),
            method: fileAttenteEndpoints.fetchFilleAttente.method,
            service: 'backend',
        });

        return data;
    } catch (error) {
        return [];
    }
}
