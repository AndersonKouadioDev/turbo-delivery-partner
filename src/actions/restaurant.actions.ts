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

    const response = await apiClient.post(restaurantEndpoints.create, sendFormData, {
        type: 'formData',
    });

    const result = await response.json();
    if (!response.ok) {
        prevState.status = 'error';
        prevState.message = result.message ?? 'Erreur lors de la création du restaurant';
        return prevState;
    }
    prevState.status = 'success';
    prevState.message = 'Restaurant créé avec succès';
    prevState.data = result;

    await unstable_update({
        user: {
            restaurant: result.restaurant?.nomEtablissement!,
        },
    });
    return prevState;
}

export async function findOneRestaurant(): Promise<FindOneRestaurant | null> {
    // Processing
    const response = await apiClient.get(restaurantEndpoints.info);

    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
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

    const response = await apiClient.post(restaurantEndpoints.addHoraire, formdata);

    if (!response.ok) {
        return {
            status: 'error',
            message: "Erreur lors de l'ajout de l'horaire",
        };
    }

    const result = await response.json();

    return {
        status: 'success',
        message: 'Horaire ajouté avec succès',
        data: result,
    };
}

export async function getHoraires(): Promise<Horaire[] | null> {
    const response = await apiClient.get(restaurantEndpoints.getHoraires);

    if (!response.ok) {
        return null;
    }
    const result = await response.json();

    return result;
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

    const response = await apiClient.post(restaurantEndpoints.uploadPicture, sendFormData, {
        type: 'formData',
    });

    if (!response.ok) {
        prevState.status = 'error';
        prevState.message = "Erreur lors de l'ajout des images";
        return prevState;
    }

    const result = await response.json();

    prevState.status = 'success';
    prevState.message = 'Images ajoutées avec succès';
    prevState.data = result;

    return prevState;
}
