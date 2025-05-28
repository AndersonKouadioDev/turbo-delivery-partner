'use server';

import { createFormData, processFormData } from '@/utils/formdata-zod.utilities';
import { TrimPhoneNumber } from '@/utils/trim-phone-number';
import { ActionResult } from '@/types/index.d';

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
import {
    FindOneRestaurant,
    OpeningHour,
    Restaurant,
    Collection,
    User,
    CollectionWithDishes,
    Dish,
    DishComplet,
    Accompaniment,
    Drink,
    Option,
    OptionValue,
    RepositionnerCommande,
} from '@/types/models';
import { unstable_update } from '@/auth';
import { apiClientHttp } from '@/lib/api-client-http';
import { DeliveryFee } from '@/types/restaurant';

// Configuration
const BASE_URL = '';

const restaurantEndpoints = {
    create: { endpoint: `/api/V1/turbo/restaurant/create`, method: 'POST' },
    update: { endpoint: `/api/V1/turbo/restaurant/update`, method: 'POST' },
    info: { endpoint: `/api/V1/turbo/restaurant/info`, method: 'GET' },
    getCollection: { endpoint: `/api/turbo/resto/collection/get`, method: 'GET' },
    getDishesGroupByCollection: { endpoint: `/api/V1/turbo/resto/plat/get/by/collection`, method: 'GET' },
    getDishesByCollection: {
        endpoint: (collectionID: string) => `/api/V1/turbo/resto/plat/collection/${collectionID}`,
        method: 'GET',
    },
    getDishComplet: {
        endpoint: (dishID: string) => `/api/V1/turbo/resto/plat/info/${dishID}`,
        method: 'GET',
    },
    uploadPicture: { endpoint: `/api/V1/turbo/resto/picture/upload`, method: 'POST' },
    assignTypeCuisine: { endpoint: `/api/V1/turbo/resto/typecuisine/assign`, method: 'POST' },
    listTypeCuisine: { endpoint: `/api/V1/turbo/resto/type/cuisine/liste`, method: 'GET' },
    addDish: { endpoint: `/api/V1/turbo/resto/plat/add`, method: 'POST' },
    listPlatOption: { endpoint: `/api/V1/turbo/resto/type/cuisine/liste`, method: 'GET' },
    addPlatOption: { endpoint: `/api/V1/turbo/resto/plat/add/option/plat`, method: 'POST' },
    addPlatOptionValue: { endpoint: `/api/V1/turbo/resto/plat/add/option/value`, method: 'POST' },
    addAccompagnement: { endpoint: `/api/V1/turbo/resto/accompagnement/create`, method: 'POST' },
    listAccompagnement: {
        endpoint: (restauranID: string) => `/api/V1/turbo/resto/accompagnement/list/${restauranID}`,
        method: 'GET',
    },
    infoAccompagnement: {
        endpoint: (restauranID: string) => `/api/V1/turbo/resto/accompagnement/info/${restauranID}`,
        method: 'GET',
    },
    updateAccompagnement: {
        endpoint: (accompagnementID: string) => `/api/V1/turbo/resto/accompagnement/update/${accompagnementID}`,
        method: 'POST',
    },
    infoBoisson: {
        endpoint: (restauranID: string) => `/api/V1/turbo/resto/boisson/get/plat/${restauranID}`,
        method: 'GET',
    },
    updateBoisson: {
        endpoint: (boissonID: string) => `/api/V1/turbo/resto/boisson/update/${boissonID}`,
        method: 'POST',
    },
    getAllFraisLivraison: {
        endpoint: (restaurantId: string) => `/api/restaurant/frais-livraison/${restaurantId}/restaurant`,
        method: 'GET',
    },
    addBoisson: { endpoint: `/api/V1/turbo/resto/boisson/create`, method: 'POST' },
    listBoisson: { endpoint: `/api/V1/turbo/resto/boisson/get`, method: 'GET' },
    addHoraire: { endpoint: `/api/V1/turbo/restaurant/add/horaire`, method: 'POST' },
    getHoraires: { endpoint: `/api/V1/turbo/restaurant/get/hours`, method: 'GET' },
    repositionnerLivreur: { endpoint: `/api/restaurant/file-attente/repositionner`, method: 'PUT' },
    retirerLivreur: { endpoint: `/api/livreur/file-attente/retirer`, method: 'PUT' },
};

export async function createRestaurant(formData: FormData): Promise<ActionResult<{ restaurant: Restaurant; createdBy: User }>> {
    // Validations de donnée par le schema
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(createRestaurantSchema, formData, {
        useDynamicValidation: true,
        excludeFields: ['telephoneCountry'],
        transformations: {
            telephone: (value) => TrimPhoneNumber(value as string),
        },
    });
    //  Si erreur de validation
    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    try {
        // Create a new FormData object to ensure we're sending multipart/form-data
        const sendFormData = createFormData(formdata);

        const data = await apiClientHttp.request<{ restaurant: Restaurant; createdBy: User }>({
            endpoint: restaurantEndpoints.create.endpoint,
            method: restaurantEndpoints.create.method,
            data: sendFormData,
            service: 'restaurant',
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        });

        await unstable_update({
            user: {
                restaurant: data?.restaurant?.nomEtablissement!,
                restauranID: data?.restaurant?.id!,
            },
        });

        return {
            status: 'success',
            message: 'Restaurant créé avec succès',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.status == 413) {
            return {
                status: 'error',
                message: 'Fichiers volumineux. Utilisez des fichiers de moins de 5Mo',
            };
        }
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de la création du restaurant",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de la création du restaurant",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de la création du restaurant",
            };
        }
    }
}

export async function findOneRestaurant(): Promise<FindOneRestaurant | null> {
    try {
        const data = await apiClientHttp.request<FindOneRestaurant>({
            endpoint: restaurantEndpoints.info.endpoint,
            method: restaurantEndpoints.info.method,
            service: 'restaurant',
        });
        return data;
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
        const data = await apiClientHttp.request<OpeningHour[]>({
            endpoint: restaurantEndpoints.addHoraire.endpoint,
            method: restaurantEndpoints.addHoraire.method,
            service: 'restaurant',
            data: formdata,
        });

        return {
            status: 'success',
            message: 'Horaires ajouté avec succès',
            data: data,
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
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de l'horaire",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout de l'horaire",
            };
        }
    }
}

export async function getHoraires(): Promise<OpeningHour[] | null> {
    try {
        const data = await apiClientHttp.request<OpeningHour[]>({
            endpoint: restaurantEndpoints.getHoraires.endpoint,
            method: restaurantEndpoints.getHoraires.method,
            service: 'restaurant',
        });
        return data;
    } catch (error) {
        return null;
    }
}

export async function addPicture(formData: FormData): Promise<ActionResult<any>> {
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

    try {
        // Create a new FormData object to ensure we're sending multipart/form-data

        const sendFormData = createFormData(formdata);

        await apiClientHttp.request({
            endpoint: restaurantEndpoints.uploadPicture.endpoint,
            method: restaurantEndpoints.uploadPicture.method,
            data: sendFormData,
            service: 'restaurant',
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        });

        return {
            status: 'success',
            message: 'Images ajoutées avec succès',
        };
    } catch (error: any) {
        if (error?.response?.status == 413) {
            return {
                status: 'error',
                message: 'Fichiers volumineux. Utilisez des fichiers de moins de 5Mo',
            };
        }
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout des images",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout des images",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout des images",
            };
        }
    }
}

export async function getCollections(): Promise<Collection[]> {
    try {
        const data = await apiClientHttp.request<Collection[]>({
            endpoint: restaurantEndpoints.getCollection.endpoint,
            method: restaurantEndpoints.getCollection.method,
            service: 'restaurant',
        });

        return data;
    } catch (error) {
        return [];
    }
}

export async function getAllFraisLivraison(restaurantId: string): Promise<DeliveryFee[]> {
    try {
        const data = await apiClientHttp.request<DeliveryFee[]>({
            endpoint: restaurantEndpoints.getAllFraisLivraison.endpoint(restaurantId),
            method: restaurantEndpoints.getAllFraisLivraison.method,
            service: 'backend',
        });
        return data;
    } catch (error) {
        return [];
    }
}

export async function getDishesGroupByCollection(): Promise<CollectionWithDishes[]> {
    try {
        const data = await apiClientHttp.request<CollectionWithDishes[]>({
            endpoint: restaurantEndpoints.getDishesGroupByCollection.endpoint,
            method: restaurantEndpoints.getDishesGroupByCollection.method,
            service: 'restaurant',
        });
        const newData =
            data && data?.length > 0
                ? data.map((item: CollectionWithDishes) => ({
                    collectionModel: item.collectionModel,
                    totalPlat: item.totalPlat,
                }))
                : [];
        return newData;
    } catch (error) {
        return [];
    }
}

export async function getDishesByCollection(collectionID: string): Promise<Dish[]> {
    try {
        const data = await apiClientHttp.request<Dish[]>({
            endpoint: restaurantEndpoints.getDishesByCollection.endpoint(collectionID),
            method: restaurantEndpoints.getDishesByCollection.method,
            service: 'restaurant',
        });

        return data;
    } catch (error) {
        return [];
    }
}

export async function getDishComplet(dishID: string): Promise<DishComplet | null> {
    try {
        const data = await apiClientHttp.request<DishComplet>({
            endpoint: restaurantEndpoints.getDishComplet.endpoint(dishID),
            method: restaurantEndpoints.getDishComplet.method,
            service: 'restaurant',
        });

        return data;
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
        const data = await apiClientHttp.request<Dish>({
            endpoint: restaurantEndpoints.addDish.endpoint,
            method: restaurantEndpoints.addDish.method,
            service: 'restaurant',
            data: sendFormData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        });

        return {
            status: 'success',
            message: 'Plat créé avec succès',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.status == 413) {
            return {
                status: 'error',
                message: 'Fichiers volumineux. Utilisez des fichiers de moins de 5Mo',
            };
        }
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout du plat",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout du plat",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout du plat",
            };
        }
    }
}

export async function addAccompaniment(formData: FormData): Promise<ActionResult<Accompaniment | null>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(addAccompagnementSchema, formData, {
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
        const data = await apiClientHttp.request<Accompaniment>({
            endpoint: restaurantEndpoints.addAccompagnement.endpoint,
            method: restaurantEndpoints.addAccompagnement.method,
            service: 'restaurant',
            data: formdata,
        });

        return {
            status: 'success',
            message: 'Accompagnement ajouté avec succès',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout du Accompagnement",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout du Accompagnement",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout du Accompagnement",
            };
        }
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
        const data = await apiClientHttp.request<Accompaniment>({
            endpoint: restaurantEndpoints.updateAccompagnement.endpoint(id),
            method: restaurantEndpoints.updateAccompagnement.method,
            service: 'restaurant',
            data: formdata,
        });

        return {
            status: 'success',
            message: 'Accompagnement mis à jour avec succès',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout du Accompagnement",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout du Accompagnement",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout du Accompagnement",
            };
        }
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
        const data = await apiClientHttp.request<Drink>({
            endpoint: restaurantEndpoints.addBoisson.endpoint,
            method: restaurantEndpoints.addBoisson.method,
            data: formdata,
            service: 'restaurant',
        });

        return {
            status: 'success',
            message: 'Boisson ajoutée avec succès',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de la boisson",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de la boisson",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout de la boisson",
            };
        }
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
        const data = await apiClientHttp.request<Drink>({
            endpoint: restaurantEndpoints.updateBoisson.endpoint(id),
            method: restaurantEndpoints.updateBoisson.method,
            data: formdata,
            service: 'restaurant',
        });

        return {
            status: 'success',
            message: 'Boisson mise à jour avec succès',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de la boisson",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de la boisson",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout de la boisson",
            };
        }
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
        const data = await apiClientHttp.request<Option>({
            endpoint: restaurantEndpoints.addPlatOption.endpoint,
            method: restaurantEndpoints.addPlatOption.method,
            data: formdata,
            service: 'restaurant',
        });

        return {
            status: 'success',
            message: 'Option ajoutée avec succès',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de l'option",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de l'option",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout de l'option",
            };
        }
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
        const data = await apiClientHttp.request<OptionValue>({
            endpoint: restaurantEndpoints.addPlatOptionValue.endpoint,
            method: restaurantEndpoints.addPlatOptionValue.method,
            data: formdata,
            service: 'restaurant',
        });

        return {
            status: 'success',
            message: "Valeur de l'option ajoutée avec succès",
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de la valeur de l'option",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de la valeur de l'option",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout de la valeur de l'option",
            };
        }
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
        const data = await apiClientHttp.request<Option>({
            endpoint: restaurantEndpoints.addPlatOption.endpoint,
            method: restaurantEndpoints.addPlatOption.method,
            data: formdata,
            service: 'restaurant',
        });

        return {
            status: 'success',
            message: 'Option mise à jour avec succès',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de la valeur de l'option",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de l'ajout de la valeur de l'option",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de l'ajout de la valeur de l'option",
            };
        }
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
        const data = await apiClientHttp.request<OptionValue>({
            endpoint: restaurantEndpoints.addPlatOptionValue.endpoint,
            method: restaurantEndpoints.addPlatOptionValue.method,
            data: formdata,
            service: 'restaurant',
        });

        return {
            status: 'success',
            message: "Valeur de l'option mise à jour avec succès",
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de la mise à jour de la valeur de l'option",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur lors de la mise à jour de la valeur de l'option",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur lors de la mise à jour de la valeur de l'option",
            };
        }
    }
}

export async function repositionnerLivreur(commande: RepositionnerCommande): Promise<any> {
    try {
        const data = await apiClientHttp.request({
            endpoint: restaurantEndpoints.repositionnerLivreur.endpoint,
            method: restaurantEndpoints.repositionnerLivreur.method,
            service: 'backend',
            data: commande,
        });
        return {
            status: 'success',
            message: 'Livreur répositionné avec succès',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Une erreur est survenue lors du repositionnement du livreur",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Une erreur est survenue lors du repositionnement du livreur",
            };
        } else {
            return {
                status: 'error',
                message: "Une erreur est survenue lors du repositionnement du livreur",
            };
        }
    }
}

export async function retirerLivreur(livreurId: string): Promise<any> {
    try {
        const data = await apiClientHttp.request({
            endpoint: restaurantEndpoints.retirerLivreur.endpoint,
            method: restaurantEndpoints.retirerLivreur.method,
            service: 'restaurant',
            data: { livreurId },
        });
        return {
            status: 'success',
            message: 'Livreur retirer avec succès',
            data: data,
        };
    } catch (error: any) {
        if (error?.response?.data && error.response?.data?.detail) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur s'est produite ",
            };
        } else if (error?.response?.data?.message) {
            return {
                status: 'error',
                message: error?.response?.data?.detail ?? "Erreur s'est produite ",
            };
        } else {
            return {
                status: 'error',
                message: "Erreur s'est produite ",
            };
        }
    }
}
