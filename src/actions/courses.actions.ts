'use server';
import { ActionResult } from '@/types';
import { CourseExterne, PaginatedResponse } from '@/types/models';
import { processFormData } from '@/utils/formdata-zod.utilities';
import { courseExterneSchema } from '../schemas/courses.schema';
import { apiClientHttp } from '@/lib/api-client-http';

// Configuration
const BASE_URL = '/api/restaurant/course-externe';

const courseEndpoints = {
    createCourseExterne: { endpoint: BASE_URL, method: 'POST' },
    updateCourseExterne: { endpoint: BASE_URL, method: 'PUT' },
    terminerCourseExterne: { endpoint: `${BASE_URL}/terminer`, method: 'PUT' },
    annulerCourseExterne: { endpoint: `${BASE_URL}/annuler`, method: 'PUT' },
    getPaginationCourseExterne: {
        endpoint: (idRestaurant: string) => `${BASE_URL}/${idRestaurant}/pagination`,
        method: 'GET',
    },
    getAllCourseExterne: {
        endpoint: (idRestaurant: string) => `${BASE_URL}/${idRestaurant}/tous`,
        method: 'GET',
    },
    getCourseExterne: {
        endpoint: (idCourse: string) => `${BASE_URL}/${idCourse}`,
        method: 'GET',
    },
};

export async function addCourseExterne(formData: any, restaurantId: string): Promise<ActionResult<string>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(courseExterneSchema, formData, {
        useDynamicValidation: true,
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray[0].message ?? 'Données manquantes ou mal formatées',
        };
    }
    try {
        const data = await apiClientHttp.request<string>({
            endpoint: courseEndpoints.createCourseExterne.endpoint,
            method: courseEndpoints.createCourseExterne.method,
            data: {
                restaurantId,
                commandes: formdata.commandes,
            },
        });
        return {
            status: 'success',
            message: 'Course crée avec succès',
            data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de l'horaire",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de l'horaire !",
            };
        } else {
            return {
                status: 'error',
                message: 'Erreur lors de l\'ajout de l\'horaire !',
            };
        }
    }
}

export async function getAllCourseExterne(idRestaurant: string): Promise<CourseExterne[]> {
    try {
        const data = await apiClientHttp.request<CourseExterne[]>({
            endpoint: courseEndpoints.getAllCourseExterne.endpoint(idRestaurant),
            method: courseEndpoints.getAllCourseExterne.method,
        });

        return data;
    } catch (error) {
        return [];
    }
}

export async function getPaginationCourseExterne(idRestaurant: string, page: number = 0, size: number = 10): Promise<PaginatedResponse<CourseExterne> | null> {
    try {
        const data = await apiClientHttp.request<PaginatedResponse<CourseExterne>>({
            endpoint: courseEndpoints.getPaginationCourseExterne.endpoint(idRestaurant),
            method: courseEndpoints.getPaginationCourseExterne.method,
            params: {
                page: page.toString(),
                size: size.toString(),
            },
        });
        return data;
    } catch (error) {
        return null;
    }
}

export async function getCourseExterne(idCourse: string): Promise<CourseExterne | null> {
    try {
        const data = await apiClientHttp.request<CourseExterne>({
            endpoint: courseEndpoints.getCourseExterne.endpoint(idCourse),
            method: courseEndpoints.getCourseExterne.method,
        });

        return data;
    } catch (error) {
        return null;
    }
}

export async function terminerCourseExterne(courseId: string): Promise<ActionResult<CourseExterne>> {
    try {
        const data = await apiClientHttp.request<CourseExterne>({
            endpoint: courseEndpoints.terminerCourseExterne.endpoint,
            method: courseEndpoints.terminerCourseExterne.method,
            data: {
                courseId,
            },
        });

        return {
            status: 'success',
            message: 'Course Terminée',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors du traitement",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors du traitement",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors du traitement",
            };
        }
    }
}

export async function cancelCourseExterne(courseId: string, restaurantId: string): Promise<ActionResult<CourseExterne>> {
    try {
        const data = await apiClientHttp.request<CourseExterne>({
            endpoint: courseEndpoints.annulerCourseExterne.endpoint,
            method: courseEndpoints.annulerCourseExterne.method,
            data: {
                restaurantId,
                courseId,
            },
        });

        return {
            status: 'success',
            message: 'Course Annulée',
            data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors du traitement",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors du traitement",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors du traitement",
            };
        }
    }
}
