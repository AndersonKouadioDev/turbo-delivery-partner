'use server';

import { createFormData, processFormData } from '@/utils/formdata-zod.utilities';
import { TrimPhoneNumber } from '@/utils/trim-phone-number';
import { apiClient } from '@/lib/api-client';
import { ActionResult } from '@/types/index.d';
import restaurantEndpoints from '@/src/endpoints/restaurants.endpoint';

import { addPictureSchema, createRestaurantSchema } from '../schemas/restaurants.schema';
import { FindOneRestaurant, Horaire, Restaurant, User } from '@/types/models';
import { unstable_update } from '@/auth';

export async function createRestaurant(prevState: any, formData: FormData): Promise<ActionResult<{ restaurant: Restaurant; createdBy: User }>> {
    const { success, data: formdata } = processFormData(
        createRestaurantSchema,
        formData,
        {
            useDynamicValidation: true,
            excludeFields: ['telephoneCountry'],
            transformations: {
                telephone: (value) => TrimPhoneNumber(value as string),
            },
        },
        prevState,
    );

    if (!success) {
        prevState.status = 'error';
        prevState.message = 'Données manquantes ou mal formatées';
        return prevState;
    }

    // Create a new FormData object to ensure we're sending multipart/form-data
    const sendFormData = createFormData(formdata);

    try {
        const response = await apiClient.post(restaurantEndpoints.create, sendFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status !== 200) {
            prevState.status = 'error';
            prevState.message = response?.data?.message ?? 'Erreur lors de la création du restaurant';
            return prevState;
        }
        prevState.status = 'success';
        prevState.message = 'Restaurant créé avec succès';
        prevState.data = response.data;

        await unstable_update({
            user: {
                restaurant: response?.data?.restaurant?.nomEtablissement!,
            },
        });
    } catch (error) {
        prevState.status = 'error';
        prevState.message = 'Erreur lors de la création du restaurant';
        return prevState;
    }
    return prevState;
}

export async function findOneRestaurant(): Promise<FindOneRestaurant | null> {
    // Processing
    try {
        const response = await apiClient.get(restaurantEndpoints.info);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function addHoraire(formData: FormData): Promise<ActionResult<Horaire[]>> {
    const { success, data: formdata } = processFormData(createRestaurantSchema, formData, {
        useDynamicValidation: true,
    });

    if (!success) {
        return {
            status: 'error',
            message: 'Données manquantes ou mal formatées',
        };
    }

    try {
        const response = await apiClient.post(restaurantEndpoints.addHoraire, formdata);

        if (response.status !== 200) {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout de l'horaire",
            };
        }
        return {
            status: 'success',
            message: 'Horaire ajouté avec succès',
            data: response.data,
        };
    } catch (error) {
        return {
            status: 'error',
            message: "Erreur lors de l'ajout de l'horaire",
        };
    }
}

export async function getHoraires(): Promise<Horaire[] | null> {
    try {
        const response = await apiClient.get(restaurantEndpoints.getHoraires);

        if (response.status !== 200) {
            return null;
        }
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function addPicture(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const { success, data: formdata } = processFormData(addPictureSchema, formData, {
        useDynamicValidation: true,
    });

    if (!success) {
        prevState.status = 'error';
        prevState.message = 'Données manquantes ou mal formatées';
        return prevState;
    }

    // Create a new FormData object to ensure we're sending multipart/form-data

    const sendFormData = createFormData(formdata);

    try {
        const response = await apiClient.post(restaurantEndpoints.uploadPicture, sendFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status !== 200) {
            throw new Error("Erreur lors de l'ajout des images");
        }

        prevState.status = 'success';
        prevState.message = 'Images ajoutées avec succès';
        prevState.data = response.data;

        return prevState;
    } catch (error) {
        prevState.status = 'error';
        prevState.message = "Erreur lors de l'ajout des images";
        return prevState;
    }
}
