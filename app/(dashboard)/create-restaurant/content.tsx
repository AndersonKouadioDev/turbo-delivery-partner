'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormState } from 'react-dom';

import { title } from '@/components/primitives';
import { FormControls, StepIndicator } from '@/components/ui/form-ui/form';
import { cn } from '@/lib/utils';
import { InformationRestauForm } from '@/components/dashboard/create_restaurant/informations-restau-form';
import { AddressRestauForm } from '@/components/dashboard/create_restaurant/address-restau-form';
import { DocumentRestauForm } from '@/components/dashboard/create_restaurant/document-restau-form';
import { createRestaurant } from '@/src/actions/restaurant.actions';
import { toast } from 'react-toastify';
import { _createRestaurantSchema, createRestaurantSchema } from '@/src/schemas/restaurants.schema';
import { useState } from 'react';

const steps: string[] = ["Informations sur l'établissement", "Adresse de l'établissement", "Documents de l'établissement"];

export default function CreateRestaurantContent() {
    const [currentStep, setCurrentStep] = useState<number>(0);

    const [state, formAction] = useFormState(
        async (_: any, formData: FormData) => {
            console.log('getValues', getValues());
            formData.set('idLocation', getValues().idLocation);
            formData.set('longitude', getValues().longitude);
            formData.set('latitude', getValues().latitude);

            const result = await createRestaurant(formData);
            if (result.status === 'success') {
                toast.success(result.message);

                window.location.href = '/';
            } else {
                toast.error(result.message);
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

    const {
        formState: { errors },
        trigger,
        control,
        setValue,
        getValues,
    } = useForm<_createRestaurantSchema>({
        resolver: zodResolver(createRestaurantSchema),
        defaultValues: {
            nomEtablissement: undefined,
            description: undefined,
            commune: '',
            email: undefined,
            telephone: undefined,
            localisation: undefined,
            codePostal: undefined,
            docUrl: undefined,
            cniUrl: undefined,
            logoUrl: undefined,
            dateService: undefined,
            idLocation: '',
            latitude: '',
            longitude: '',
        },
    });

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

    const getFieldsToValidate = (step: number): (keyof _createRestaurantSchema)[] => {
        switch (step) {
            case 0:
                return ['nomEtablissement', 'description', 'commune'];
            case 1:
                return ['email', 'telephone', 'codePostal', 'localisation', 'idLocation', 'longitude', 'latitude'];
            case 2:
                return ['docUrl', 'cniUrl', 'logoUrl', 'dateService'];
            default:
                return [];
        }
    };

    return (
        <div className="p-4 lg:p-10 min-h-screen">
            <div className="w-full relative flex justify-center">
                <div>
                    {/* Navigation */}
                    <StepIndicator currentStep={currentStep + 1} steps={steps} />
                    <div className="flex items-center justify-center py-12">
                        <div className="mx-auto grid w-full max-w-screen-xl gap-6">
                            <div className="relative grid gap-2">
                                <motion.h1 animate={{ opacity: 1, x: 0 }} className={cn(title({ size: 'h4' }), 'text-center')} initial={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                    Nouvel Etablissement
                                </motion.h1>
                                <form action={formAction} encType="multipart/form-data" className={cn('mt-8')}>
                                    <AnimatePresence mode="popLayout">
                                        <motion.div key={currentStep} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} initial={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                            <div className={cn(currentStep === 0 ? 'block' : 'hidden')}>
                                                <InformationRestauForm control={control} errors={errors} />
                                            </div>
                                            <div className={cn(currentStep === 1 ? 'block' : 'hidden')}>
                                                <AddressRestauForm control={control} errors={errors} setValue={setValue} />
                                            </div>
                                            <div className={cn(currentStep === 2 ? 'block' : 'hidden')}>
                                                <DocumentRestauForm control={control} errors={errors} />
                                            </div>
                                        </motion.div>

                                        <motion.div animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} initial={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                            <FormControls isSubmit={currentStep == 2} onNext={nextStep} onPrev={prevStep} />
                                        </motion.div>
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
