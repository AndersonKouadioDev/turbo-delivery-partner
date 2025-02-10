'use server';

import { createFormData, processFormData } from '@/utils/formdata-zod.utilities';
import { TrimPhoneNumber } from '@/utils/trim-phone-number';
import { apiClient } from '@/lib/api-client';
import { ActionResult } from '@/types/index.d';
import restaurantEndpoints from '@/src/endpoints/restaurants.endpoint';

import {
    addAccompagnementSchema,
    addBoissonSchema,
    addPictureSchema,
    addPlatOptionSchema,
    addPlatOptionValueSchema,
    createDishSchema,
    createRestaurantSchema,
    updateAccompagnementSchema,
    updateBoissonSchema,
} from '../schemas/restaurants.schema';
import { FindOneRestaurant, OpeningHour, Restaurant, Collection, User, CollectionWithDishes, Dish, DishComplet, Accompaniment, Drink, Option, OptionValue } from '@/types/models';
import { unstable_update } from '@/auth';

export async function createRestaurant(prevState: any, formData: FormData): Promise<ActionResult<{ restaurant: Restaurant; createdBy: User }>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(
        createRestaurantSchema,
        formData,
        {
            useDynamicValidation: true,
            excludeFields: ['telephoneCountry'],
            transformations: {
                telephone: (value) => TrimPhoneNumber(value as string),
            },
        },
       
    );

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
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
        if (response.status == 413) {
            return {
                status: 'error',
                message: 'Fichiers volumineux. Utilisez des fichiers de moins de 5Mo',
            };
        }
        if (!response.status.toString().startsWith('20')) {
            return {
                status: 'error',
                message: response?.data?.message ?? 'Erreur lors de la création du restaurant',
            };
        }

        await unstable_update({
            user: {
                restaurant: response?.data?.restaurant?.nomEtablissement!,
                restauranID: response?.data?.restaurant?.id!,
            },
        });

        return {
            status: 'success',
            message: 'Restaurant créé avec succès',
            data: response.data,
        };
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
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(createRestaurantSchema, formData, {
        useDynamicValidation: true,
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
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
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(addPictureSchema, formData, {
        useDynamicValidation: true,
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
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

        if (response.status == 413) {
            return {
                status: 'error',
                message: 'Fichiers volumineux. Utilisez des fichiers de moins de 5Mo',
            };
        }
        if (!response.status.toString().startsWith('20')) {
            return {
                status: 'error',
                message: response?.data?.message ?? 'Erreur lors de la création du restaurant',
            };
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
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(createDishSchema, formData, {
        useDynamicValidation: true,
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
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

        if (response.status == 413) {
            return {
                status: 'error',
                message: 'Fichiers volumineux. Utilisez des fichiers de moins de 5Mo',
            };
        }

        if (!response.status.toString().startsWith('20')) {
            return {
                status: 'error',
                message: response?.data?.message ?? 'Erreur lors de la création du restaurant',
            };
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

export async function addAccompaniment(formData: FormData): Promise<ActionResult<Accompaniment | null>> {
    const { success, data: formdata } = processFormData(addAccompagnementSchema, formData, {
        useDynamicValidation: true,
        transformations: {
            price: (value) => Number(value),
        },
    });

    if (!success) {
        return {
            status: 'error',
            message: 'Données manquantes ou mal formatées',
        };
    }

    try {
        const response = await apiClient.post(restaurantEndpoints.addAccompagnement, formdata);
        if (response.status !== 200) {
            throw new Error(response?.data?.message ?? "Erreur lors de l'ajout de l'accompagnement");
        }
        return {
            status: 'success',
            message: 'Accompagnement ajouté avec succès',
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
}

export async function updateAccompaniment(id: string, formData: FormData): Promise<ActionResult<Accompaniment | null>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(updateAccompagnementSchema, formData, {
        useDynamicValidation: true,
        transformations: {
            price: (value) => Number(value),
        },
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    try {
        const response = await apiClient.post(restaurantEndpoints.updateAccompagnement(id), formdata);
        if (response.status !== 200) {
            throw new Error(response?.data?.message ?? "Erreur lors de la mise à jour de l'accompagnement");
        }
        return {
            status: 'success',
            message: 'Accompagnement mis à jour avec succès',
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
}

export async function addBoisson(formData: FormData): Promise<ActionResult<Drink | null>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(addBoissonSchema, formData, {
        useDynamicValidation: true,
        transformations: {
            price: (value) => Number(value),
            volume: (value) => Number(value),
        },
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    try {
        const response = await apiClient.post(restaurantEndpoints.addBoisson, formdata);
        if (response.status !== 200) {
            throw new Error(response?.data?.message ?? "Erreur lors de l'ajout de la boisson");
        }
        return {
            status: 'success',
            message: 'Boisson ajoutée avec succès',
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
}

export async function updateBoisson(id: string, formData: FormData): Promise<ActionResult<Drink | null>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(updateBoissonSchema, formData, {
        useDynamicValidation: true,
        transformations: {
            price: (value) => Number(value),
            volume: (value) => Number(value),
        },
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    try {
        const response = await apiClient.post(restaurantEndpoints.updateBoisson(id), formdata);
        if (response.status !== 200) {
            throw new Error(response?.data?.message ?? 'Erreur lors de la mise à jour de la boisson');
        }
        return {
            status: 'success',
            message: 'Boisson mise à jour avec succès',
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
}

export async function addOption(formData: FormData): Promise<ActionResult<Option | null>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(addPlatOptionSchema, formData, {
        useDynamicValidation: true,
        transformations: {
            maxSeleteted: (value) => Number(value),
            isRequired: (value) => Boolean(value),
        },
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    try {
        const response = await apiClient.post(restaurantEndpoints.addPlatOption, formdata);
        if (response.status !== 200) {
            throw new Error(response?.data?.message ?? "Erreur lors de l'ajout de l'option");
        }
        return {
            status: 'success',
            message: 'Option ajoutée avec succès',
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
}

export async function addOptionValue(formData: FormData): Promise<ActionResult<OptionValue | null>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(addPlatOptionValueSchema, formData, {
        useDynamicValidation: true,
        transformations: {
            prixSup: (value) => Number(value),
        },
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    try {
        const response = await apiClient.post(restaurantEndpoints.addPlatOptionValue, formdata);
        if (response.status !== 200) {
            throw new Error(response?.data?.message ?? "Erreur lors de l'ajout de la valeur de l'option");
        }
        return {
            status: 'success',
            message: "Valeur de l'option ajoutée avec succès",
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
}

export async function updateOption(formData: FormData): Promise<ActionResult<Option | null>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(addPlatOptionSchema, formData, {
        useDynamicValidation: true,
        transformations: {
            maxSeleteted: (value) => Number(value),
            isRequired: (value) => Boolean(value),
        },
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    try {
        const response = await apiClient.post(restaurantEndpoints.addPlatOption, formdata);
        if (response.status !== 200) {
            throw new Error(response?.data?.message ?? "Erreur lors de la mise à jour de l'option");
        }
        return {
            status: 'success',
            message: 'Option mise à jour avec succès',
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
}

export async function updateOptionValue(formData: FormData): Promise<ActionResult<OptionValue | null>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(addPlatOptionValueSchema, formData, {
        useDynamicValidation: true,
        transformations: {
            prixSup: (value) => Number(value),
        },
    });

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    try {
        const response = await apiClient.post(restaurantEndpoints.addPlatOptionValue, formdata);
        if (response.status !== 200) {
            throw new Error(response?.data?.message ?? "Erreur lors de la mise à jour de la valeur de l'option");
        }
        return {
            status: 'success',
            message: "Valeur de l'option mise à jour avec succès",
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
}
