'use server';

import { apiClientBackend } from '@/lib/api-client-backend';
import { ActionResult } from '@/types';
import { CourseExterne, PaginatedResponse } from '@/types/models';
import { processFormData } from '@/utils/formdata-zod.utilities';
import { courseExterneSchema } from '../schemas/courses.schema';

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
        errors,
    } = processFormData(courseExterneSchema, formData, {
        useDynamicValidation: true,
    });

    if (!success) {
        return {
            status: 'error',
            message: 'Données manquantes ou mal formatées',
        };
    }
    try {
        const response = await apiClientBackend.request({
            endpoint: courseEndpoints.createCourseExterne.endpoint,
            method: courseEndpoints.createCourseExterne.method,
            data: {
                restaurantId,
                commandes: formdata.commandes,
            },
        });
        
        if (response.status !== 201) {
            return {
                status: 'error',
                message: 'Erreur lors de la création de la course',
            };
        }
        return {
            status: 'success',
            message: 'Course crée avec succès',
        };
    } catch (error) {
        return {
            status: 'error',
            message: "Erreur lors de l'ajout de l'horaire",
        };
    }
}

export async function getAllCourseExterne(idRestaurant: string): Promise<CourseExterne[]> {
    try {
        const response = await apiClientBackend.request({
            endpoint: courseEndpoints.getAllCourseExterne.endpoint(idRestaurant),
            method: courseEndpoints.getAllCourseExterne.method,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching all course externe:', error);
        return [];
    }
}

export async function getPaginationCourseExterne(idRestaurant: string, page: number = 0, size: number = 10): Promise<PaginatedResponse<CourseExterne> | null> {
    try {
        const response = await apiClientBackend.request({
            endpoint: courseEndpoints.getPaginationCourseExterne.endpoint(idRestaurant),
            method: courseEndpoints.getPaginationCourseExterne.method,
            params: {
                page: page.toString(),
                size: size.toString(),
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching paginate course externe:', error);
        return null;
    }
}

export async function getCourseExterne(idCourse: string): Promise<CourseExterne | null> {
    try {
        const response = await apiClientBackend.request({
            endpoint: courseEndpoints.getCourseExterne.endpoint(idCourse),
            method: courseEndpoints.getCourseExterne.method,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching course externe:', error);
        return null;
    }
}

export async function terminerCourseExterne(courseId: string): Promise<ActionResult<CourseExterne>> {
    try {
        const response = await apiClientBackend.request({
            endpoint: courseEndpoints.terminerCourseExterne.endpoint,
            method: courseEndpoints.terminerCourseExterne.method,
            data: {
                courseId,
            },
        });

        return {
            status: 'success',
            message: 'Course Terminée',
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: 'Erreur lors du traitement',
        };
    }
}

export async function cancelCourseExterne(courseId: string, restaurantId: string): Promise<ActionResult<CourseExterne>> {
    try {
        const response = await apiClientBackend.request({
            endpoint: courseEndpoints.annulerCourseExterne.endpoint,
            method: courseEndpoints.annulerCourseExterne.method,
            data: {
                restaurantId,
                courseId,
            },
        });
        console.log(response);
        return {
            status: 'success',
            message: 'Course Annulée',
            data: response.data,
        };
    } catch (error) {
        return {
            status: 'error',
            message: 'Erreur lors du traitement',
        };
    }
}
