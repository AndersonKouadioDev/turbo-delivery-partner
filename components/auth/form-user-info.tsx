'use client';

import { Input, Button } from "@heroui/react";
import { useFormState } from 'react-dom';
import { useCallback, useState } from 'react';

import { body, title } from '@/components/primitives';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { InputPhone } from '@/components/ui/form-ui/input-phone';
import Link from 'next/link';
import { FormChangePassword } from './form-change-password';
import { registerFinalStep } from '@/src/actions/users.actions';
import { toast } from 'react-toastify';

export function FormUserInfo() {
    const [contact, setContact] = useState<string>('');

    // handle change password modal
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleChangeOpen = (value: boolean) => {
        setIsOpen(value);
    };

    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            const result = await registerFinalStep(prevState, formData);

            if (result.status === 'error') {
                toast.error(result.message);
            } else {
                toast.success(result.message);
                handleChangeOpen(true);
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
        <>
            {state && state.data && !state.data.changePassword && (
                <FormChangePassword isOpen={isOpen} onOpenChange={handleChangeOpen} userName={state.data?.username} oldPassword={state.data?.oldPassword} />
            )}

            <div className="w-full max-w-md space-y-8 bg-background p-10 rounded-lg shadow-xl">
                <div className="text-center">
                    <h2 className={title({ size: 'h3' })}>Terminer l&apos;inscription</h2>
                    <p className={body({ size: 'caption', class: 'mt-4' })}>Completez vos informations personnelles</p>
                </div>
                <form action={formAction} className="mt-8 space-y-6">
                    <div className="grid gap-4">
                        <Input
                            isRequired
                            required
                            errorMessage={state.errors?.username ?? ''}
                            isInvalid={!!state.errors?.username}
                            label="Nom d'utilisateur"
                            labelPlacement="outside"
                            name="username"
                            placeholder="Entrer votre nom d'utilisateur"
                            type="text"
                            variant="bordered"
                            radius="sm"
                        />
                        <Input
                            isRequired
                            required
                            errorMessage={state.errors?.lastName ?? ''}
                            isInvalid={!!state.errors?.lastName}
                            label="Nom"
                            labelPlacement="outside"
                            name="lastName"
                            placeholder="Entrer votre nom de famille"
                            type="text"
                            variant="bordered"
                            radius="sm"
                        />
                        <Input
                            isRequired
                            required
                            errorMessage={state.errors?.firstName ?? ''}
                            isInvalid={!!state.errors?.firstName}
                            label="Prénoms"
                            labelPlacement="outside"
                            name="firstName"
                            placeholder="Entrer votre prénom"
                            type="text"
                            variant="bordered"
                            radius="sm"
                        />

                        <InputPhone
                            isRequired
                            required
                            errorMessage={state.errors?.telephone ?? ''}
                            isInvalid={!!state.errors?.telephone}
                            label="Téléphone"
                            name="telephone"
                            placeholder="Téléphone"
                            setValue={(value: string) => setContact(value)}
                            value={contact}
                            variant="bordered"
                            radius="sm"
                        />

                        <SubmitButton>Continuer</SubmitButton>
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
        </>
    );
}
