'use client';

import { Input } from '@nextui-org/react';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { body, title } from '@/components/primitives';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { registerStepFirst } from '@/src/actions/users.actions';
import { toast } from 'react-toastify';

export function FormEmail() {
    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            const result = await registerStepFirst(prevState, formData);

            if (result.status === 'success') {
                toast.success(result.message || 'Bravo ! vous avez réussi');
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
                <h2 className={title({ size: 'h3' })}>Inscription</h2>
                <p className={body({ size: 'caption', class: 'mt-4' })}>Veuillez entrer votre email ci-dessous pour commencer l&apos;inscription.</p>
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
                    <p
                        className={body({ size: 'caption', className: 'text-center' })}
                    >{`Nous vous enverrons un code de validation dans votre boîte de réception. Le code de validation peut parfois se retrouver dans les spams.`}</p>
                </div>
            </form>
            <div className="text-center">
                <p
                    className={body({
                        size: 'caption',
                        class: 'mt-2 text-sm text-gray-600',
                    })}
                >
                    Vous avez déjà un compte ?{' '}
                    <Link href="/auth" className="text-primary/80 hover:text-primary">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}
