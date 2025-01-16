'use client';

import { useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react';
import { AllCommandeSchema, defaultCommande, FormValues } from '@/src/schemas/courses.schema';
import { CommandeFormSection } from './components/CommandeFormSection';
import { MapComponent } from './components/MapComponent';
import { Restaurant } from '@/types/models';
import { addCourseExterne } from '@/src/actions/courses.actions';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
export interface CourseExterneFormProps {
    initialData?: FormValues;
    isEditing?: boolean;
    restaurant: Restaurant;
}

const CourseExterneForm = ({ initialData, isEditing = false, restaurant }: CourseExterneFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    // console.log(restaurant);
    const form = useForm<FormValues>({
        resolver: zodResolver(AllCommandeSchema),
        defaultValues: initialData || {
            commandes: [defaultCommande],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'commandes',
    });

    const handleAddressSelect = useCallback(
        (index: number, type: 'lieuRecuperation' | 'lieuLivraison') => {
            const autocomplete = new google.maps.places.Autocomplete(document.getElementById(`${type}-${index}`) as HTMLInputElement, {});

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry?.location) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    form.setValue(`commandes.${index}.${type}.latitude`, lat);
                    form.setValue(`commandes.${index}.${type}.longitude`, lng);
                    form.setValue(`commandes.${index}.${type}.address`, place.formatted_address || '');
                }
            });
        },
        [form],
    );

    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            const result = await addCourseExterne(form.getValues(), restaurant.id);
            if (result.status === 'success') {
                toast.success(result.message);
                router.push("/delivery")
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

    return (
        <div className="mx-auto py-8 px-4 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-primary">{isEditing ? 'Modifier la course' : 'Nouvelle course'}</h1>
            </div>

            <Breadcrumbs>
                <BreadcrumbItem as={Link} href="/delivery">
                    Collections
                </BreadcrumbItem>
                <BreadcrumbItem>Nouvelle demande de course</BreadcrumbItem>
            </Breadcrumbs>

            <div className="p-6">
                <Form {...form}>
                    <form action={formAction} className="space-y-6">
                        {fields.map((field, index) => (
                            <CommandeFormSection key={field.id} index={index} form={form} remove={remove} handleAddressSelect={handleAddressSelect} restaurant={restaurant} />
                        ))}

                        <Button type="button" variant="bordered" className="w-full" onClick={() => append(defaultCommande)}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Ajouter une commande
                        </Button>

                        <MapComponent fields={fields} form={form} restaurant={restaurant} />

                        <SubmitButton color="primary" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Envoi en cours...' : isEditing ? 'Mettre à jour' : 'Créer'}
                        </SubmitButton>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CourseExterneForm;
