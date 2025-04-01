'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDishSchema, type _createDishSchema } from '@/src/schemas/restaurants.schema';
import { BasicInfoForm } from '@/components/dashboard/collections/dish/basic-info-form';
import { CollectionsForm } from '@/components/dashboard/collections/dish/collections-form';
import { Button, Progress, Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import Link from 'next/link';
import { Collection } from '@/types/models';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';
import { addDish } from '@/src/actions/restaurant.actions';
import { useRouter } from 'next/navigation';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const steps = [
    { id: 'collections', title: 'Collections' },
    { id: 'basic', title: 'Informations de base' },
];

export default function CreateDishPage({ collections }: { collections: Collection[] }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    const [state, formAction] = useFormState(
        async (_: any, formData: FormData) => {
            const fieldsToValidate = getFieldsToValidate(currentStep);
            const isValid = await trigger(fieldsToValidate);
            if (isValid) {
                const result = await addDish(formData);

                if (result.status === 'success') {
                    toast.success(result.message);
                    router.push(`/collections/dish/${result.data?.id}`);
                } else {
                    toast.error(result.message);
                }

                return result;
            }
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
        trigger,
        control,
    } = useForm<_createDishSchema>({
        resolver: zodResolver(createDishSchema),
        defaultValues: {
            collectionId: '',
            libelle: '',
            description: '',
            price: '',
            cookTime: '',
            imageUrl: undefined,
        },
    });

    const getFieldsToValidate = (step: number): (keyof _createDishSchema)[] => {
        switch (step) {
            case 0:
                return ['collectionId'];
            case 1:
                return ['libelle', 'description', 'price', 'cookTime', 'imageUrl'];
            default:
                return [];
        }
    };

    const nextStep = async () => {
        const fieldsToValidate = getFieldsToValidate(currentStep);
        const isValid = await trigger(fieldsToValidate);

        if (isValid) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <Breadcrumbs>
                <BreadcrumbItem as={Link} href="/collections">
                    Collections
                </BreadcrumbItem>
                <BreadcrumbItem>Ajout de plat</BreadcrumbItem>
            </Breadcrumbs>
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">Créer un plat</h1>
                <Progress value={((currentStep + 1) / steps.length) * 100} />
                <p className="mt-2 text-sm text-gray-600">
                    Étape {currentStep + 1} sur {steps.length}: {steps[currentStep].title}
                </p>
            </div>

            <form action={formAction} className="space-y-8">
                <AnimatePresence mode="popLayout">
                    <motion.div key={currentStep} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} initial={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                        <div className={cn(currentStep === 0 ? 'block' : 'hidden')}>
                            <CollectionsForm control={control} errors={errors} collections={collections} />
                        </div>
                        <div className={cn(currentStep === 1 ? 'block' : 'hidden')}>
                            <BasicInfoForm control={control} errors={errors} />
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between">
                    <Button type="button" variant="bordered" onClick={prevStep} disabled={currentStep === 0}>
                        Précédent
                    </Button>

                    {currentStep === steps.length - 1 ? (
                        <SubmitButton className="w-fit">Publier</SubmitButton>
                    ) : (
                        <Button color="primary" type="button" onClick={nextStep}>
                            Suivant
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
