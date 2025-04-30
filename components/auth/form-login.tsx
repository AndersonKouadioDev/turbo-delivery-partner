'use client';

import { Input } from "@heroui/react";
import { useFormState } from 'react-dom';

import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { body } from '@/components/primitives';
import { Lock, User } from 'lucide-react';
import Link from 'next/link';
import { loginUser } from '@/src/actions/users.actions';
import { toast } from 'react-toastify';
import { _loginSchema } from '@/src/schemas/users.schema';
import { useRouter } from 'next/navigation';

export function FormLogin() {
    const router = useRouter();
    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            const result = await loginUser(prevState, formData);

            if (result.status === 'error') {
                toast.error(result.message);
            } else {
                toast.success(result.message);
                router.push('/');
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
        <form action={formAction} className="mt-8 space-y-6">
            <div className="grid gap-2">
                <Input
                    isRequired
                    required
                    errorMessage={state?.errors?.username ?? ''}
                    isInvalid={!!state?.errors?.username}
                    label="Nom d'utilisateur"
                    name="username"
                    startContent={<User className="size-4 text-default-400" />}
                    type="text"
                    variant="bordered"
                    radius="sm"
                />

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
            </div>

            <div className="flex items-center justify-between">
                <Link href="/auth/recover-password" className={body({ size: 'caption', className: 'text-primary hover:underlined' })}>
                    Mot de passe oublié ?
                </Link>
            </div>
            <div>
                <SubmitButton>Connexion</SubmitButton>
            </div>
        </form>
    );
}
