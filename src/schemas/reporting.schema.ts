
import { z } from "zod";

export interface InputReportingField {
    restaurantId: string;
    debut: string;
    fin: string;
    type: string
    format: string;
}

export const reportingSchema = z.object({
    restaurantId: z.string().min(1, "Ce champ est requis"),
    debut: z.string().optional(),
    fin: z.string().optional(),
    type: z.string().optional(),
    format: z.string().optional()
});
export type TypeReportingSchema = z.infer<typeof reportingSchema>;
