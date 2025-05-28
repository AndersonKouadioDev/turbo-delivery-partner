'use client';

import { Input } from "@heroui/react";
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { body, title } from '@/components/primitives';
import { Lock } from 'lucide-react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { changePassword } from '@/src/actions/users.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


export function FormChangePassword({ isOpen, onOpenChange, userName, oldPassword }: { isOpen: boolean; onOpenChange?: (open: boolean) => void; userName: string; oldPassword: string }) {
    const router = useRouter();

    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            formData.set('username', userName);
            formData.set('oldPassword', oldPassword);
            const result = await changePassword(prevState, formData);

            if (result.status === 'success') {
                toast.success(result.message || 'Bravo ! vous avez réussi');
                onOpenChange && onOpenChange(false);
                router.push('/auth');
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
        <Modal isOpen={isOpen} onOpenChange={() => { }}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <h2 className={title({ size: 'h3' })}>Nouveau mot de passe</h2>
                    <p className={body({ size: 'caption', class: 'mt-4' })}>Veuillez saisir votre nouveau mot de passe.</p>
                </ModalHeader>

                <ModalBody>
                    <form action={formAction} className="space-y-6">
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

                            <ModalFooter>
                                <SubmitButton>Continuer</SubmitButton>
                            </ModalFooter>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
