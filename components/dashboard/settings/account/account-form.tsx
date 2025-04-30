'use client';

import { Input, Button } from "@heroui/react";
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { Account } from '@/data';
import { FormChangePassword } from '@/components/auth/form-change-password';

export const AccountForm = ({ account }: { account: any }) => {
    const router = useRouter();


    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            // const result = await updateTeam(prevState, formData, account.id);

            // router.refresh();

            // return result;
            return prevState;
        },
        {
            data: null,
            message: '',
            errors: {},
            status: 'idle',
            code: undefined,
        },
    );

    const {
        formState: { errors },
        control,
    } = useForm<any>({
        // resolver: zodResolver(_teamSchema), // Ajout du résolveur pour la validation
        defaultValues: {
            firstname: account.name,
            lastname: account.name,
            email: account.email,
            phone: account.phone,
        },
    });

    // handle change password modal
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleChangeOpen = (value: boolean) => {
        setIsOpen(value);
    };

    return (
        <div>
            <FormChangePassword isOpen={isOpen} onOpenChange={handleChangeOpen} userName={account.username} oldPassword={account.password} />
            <form action={formAction}>
                <div className="space-y-4">
                    <Controller
                        control={control}
                        name="firstname"
                        render={({ field }) => (
                            <Input
                                {...field}
                                isRequired
                                aria-invalid={errors.firstname ? 'true' : 'false'}
                                aria-label="name input"
                                // errorMessage={errors.firstname?.message ?? ""}
                                isInvalid={!!errors.firstname}
                                name="firstname"
                                placeholder="Entrez le nom du restaurant"
                                radius="sm"
                                type="text"
                                value={field.value ?? ''}
                                variant="bordered"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="lastname"
                        render={({ field }) => (
                            <Input
                                {...field}
                                isRequired
                                aria-invalid={errors.lastname ? 'true' : 'false'}
                                aria-label="lastname input"
                                isInvalid={!!errors.lastname}
                                name="lastname"
                                placeholder="Entrez votre nom"
                                radius="sm"
                                type="text"
                                value={field.value ?? ''}
                                variant="bordered"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <Input
                                {...field}
                                isRequired
                                aria-invalid={errors.email ? 'true' : 'false'}
                                aria-label="email input"
                                isInvalid={!!errors.email}
                                name="email"
                                placeholder="Entrez votre email"
                                radius="sm"
                                type="email"
                                value={field.value ?? ''}
                                variant="bordered"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                            <Input
                                {...field}
                                isRequired
                                aria-invalid={errors.phone ? 'true' : 'false'}
                                aria-label="phone input"
                                isInvalid={!!errors.phone}
                                name="phone"
                                placeholder="Entrez votre numéro de téléphone"
                                radius="sm"
                                type="tel"
                                value={field.value ?? ''}
                                variant="bordered"
                            />
                        )}
                    />
                    <div className="flex flex-col sm:flex-row justify-end gap-4 items-center">
                        <SubmitButton className="w-fit" color="primary" type="submit">
                            Sauvegarder
                        </SubmitButton>
                    </div>
                </div>
            </form>
            <div className="flex mt-10 flex-col sm:flex-row justify-between items-center border border-primary p-4 gap-4 shadow-sm rounded-md md:rounded-xl">
                <p>Vous pouvez changer votre mot de passe ici</p>
                <Button size="sm" onPress={() => handleChangeOpen(true)}>
                    Change password
                </Button>
            </div>
        </div>
    );
};
