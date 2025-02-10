'use server';

import { redirect } from 'next/navigation';
import { signOut as signOutAuth } from '@/auth';

import { processFormData } from '@/utils/formdata-zod.utilities';
import { TrimPhoneNumber } from '@/utils/trim-phone-number';
import { apiClient } from '@/lib/api-client';
import { ActionResult } from '@/types/index.d';
import usersEndpoints from '@/src/endpoints/users.endpoint';
import { changePasswordSchema, loginSchema, newPasswordSchema, register1Schema, register2Schema, register3Schema } from '../schemas/users.schema';
import { signIn } from '@/auth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function loginUser(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const { success, data: formdata } = processFormData(
        loginSchema,
        formData,
        {
            useDynamicValidation: true,
        },
    );

    if (!success) {
        return {
            status: 'error',
            message: 'Email mal formaté',
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
    const { success, data: formdata } = processFormData(
        register1Schema,
        formData,
        {
            useDynamicValidation: true,
        },
    );

    if (!success) {
        return {
            status: 'error',
            message: 'Données mal formatées',
        };
    }

    const response = await apiClient.post(usersEndpoints.register1, formdata);

    if (response.status !== 200) {
        return {
            status: 'error',
            message: response.data.message || "Erreur lors de l'inscription étape 1",
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

        const response = await apiClient.post(usersEndpoints.register1, { email });

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
    }
}

export async function registerStepSecond(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const { success, data: formdata } = processFormData(
        register2Schema,
        formData,
        {
            useDynamicValidation: true,
        },
    );

    if (!success) {
        return {
            status: 'error',
            message: 'Données mal formatées',
        };
    }

    const response = await apiClient.post(usersEndpoints.register2, formdata);

    if (response.status !== 200) {
        return {
            status: 'error',
            message: response.data.message || "Erreur lors de l'envoi du code de validation",
        };
    }

    redirect('/auth/signin?step=3');
}

export async function registerFinalStep(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const { success, data: formdata } = processFormData(
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

    if (!success || !hasCookie) {
        return {
            status: 'error',
            message: 'Données mal formatées',
        };
    }

    const email = cookies().get('email_otp')?.value;

    const response = await apiClient.post(usersEndpoints.register3, { ...formdata, email });
    if (response.status !== 200) {
        return {
            status: 'error',
            message: response.data.message || 'Erreur lors de la création du compte',
        };
    }

    return {
        status: 'success',
        message: 'Création du compte réussi',
        data: {
            username: response.data.user.username,
            oldPassword: response.data.password,
            changePassword: response.data.user.changePassword,
        },
    };
}

export async function changePassword(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const { success, data: formdata } = processFormData(
        changePasswordSchema,
        formData,
        {
            useDynamicValidation: true,
            keyTransforms: { password: 'newPassword' },
        },
    );

    if (!success) {
        return {
            status: 'error',
            message: 'Mot de passe mal formaté',
        };
    }

    if (formdata.newPassword !== formdata.confirm_password) {
        return {
            status: 'error',
            message: 'Mot de passe et la confirmation ne sont pas identique',
        };
    }

    const response = await apiClient.post(usersEndpoints.changePassword, {
        newPassword: formdata.newPassword,
        oldPassword: formdata.oldPassword,
        username: formdata.username,
    });
    if (response.status !== 200) {
        return {
            status: 'error',
            message: response.data.message || 'Erreur lors du changement de mot de passe',
        };
    }

    return {
        status: 'success',
        message: 'Changement de mot de passe réussi',
        data: response.data,
    };
}

export async function forgetPassword(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const { success, data: formdata } = processFormData(
        register1Schema,
        formData,
        {
            useDynamicValidation: true,
        },
    );

    if (!success) {
        return {
            status: 'error',
            message: 'Données mal formatées',
        };
    }

    const response = await apiClient.post(usersEndpoints.forgetPassword, formdata);
    if (response.status !== 200) {
        return {
            status: 'error',
            message: response.data.message || 'Erreur lors du changement de mot de passe',
        };
    }
    // Récupérer le token à partir de l'URL dans le champ "link"
    const link = response.data.link; // Récupérer l'URL
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
    const { success, data: formdata } = processFormData(
        newPasswordSchema,
        formData,
        {
            useDynamicValidation: true,
            keyTransforms: { password: 'newPassword' },
        },
    );

    if (!success) {
        return {
            status: 'error',
            message: 'Données mal formatées',
        };
    }
    if (formdata.newPassword !== formdata.confirm_password) {
        return {
            status: 'error',
            message: 'Mot de passe et la confirmation ne sont pas identique',
        };
    }
    try {
        const response = await apiClient.post(usersEndpoints.newPassword, {
            token: formdata.token,
            newPassword: formdata.newPassword,
        });
        if (response.status !== 200) {
            return {
                status: 'error',
                message: response.data.message || 'Erreur lors du changement de mot de passe',
            };
        }
    } catch (error) {
        return {
            status: 'error',
            message: 'Utilisz un autre mot de passe',
        };
    }
    redirect('/auth');
}

export async function signOut(): Promise<void> {
    await signOutAuth({ redirectTo: '/auth' });
    revalidatePath('/', 'layout');
}
