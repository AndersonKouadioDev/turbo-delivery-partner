'use server';

import { apiClientHttp } from '@/lib/api-client-http';
import { FileAttenteLivreur, StatistiqueFileAttente } from '@/types/file-attente.model';

const BASE_URL = '/api/restaurant';
const fileAttenteEndpoints = {
    fetchFilleAttente: { endpoint: (restaurantId: string) => `${BASE_URL}/file-attente/${restaurantId}`, method: 'GET' },
    fetchStatistique: { endpoint: (id: string) => `${BASE_URL}/file-attente/${id}/statistique`, method: 'GET' },
    livreurIndisponible: { endpoint: (id: string) => `${BASE_URL}/file-attente/${id}/indisponible`, method: 'GET' },
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

export async function livreurIndisponible(restaurantId: string): Promise<FileAttenteLivreur[]> {
    try {
        const data = await apiClientHttp.request<FileAttenteLivreur[]>({
            endpoint: fileAttenteEndpoints.livreurIndisponible.endpoint(restaurantId),
            method: fileAttenteEndpoints.livreurIndisponible.method,
            service: 'backend',
        });
        return data;
    } catch (e) {
        return []
    }
}

export async function fetchStatistique(restaurantId: string): Promise<StatistiqueFileAttente | null> {
    try {
        const data = await apiClientHttp.request<any>({
            endpoint: fileAttenteEndpoints.fetchStatistique.endpoint(restaurantId),
            method: fileAttenteEndpoints.fetchStatistique.method,
            service: 'backend',
        });
        return data;
    } catch (e) {
        return null;
    }
}
