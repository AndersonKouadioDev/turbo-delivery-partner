'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormState } from 'react-dom';

import { title } from '@/components/primitives';
import { cn } from '@/lib/utils';
import { _addPictureSchema, addPictureSchema } from '@/src/schemas/restaurants.schema';
import { addPicture } from '@/src/actions/restaurant.actions';
import { toast } from 'react-toastify';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function CreateRestaurantContent() {
    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            const result = await addPicture(prevState, formData);

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
        control,
    } = useForm<_addPictureSchema>({
        resolver: zodResolver(addPictureSchema),
        defaultValues: {
            pictures: undefined,
        },
    });

    return (
        <div className="p-4 lg:p-10 min-h-screen">
            <div className="w-full relative flex justify-center">
                <div>
                    <div className="flex items-center justify-center py-12">
                        <div className="mx-auto grid w-full max-w-screen-xl gap-6">
                            <div className="relative grid gap-2">
                                <motion.h1 animate={{ opacity: 1, x: 0 }} className={cn(title({ size: 'h4' }), 'text-center')} initial={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                    Ajout d&apos;images
                                </motion.h1>
                                <form action={formAction} encType="multipart/form-data" className={cn('mt-8')}>
                                    <AnimatePresence mode="popLayout">
                                        <motion.div animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} initial={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                            <Controller
                                                name="pictures"
                                                control={control}
                                                render={({ field: { onChange, value, ...field } }) => (
                                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                                        <Label htmlFor="pictures">Quelques images de l&apos;établissement</Label>
                                                        <Input {...field} type="file" accept=".jpg,.png" onChange={(e) => onChange(e.target.files?.[0])} required multiple max={5} />
                                                    </div>
                                                )}
                                            />
                                        </motion.div>

                                        <motion.div animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} initial={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                            <SubmitButton>Soumettre</SubmitButton>
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
