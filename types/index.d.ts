import { ReactNode, SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface ActionResult<T> {
    data?: T | null;
    message?: string;
    errors?: {
        [key: string]: string;
    };
    status?: 'idle' | 'loading' | 'success' | 'error';
    code?: string | number;
}

export interface ErrorCode {
    code?: string | number;
    message: string;
}

export type DayOfWeek = 'LUNDI' | 'MARDI' | 'MERCREDI' | 'JEUDI' | 'VENDREDI' | 'SAMEDI' | 'DIMANCHE';

export interface OpeningHours {
    dayOfWeek: DayOfWeek;
    openingTime: string;
    closingTime: string;
}

export interface DaySchedule {
    enabled: boolean;
    openingTime: string;
    closingTime: string;
}

export type WeekSchedule = Record<DayOfWeek, DaySchedule>;

export interface MarkerData {
    start: google.maps.LatLngLiteral;
    end: google.maps.LatLngLiteral;
    color: string;
}

interface LocalTime {
    hour?: number;
    minute?: number;
    second?: number;
    nano?: number;
}

export type statutType = "En de recupération" | "Annuler" | "Récupérer" | "En cours de livraison" | "En attente de versement" | "Terminer";

export interface BonLivraisonVM {
    commandeId?: string;
    reference?: string;
    livreur?: string;
    restaurant?: string;
    coutLivraison?: string;
    coutCommande?: string;
    date?: string;
    heure?: LocalTime;
    statut?: statutType
}

export type FormatsSupportes = "PDF" | "EXCEL" | "HTML";
export type TypeCommission = 'POURCENTAGE' | 'FIXE';

export interface ParametreBonLivraisonFacture {
    restaurantId: string;
    debut?: string;
    fin?: string;
    type?: TypeCommission
    format: FormatsSupportes
}