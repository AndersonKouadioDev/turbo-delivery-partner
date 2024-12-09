'use client';

import { Input } from '@nextui-org/react';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { body, title } from '@/components/primitives';
import { Lock } from 'lucide-react';
import { newPassword } from '@/src/actions/users.actions';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';

export function FormRecoverPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            formData.set('token', token || '');
            const result = await newPassword(prevState, formData);

            if (result.status === 'success') {
                toast.success(result.message || 'Bravo ! vous avez réussi');
                // router.push('/auth');
            } else {
                toast.error(result.message || "Erreur lors de l'envoi de l'email");
            }

            return result;
        },
        {
            data: null,
            message: '',
            errors: {},
            status: 'idle',
            code: undefined,
        },
    );

    return (
        <div className="w-full max-w-md space-y-8 bg-background p-10 rounded-lg shadow-xl">
            <div className="text-center">
                <h2 className={title({ size: 'h3' })}>Modifier votre mot de passe</h2>
                <p className={body({ size: 'caption', class: 'mt-4' })}>Veuillez saisir votre nouveau mot de passe.</p>
            </div>
            <form action={formAction} className="mt-8 space-y-6">
                <div className="grid gap-4">
                    <Input
                        isRequired
                        required
                        errorMessage={state?.errors?.password ?? ''}
                        isInvalid={!!state?.errors?.password}
                        label="Mot de passe"
                        name="password"
                        startContent={<Lock className="size-4 text-default-400" />}
                        type="password"
                        variant="bordered"
                        radius="sm"
                    />
                    <Input
                        isRequired
                        required
                        errorMessage={state?.errors?.confirm_password ?? ''}
                        isInvalid={!!state?.errors?.confirm_password}
                        label="Confirmation du mot de passe"
                        name="confirm_password"
                        startContent={<Lock className="size-4 text-default-400" />}
                        type="password"
                        variant="bordered"
                        radius="sm"
                    />

                    <SubmitButton>Continuer</SubmitButton>
                </div>
            </form>
        </div>
    );
}
