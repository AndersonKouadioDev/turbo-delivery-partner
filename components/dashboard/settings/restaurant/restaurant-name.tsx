'use client';

import { Card, CardBody, CardFooter, CardHeader, Input, Divider } from '@nextui-org/react';
import { useFormState } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { body, title } from '@/components/primitives';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';

export const RestaurantName = ({ name, id }: { name: string; id: string }) => {
    const router = useRouter();

    const [, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            // const result = await updateTeam(prevState, formData, id);
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
        // resolver: zodResolver(),
        defaultValues: {
            name: name,
        },
    });

    return (
        <form action={formAction}>
            <Card className="max-w-screen-lg p-1">
                <CardHeader>
                    <div className="flex flex-col gap-2 w-full">
                        <h1
                            className={title({
                                size: 'h5',
                                className: 'max-w-screen-sm',
                            })}
                        >
                            Nom du restaurant
                        </h1>
                        <p className="text-sm text-muted-foreground max-w-screen-sm">C&apos;est le nom visible de votre restaurant au sein de Lunion-Booking.</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="">
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    isRequired
                                    aria-invalid={errors.name ? 'true' : 'false'}
                                    aria-label="name input"
                                    // errorMessage={errors.name?.message ?? ''}
                                    // isInvalid={!!errors.name}
                                    name="name"
                                    placeholder="Entrez le nom du restaurant"
                                    radius="sm"
                                    type="text"
                                    value={field.value ?? ''}
                                />
                            )}
                        />
                    </div>
                </CardBody>
                <Divider />
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                    <span className={body({ size: 'caption' })}>Veuillez utiliser 32 caractères au maximum.</span>
                    <SubmitButton className="w-fit" color="primary" type="submit">
                        Sauvegarder
                    </SubmitButton>
                </CardFooter>
            </Card>
        </form>
    );
};
