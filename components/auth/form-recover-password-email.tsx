'use client';

import { Input } from '@nextui-org/react';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { body, title } from '@/components/primitives';
import { Mail } from 'lucide-react';
import { forgetPassword } from '@/src/actions/users.actions';
import { toast } from 'react-toastify';

export function FormRecoverPasswordEmail() {
    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            const result = await forgetPassword(prevState, formData);

            if (result.status === 'error') {
                toast.error(result.message);
            } else {
                toast.success(result.message);
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
                <h2 className={title({ size: 'h3' })}>Récupérer votre mot de passe</h2>
                <p className={body({ size: 'caption', class: 'mt-4' })}>
                    Pour récupérer votre mot de passe, saisissez l&apos;adresse e-mail que vous avez utilisée pour créer votre compte. Vous recevrez un lien pour réinitialiser votre mot de passe.
                </p>
            </div>
            <form action={formAction} className="mt-8 space-y-6">
                <div className="grid gap-4">
                    <Input
                        isRequired
                        required
                        errorMessage={state?.errors?.email ?? ''}
                        isInvalid={!!state?.errors?.email}
                        label="Email"
                        name="email"
                        startContent={<Mail className="size-4 text-default-400" />}
                        type="email"
                        variant="bordered"
                        radius="sm"
                    />

                    <SubmitButton>Continuer</SubmitButton>
                </div>
            </form>
        </div>
    );
}
