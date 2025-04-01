'use client';

import { Control, Controller, FieldErrors } from 'react-hook-form';
import { _createDishSchema } from '@/src/schemas/restaurants.schema';
import { Input, Textarea } from "@heroui/react";
import { Input as Input2 } from '@/components/ui/input';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';
import { useRef } from 'react';

interface BasicInfoFormProps {
    control: Control<_createDishSchema>;
    errors: FieldErrors<_createDishSchema>;
}

export function BasicInfoForm({ control, errors }: BasicInfoFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-4">
            <Controller
                name="imageUrl"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                    <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                        {value ? (
                            <div className="relative w-full h-full">
                                <Image src={URL.createObjectURL(value)} alt="Preview" fill className="w-full h-full object-cover rounded-lg" />
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button type="button" onClick={() => onChange(null)} className="bg-red-500 text-white p-1 w-8 h-8 shrink-0 rounded-full hover:bg-red-600">
                                        <X size={24} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-blue-500 text-white p-1 shrink-0 rounded-full hover:bg-blue-600 cursor-pointer"
                                    >
                                        <Camera size={24} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex flex-col items-center justify-center w-full h-full"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-600">Importer des photos du menu</p>
                                </div>
                            </button>
                        )}
                        <Input2
                            {...field}
                            ref={fileInputRef}
                            type="file"
                            accept=".jpg,.png,.jpeg"
                            onChange={(e) => onChange(e.target.files?.[0])}
                            required
                            className="sr-only"
                            aria-label="Image upload"
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="libelle"
                render={({ field }) => (
                    <Input
                        {...field}
                        isRequired
                        aria-invalid={errors.libelle ? 'true' : 'false'}
                        aria-label="libelle input"
                        errorMessage={errors.libelle?.message ?? ''}
                        isInvalid={!!errors.libelle}
                        label="Nom du plat"
                        name="libelle"
                        placeholder="Nom du plat"
                        type="text"
                        value={field.value ?? ''}
                        variant="faded"
                    />
                )}
            />
            <Controller
                control={control}
                name="price"
                render={({ field }) => (
                    <Input
                        {...field}
                        isRequired
                        aria-invalid={errors.price ? 'true' : 'false'}
                        aria-label="price input"
                        errorMessage={errors.price?.message ?? ''}
                        isInvalid={!!errors.price}
                        label="Prix du plat"
                        name="price"
                        placeholder="Prix du plat"
                        min={1}
                        type="number"
                        value={field.value ?? ''}
                        variant="faded"
                    />
                )}
            />
            <Controller
                control={control}
                name="description"
                render={({ field }) => (
                    <Textarea
                        {...field}
                        isRequired
                        aria-invalid={errors.description ? 'true' : 'false'}
                        aria-label="description input"
                        errorMessage={errors.description?.message ?? ''}
                        isInvalid={!!errors.description}
                        label="Description du plat"
                        name="description"
                        placeholder="Description du plat"
                        value={field.value ?? ''}
                        variant="faded"
                    />
                )}
            />
            <Controller
                control={control}
                name="cookTime"
                render={({ field }) => (
                    <Input
                        {...field}
                        isRequired
                        aria-invalid={errors.cookTime ? 'true' : 'false'}
                        aria-label="cookTime input"
                        errorMessage={errors.cookTime?.message ?? ''}
                        isInvalid={!!errors.cookTime}
                        label="Temps de cuisson"
                        placeholder="1h, 30min, ..."
                        name="cookTime"
                        type="text"
                        value={field.value ?? ''}
                        variant="faded"
                    />
                )}
            />
        </div>
    );
}

