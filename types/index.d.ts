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
    code?: ErrorDefaultCode | number;
}

export interface ErrorCode {
    code: ErrorDefaultCode;
    message: string;
}

export enum ErrorDefaultCode {
    exception = '400',
    permission = '42501',
    auth = '401',
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