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
        prevState,
    );

    if (!success) {
        prevState.message = 'Email mal formaté';
        return prevState;
    }

    try {
        await signIn('credentials-user', {
            username: formdata.username,
            password: formdata.password,
            redirect: false,
        });
        prevState.status = 'success';
        prevState.message = 'Connexion réussie';
        return prevState;
    } catch (error) {
        prevState.status = 'error';
        prevState.message = 'Erreur lors de la connexion';
        return prevState;
    }
}

export async function registerStepFirst(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const { success, data: formdata } = processFormData(
        register1Schema,
        formData,
        {
            useDynamicValidation: true,
        },
        prevState,
    );

    if (!success) {
        prevState.message = 'Email mal formaté';
        return prevState;
    }

    const response = await apiClient.post(usersEndpoints.register1, formdata);
    const result = await response.json();

    if (!response.ok) {
        prevState.message = result.message || "Erreur lors de l'inscription étape 1";
        return prevState;
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

        if (!response.ok) {
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
        prevState,
    );

    if (!success) {
        prevState.message = 'Données mal formatées';
        return prevState;
    }

    const response = await apiClient.post(usersEndpoints.register2, formdata);

    if (!response.ok) {
        const result = await response.json();
        prevState.status = 'error';
        prevState.message = result.message || "Erreur lors de l'envoi du code de validation";
        return prevState;
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
        prevState,
    );

    const hasCookie = cookies().has('email_otp');

    if (!success || !hasCookie) {
        prevState.message = 'Données mal formatées';
        return prevState;
    }

    const email = cookies().get('email_otp')?.value;

    const response = await apiClient.post(usersEndpoints.register3, { ...formdata, email });
    const result = await response.json();
    if (!response.ok) {
        prevState.status = 'error';
        prevState.message = result.message || 'Erreur lors de la création du compte';
        return prevState;
    }

    prevState.data = {
        username: result.user.username,
        oldPassword: result.password,
        changePassword: result.user.changePassword,
    };
    prevState.status = 'success';
    prevState.message = 'Création du compte réussi';

    return prevState;
}

export async function changePassword(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const { success, data: formdata } = processFormData(
        changePasswordSchema,
        formData,
        {
            useDynamicValidation: true,
            keyTransforms: { password: 'newPassword' },
        },
        prevState,
    );

    if (!success) {
        prevState.status = 'error';
        prevState.message = 'Mot de passe mal formaté';
        return prevState;
    }

    if (formdata.newPassword !== formdata.confirm_password) {
        prevState.status = 'error';
        prevState.message = 'Mot de passe et la confirmation ne sont pas identique';
        return prevState;
    }

    const response = await apiClient.post(usersEndpoints.changePassword, {
        newPassword: formdata.newPassword,
        oldPassword: formdata.oldPassword,
        username: formdata.username,
    });
    const result = await response.json();
    if (!response.ok) {
        prevState.status = 'error';
        prevState.message = result.message || 'Erreur lors du changement de mot de passe';
        return prevState;
    }

    prevState.data = result;
    prevState.status = 'success';
    prevState.message = 'Changement de mot de passe réussi';

    return prevState;
}

export async function forgetPassword(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const { success, data: formdata } = processFormData(
        register1Schema,
        formData,
        {
            useDynamicValidation: true,
        },
        prevState,
    );

    if (!success) {
        prevState.message = 'Données mal formatées';
        return prevState;
    }

    const response = await apiClient.post(usersEndpoints.forgetPassword, formdata);
    const result = await response.json();
    if (!response.ok) {
        prevState.message = result.message || 'Erreur lors du changement de mot de passe';
        return prevState;
    }
    // Récupérer le token à partir de l'URL dans le champ "link"
    const link = result.link; // Récupérer l'URL
    const urlParams = new URL(link); // Créer un objet URL
    const token = urlParams.searchParams.get('token'); // Extraire le token

    if (token) {
        redirect(`/auth/recover-password?step=2&token=${token}`);
    }
    prevState.status = 'success';
    prevState.message = 'Email envoyé avec succès';
    return prevState;
}

export async function newPassword(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    const { success, data: formdata } = processFormData(
        newPasswordSchema,
        formData,
        {
            useDynamicValidation: true,
            keyTransforms: { password: 'newPassword' },
        },
        prevState,
    );

    if (!success) {
        prevState.message = 'Données mal formatées';
        return prevState;
    }
    if (formdata.newPassword !== formdata.confirm_password) {
        prevState.status = 'error';
        prevState.message = 'Mot de passe et la confirmation ne sont pas identique';
        return prevState;
    }

    const response = await apiClient.post(usersEndpoints.newPassword, {
        token: formdata.token,
        newPassword: formdata.newPassword,
    });
    const result = await response.json();
    if (!response.ok) {
        prevState.status = 'error';
        prevState.message = result.message || 'Erreur lors du changement de mot de passe';
        return prevState;
    }

    redirect('/auth');
}

export async function signOut(): Promise<void> {
    await signOutAuth();
    revalidatePath('/', 'layout');
    redirect('/auth');
}
