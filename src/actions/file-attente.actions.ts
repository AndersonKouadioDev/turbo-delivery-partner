'use server';

import { apiClientHttp } from '@/lib/api-client-http';
import { FileAttenteLivreur, StatistiqueFileAttente } from '@/types/file-attente.model';

const BASE_URL = '/api/restaurant/file-attente';
const BASE_URL2 = "/api/file_attente/statistique"
const fileAttenteEndpoints = {
    fetchFilleAttente: { endpoint: (restaurantId: string) => `${BASE_URL}/${restaurantId}`, method: 'GET' },
    fetchStatistique: { endpoint: () => BASE_URL2, method: 'GET' },
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

export async function fetchStatistique(): Promise<StatistiqueFileAttente | null> {
    try {
        const data = await apiClientHttp.request<any>({
            endpoint: fileAttenteEndpoints.fetchStatistique.endpoint(),
            method: fileAttenteEndpoints.fetchStatistique.method,
            service: 'backend',
        });
        return data;
    } catch (e) {
        return null;
    }
}
