'use client';

import { useState, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormState } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { title } from '@/components/primitives';
import { _addPictureSchema, addPictureSchema } from '@/src/schemas/restaurants.schema';
import { addPicture } from '@/src/actions/restaurant.actions';
import { toast } from 'react-toastify';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function FileUploadForm() {
    const [previews, setPreviews] = useState<string[]>([]);
    const [dragActive, setDragActive] = useState(false);

    const [state, formAction] = useFormState(
        async (_: any, formData: FormData) => {
            const result = await addPicture(formData);
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

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        if (files && files.length > 0) {
            handleFiles(files);
        }
    }, []);

    const handleFiles = (files: File[]) => {
        // const validFiles = files.filter((file) => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024).slice(0, 5);
        const validFiles = files;
        
        validFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removePreview = (index: number) => {
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4 lg:p-10 min-h-screen">
            <div className="w-full relative flex justify-center">
                <div className="mx-auto w-full max-w-screen-xl">
                    <motion.h1 animate={{ opacity: 1, x: 0 }} className={cn(title({ size: 'h4' }), 'text-center')} initial={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                        Ajout d&apos;images
                    </motion.h1>

                    <form action={formAction} encType="multipart/form-data" className="mt-8" onDragEnter={handleDrag}>
                        <AnimatePresence mode="popLayout">
                            <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} initial={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                <Controller
                                    name="pictures"
                                    control={control}
                                    render={({ field: { onChange, value, ...field } }) => (
                                        <div className="grid gap-4">
                                            <Label htmlFor="pictures">Images de l&apos;établissement</Label>

                                            <div
                                                className={cn('border-2 border-dashed rounded-lg p-8 text-center', dragActive ? 'border-primary' : 'border-gray-300', 'transition-colors duration-200')}
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                            >
                                                <input
                                                    {...field}
                                                    type="file"
                                                    accept=".jpg,.png,.jpeg"
                                                    multiple
                                                    max={3}
                                                    className="hidden"
                                                    id="file-upload"
                                                    onChange={(e) => {
                                                        const files = Array.from(e.target.files || []);
                                                        handleFiles(files);
                                                        onChange(e.target.files);
                                                    }}
                                                />
                                                <label htmlFor="file-upload" className="cursor-pointer text-primary hover:text-primary/80">
                                                    Cliquez pour sélectionner
                                                </label>
                                                <span className="text-muted-foreground"> ou glissez vos images ici</span>
                                                <p className="text-sm text-muted-foreground mt-2">PNG, JPG jusqu&apos;à 5MB (max 3 fichiers)</p>
                                            </div>

                                            {previews.length > 0 && (
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                                                    {previews.map((preview, index) => (
                                                        <motion.div
                                                            key={index}
                                                            className="relative aspect-square rounded-lg overflow-hidden group"
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.8 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <Image src={preview} alt={`Preview ${index + 1}`} fill className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removePreview(index)}
                                                                className="absolute top-2 right-2 p-1 rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                />
                            </motion.div>

                            <motion.div animate={{ opacity: 1, y: 0 }} className="mt-6" exit={{ opacity: 0, y: 20 }} initial={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                <SubmitButton>Soumettre</SubmitButton>
                            </motion.div>
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </div>
    );
}
