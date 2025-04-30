'use client';

import { Card, CardBody, CardFooter, CardHeader, Button, Divider, Input } from "@heroui/react";

import { TbInfoCircle } from 'react-icons/tb';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importer useRouter
import { useFormState } from 'react-dom';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { body, title } from '@/components/primitives';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { ActionResult } from '@/types';

export const RestaurantDelete = ({ id, userEmail }: { id: string; userEmail: string }) => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const [, formAction] = useFormState<ActionResult<any>>(
        async (prevState: any) => {
            // const result = await deleteTeam(prevState, id);

            // if (result.status === 'success') {
            //     window.location.assign('/workspaces');
            // }

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

    return (
        <Card
            // isDisabled
            className="max-w-screen-lg p-1"
        >
            <CardHeader>
                <div className="flex flex-col gap-2 max-w-screen-sm">
                    <h1
                        className={title({
                            size: 'h5',
                        })}
                    >
                        Supprimer le restaurant
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Supprimez définitivement votre restaurant et tout son contenu de la plateforme Lunion-Booking. Cette action n&apos;est pas réversible – veuillez continuer avec prudence.
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                <div className="">
                    <Card radius="sm">
                        <CardBody>
                            <div className="flex items-center gap-2">
                                <TbInfoCircle size={16} />
                                <span className={body({ size: 'body2' })}>Vous ne pouvez pas supprimer votre dernière restaurant Hobby</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                <span className={body({ size: 'caption' })}>Pour supprimer votre compte, visitez Paramètres du compte.</span>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button color="primary">Supprimer</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-screen-xs">
                        <form action={formAction} className="flex flex-col gap-4">
                            <DialogHeader className="flex flex-col gap-4">
                                <DialogTitle>Suppression du restaurant</DialogTitle>
                                <DialogDescription>Êtes-vous sûr de vouloir supprimer votre restaurant ? Cette action est irréversible.</DialogDescription>
                            </DialogHeader>
                            <Divider />
                            <div className="flex flex-col gap-4 p-1">
                                <div className="">
                                    <Input autoComplete="false" name="email" placeholder="Entrer l'adresse e-email du manager" radius="sm" value={email} onValueChange={setEmail} />
                                </div>
                            </div>
                            <Divider />
                            <DialogFooter className="justify-end">
                                <DialogClose asChild>
                                    <Button size="sm" type="button">
                                        Fermer
                                    </Button>
                                </DialogClose>
                                <SubmitButton className="w-fit" isDisabled={email !== userEmail} size="sm" type="submit">
                                    Supprimer
                                </SubmitButton>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};
