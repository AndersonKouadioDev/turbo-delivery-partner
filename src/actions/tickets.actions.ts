import { apiClientHttp } from "@/lib/api-client-http";
import { BonLivraisonVM, ParametreBonLivraisonFacture } from "@/types";
import { PaginatedResponse } from "@/types/models";
import { formatDate } from "@/utils/date-formate";
import { RangeValue } from "@heroui/react";
import axios from "axios";

// Configuration
const BASE_URL = '/api/restaurant';
const BASE_URL_2 = '/api/export/reporting';

const ticketsEndpoints = {
    bonLivraisons: { endpoint: (restaurantId: string) => `${BASE_URL}/bon-livraison/${restaurantId}`, method: 'GET' },
    bonLivraisonTerminers: { endpoint: `${BASE_URL}/bon-livraison/tous-termines`, method: 'GET' },
    reportingBonLivraison: { endpoint: `${BASE_URL_2}/facture-bon-livraison`, method: "POST" }
};

export async function getAllBonLivraisons(restaurantId: string, page: number = 0, size: number = 10,
    { dates: { start, end } }: { dates: RangeValue<string | null> }): Promise<PaginatedResponse<BonLivraisonVM>> {
    try {
        const data = await apiClientHttp.request<PaginatedResponse<BonLivraisonVM>>({
            endpoint: ticketsEndpoints.bonLivraisons.endpoint(restaurantId),
            method: ticketsEndpoints.bonLivraisons.method,
            params: {
                page: page.toString(),
                size: size.toString(),
                debut: start ? formatDate(start, 'YYYY-MM-DD') : '',
                fin: end ? formatDate(end, 'YYYY-MM-DD') : '',
            }
        });
        return data;
    } catch (error) {
        return [] as any;
    }
}

export async function reportingBonLivraisonTerminers(parametre: ParametreBonLivraisonFacture): Promise<Blob | null> {
    try {
        // const data = await apiClientHttp.request<Blob>({
        //     endpoint: bonLivraisonEndpoints.reportingBonLivraison.endpoint,
        //     method: bonLivraisonEndpoints.reportingBonLivraison.method,
        //     data: parametre,
        //     service: 'backend',
        // });
        const data = (await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}${ticketsEndpoints.reportingBonLivraison.endpoint}`, parametre))?.data
        return data;
    } catch (error) {
        console.log("error++++++++++++++", error)
        return null;
    }
}
