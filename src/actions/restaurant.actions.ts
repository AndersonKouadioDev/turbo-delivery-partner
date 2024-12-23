'use server';

import { createFormData, processFormData } from '@/utils/formdata-zod.utilities';
import { TrimPhoneNumber } from '@/utils/trim-phone-number';
import { apiClient } from '@/lib/api-client';
import { ActionResult } from '@/types/index.d';
import restaurantEndpoints from '@/src/endpoints/restaurants.endpoint';

import { addPictureSchema, createDishSchema, createRestaurantSchema } from '../schemas/restaurants.schema';
import { FindOneRestaurant, OpeningHour, Restaurant, Collection, User, CollectionWithDishes, Dish, DishComplet } from '@/types/models';
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
        return {
            status: 'error',
            message: 'Données manquantes ou mal formatées',
        };
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
            return {
                status: 'error',
                message: response?.data?.message ?? 'Erreur lors de la création du restaurant',
            };
        }
        return {
            status: 'success',
            message: 'Restaurant créé avec succès',
            data: response.data,
        };

        await unstable_update({
            user: {
                restaurant: response?.data?.restaurant?.nomEtablissement!,
            },
        });
    } catch (error) {
        return {
            status: 'error',
            message: 'Erreur lors de la création du restaurant',
        };
    }
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

export async function addHoraire(formData: FormData): Promise<ActionResult<OpeningHour[]>> {
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
            message: 'OpeningHour ajouté avec succès',
            data: response.data,
        };
    } catch (error) {
        return {
            status: 'error',
            message: "Erreur lors de l'ajout de l'horaire",
        };
    }
}

export async function getHoraires(): Promise<OpeningHour[] | null> {
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
        return {
            status: 'error',
            message: 'Données manquantes ou mal formatées',
        };
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

        return {
            status: 'success',
            message: 'Images ajoutées avec succès',
            data: response.data,
        };
    } catch (error) {
        return {
            status: 'error',
            message: "Erreur lors de l'ajout des images",
        };
    }
}

export async function getCollections(): Promise<Collection[]> {
    try {
        const response = await apiClient.get(restaurantEndpoints.getCollection);
        if (response.status !== 200) {
            return [];
        }
        return response.data;
    } catch (error) {
        return [];
    }
}

export async function getDishesGroupByCollection(): Promise<CollectionWithDishes[]> {
    try {
        const response = await apiClient.get(restaurantEndpoints.getDishesGroupByCollection);
        if (response.status !== 200) {
            return [];
        }
        const data =
            response.data && response.data?.length > 0
                ? response.data.map((item: CollectionWithDishes) => ({
                      collectionModel: item.collectionModel,
                      totalPlat: item.totalPlat,
                  }))
                : [];
        return data;
    } catch (error) {
        return [];
    }
}

export async function getDishesByCollection(id: string): Promise<Dish[]> {
    try {
        const response = await apiClient.get(restaurantEndpoints.getDishesByCollection(id));
        if (response.status !== 200) {
            return [];
        }
        return response.data;
    } catch (error) {
        return [];
    }
}

export async function getDishComplet(id: string): Promise<DishComplet | null> {
    try {
        const response = await apiClient.get(restaurantEndpoints.getDishComplet(id));
        if (response.status !== 200) {
            return null;
        }
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function addDish(formData: FormData): Promise<ActionResult<Dish | null>> {
    const { success, data: formdata } = processFormData(createDishSchema, formData, {
        useDynamicValidation: true,
    });

    if (!success) {
        return {
            status: 'error',
            message: 'Données manquantes ou mal formatées',
        };
    }

    // Create a new FormData object to ensure we're sending multipart/form-data
    const sendFormData = createFormData(formdata);

    try {
        const response = await apiClient.post(restaurantEndpoints.addDish, sendFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status !== 200) {
            throw new Error(response?.data?.message ?? 'Erreur lors de la création du plat');
        }
        return {
            status: 'success',
            message: 'Plat créé avec succès',
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
}
