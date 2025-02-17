'use server';

import { redirect } from 'next/navigation';
import { signOut as signOutAuth } from '@/auth';

import { processFormData } from '@/utils/formdata-zod.utilities';
import { TrimPhoneNumber } from '@/utils/trim-phone-number';
import { ActionResult } from '@/types/index.d';
import { changePasswordSchema, loginSchema, newPasswordSchema, register1Schema, register2Schema, register3Schema } from '../schemas/users.schema';
import { signIn } from '@/auth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { apiClientHttp } from '@/lib/api-client-http';

// Configuration
const BASE_URL = '/api/V1/turbo/resto/user';

const usersEndpoints = {
    base: { endpoint: BASE_URL, method: 'POST' },
    login: { endpoint: `${BASE_URL}/login`, method: 'POST' },
    register1: { endpoint: `${BASE_URL}/register/stepfirst`, method: 'POST' },
    register2: { endpoint: `${BASE_URL}/register/stepsecond`, method: 'POST' },
    register3: { endpoint: `${BASE_URL}/register/finalstep`, method: 'POST' },
    changePassword: { endpoint: `${BASE_URL}/change/password`, method: 'POST' },
    forgetPassword: { endpoint: `${BASE_URL}/forget/password`, method: 'POST' },
    newPassword: { endpoint: `${BASE_URL}/new/password`, method: 'POST' },
};

export async function loginUser(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(
        loginSchema,
        formData,
        {
            useDynamicValidation: true,
        },
    );

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray[0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    try {
        await signIn('credentials-user', {
            username: formdata.username,
            password: formdata.password,
            redirect: false,
        });

        return {
            status: 'success',
            message: 'Connexion réussie',
        };
    } catch (error) {
        return {
            status: 'error',
            message: 'Erreur lors de la connexion',
        };
    }
}

export async function registerStepFirst(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(
        register1Schema,
        formData,
        {
            useDynamicValidation: true,
        },
    );

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray[0].message ?? 'Données manquantes ou mal formatées',
        };
    }
    try {
        await apiClientHttp.request({
            endpoint: usersEndpoints.register1.endpoint,
            method: usersEndpoints.register1.method,
            data: formdata,
            service: 'restaurant',
        });
    } catch (error: any) {
        return {
            status: 'error',
            message: error?.response?.data ?? error?.response?.data?.message ?? "Erreur lors de l'inscription étape 1",
        };
    }
    cookies().set('email_otp', formdata.email);
    redirect('/auth/signin?step=2');
}
export async function resendEmail(): Promise<void> {
    // Processing
    const hasCookie = cookies().has('email_otp');

    if (hasCookie) {
        const email = cookies().get('email_otp')?.value;

        try {
            await apiClientHttp.request({
                endpoint: usersEndpoints.register1.endpoint,
                method: usersEndpoints.register1.method,
                data: { email },
                service: 'restaurant',
            });
        } catch (error: any) {
            // return {
            //     status: 'error',
            //     message: error?.response?.data ?? error?.response?.data?.message ?? "Erreur lors de l'inscription étape 1",
            // };
        }
    }
}

export async function registerStepSecond(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(
        register2Schema,
        formData,
        {
            useDynamicValidation: true,
        },
    );

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    try {
        await apiClientHttp.request({
            endpoint: usersEndpoints.register2.endpoint,
            method: usersEndpoints.register2.method,
            data: formdata,
            service: 'restaurant',
        });
    } catch (error: any) {
        return {
            status: 'error',
            message: error?.response?.data ?? error?.response?.data?.message ?? "Erreur lors de l'envoi du code de validation",
        };
    }
    redirect('/auth/signin?step=3');
}

export async function registerFinalStep(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(
        register3Schema,
        formData,
        {
            useDynamicValidation: true,
            transformations: {
                telephone: (value) => TrimPhoneNumber(value).replace('+', ''),
            },
            excludeFields: ['telephoneCountry'],
        },
    );

    const hasCookie = cookies().has('email_otp');
    if (!hasCookie) {
        return {
            status: 'error',
            message: 'Données mal formatées',
        };
    }

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Données manquantes ou mal formatées',
        };
    }

    const email = cookies().get('email_otp')?.value;

    try {
        const data = await apiClientHttp.request({
            endpoint: usersEndpoints.register3.endpoint,
            method: usersEndpoints.register3.method,
            data: { ...formdata, email },
            service: 'restaurant',
        });
        return {
            status: 'success',
            message: 'Création du compte réussi',
            data: {
                username: data?.user?.username,
                oldPassword: data?.password,
                changePassword: data?.user?.changePassword,
            },
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error?.response?.data ?? error?.response?.data?.message ?? 'Erreur lors de la création du compte',
        };
    }
}

export async function changePassword(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(
        changePasswordSchema,
        formData,
        {
            useDynamicValidation: true,
            keyTransforms: { password: 'newPassword' },
        },
    );

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Mot de passe mal formaté',
        };
    }

    if (formdata.newPassword !== formdata.confirm_password) {
        return {
            status: 'error',
            message: 'Mot de passe et la confirmation ne sont pas identique',
        };
    }
    try {
        const data = await apiClientHttp.request({
            endpoint: usersEndpoints.changePassword.endpoint,
            method: usersEndpoints.changePassword.method,
            data: {
                newPassword: formdata.newPassword,
                oldPassword: formdata.oldPassword,
                username: formdata.username,
            },
            service: 'restaurant',
        });
        return {
            status: 'success',
            message: 'Changement de mot de passe réussi',
            data: data,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error?.response?.data ?? error?.response?.data?.message ?? 'Erreur lors du changement de mot de passe',
        };
    }
}

export async function forgetPassword(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(
        register1Schema,
        formData,
        {
            useDynamicValidation: true,
        },
    );

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Mot de passe mal formaté',
        };
    }
    let data;
    try {
        data = await apiClientHttp.request({
            endpoint: usersEndpoints.forgetPassword.endpoint,
            method: usersEndpoints.forgetPassword.method,
            data: formdata,
            service: 'restaurant',
        });
    } catch (error: any) {
        return {
            status: 'error',
            message: error?.response?.data ?? error?.response?.data?.message ?? 'Erreur lors du changement de mot de passe',
        };
    }
    // Récupérer le token à partir de l'URL dans le champ "link"
    const link = data?.link; // Récupérer l'URL
    const urlParams = new URL(link); // Créer un objet URL
    const token = urlParams.searchParams.get('token'); // Extraire le token

    if (token) {
        redirect(`/auth/recover-password?step=2&token=${token}`);
    }

    return {
        status: 'success',
        message: 'Email envoyé avec succès',
    };
}

export async function newPassword(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const {
        success,
        data: formdata,
        errorsInArray,
    } = processFormData(
        newPasswordSchema,
        formData,
        {
            useDynamicValidation: true,
            keyTransforms: { password: 'newPassword' },
        },
    );

    if (!success && errorsInArray) {
        return {
            status: 'error',
            message: errorsInArray![0].message ?? 'Mot de passe mal formaté',
        };
    }
    if (formdata.newPassword !== formdata.confirm_password) {
        return {
            status: 'error',
            message: 'Mot de passe et la confirmation ne sont pas identique',
        };
    }
    let data;
    try {
        data = await apiClientHttp.request({
            endpoint: usersEndpoints.newPassword.endpoint,
            method: usersEndpoints.newPassword.method,
            data: {
                token: formdata.token,
                newPassword: formdata.newPassword,
            },
            service: 'restaurant',
        });
    } catch (error: any) {
        if (error?.response?.data) {
            if (error?.response?.data?.message) {
                return {
                    status: 'error',
                    message: error?.response?.data?.message ?? 'Erreur lors du changement de mot de passe',
                };
            }
        }
        return {
            status: 'error',
            message: 'Erreur lors du changement de mot de passe',
        };
    }

    redirect('/auth');
}

export async function signOut(): Promise<void> {
    await signOutAuth({ redirectTo: '/auth' });
    revalidatePath('/', 'layout');
}
