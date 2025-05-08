'use client';

import { useState, useCallback, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Form } from '@/components/ui/form';
import { BreadcrumbItem, Breadcrumbs, Button } from '@heroui/react';
import { AllCommandeSchema, FormValues } from '@/src/schemas/courses.schema';
import { CommandeFormSection } from './components/CommandeFormSection';
import { MapComponent } from '../component/MapComponent';
import { Restaurant } from '@/types/models';
import { addCourseExterne } from '@/src/actions/courses.actions';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { SubmitButton } from '@/components/ui/form-ui/submit-button';
import { MarkerData } from '@/types';
import { ROUTE_COLORS } from '@/data';
import { DeliveryFee } from '@/types/restaurant';

// Liste de 20 couleurs distinctes

export interface CourseExterneFormProps {
    initialData?: FormValues;
    isEditing?: boolean;
    restaurant: Restaurant;
    fraisLivraisons: DeliveryFee[];
}

const CourseExterneForm = ({ initialData, isEditing = false, restaurant, fraisLivraisons }: CourseExterneFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    const router = useRouter();
    // console.log(restaurant);
    const form = useForm<FormValues>({
        resolver: zodResolver(AllCommandeSchema),
        defaultValues: initialData || {
            commandes: [
                {
                    libelle: '',
                    numero: '',
                    destinataire: {
                        nomComplet: '',
                        contact: '',
                    },
                    lieuRecuperation: {
                        address: restaurant.localisation ?? '',
                        longitude: restaurant.longitude ?? 0,
                        latitude: restaurant.latitude ?? 0,
                    },
                    lieuLivraison: {
                        address: '',
                        longitude: 0,
                        latitude: 0,
                    },
                    modePaiement: 'ESPECE',
                    prix: 0,
                    livraisonPaye: false,
                    zoneId: '',
                },
            ],
        },
    });
    console.log("form++++++++++++++++++++++++++++", form.formState.errors)
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

                    // recherche les deux adresses
                    const othersMarker = markers.filter((m, ind) => ind != index);
                    const currentMarket = markers[index];
                    setMarkers([
                        ...othersMarker,
                        {
                            start: { lat: type == 'lieuRecuperation' ? lat : currentMarket.start.lat, lng: type == 'lieuRecuperation' ? lng : currentMarket.start.lng },
                            end: { lat: type == 'lieuLivraison' ? lat : currentMarket.end.lat, lng: type == 'lieuLivraison' ? lng : currentMarket.end.lng },
                            color: currentMarket.color,
                        },
                    ]);
                }
            });
        },
        [form, markers],
    );
    // Suivre les changements de champs pour mettre à jour les marqueurs
    useEffect(() => {
        const updatedMarkers = fields
            .map((field, index) => {
                const startLat = form.watch(`commandes.${index}.lieuRecuperation.latitude`);
                const startLng = form.watch(`commandes.${index}.lieuRecuperation.longitude`);
                const endLat = form.watch(`commandes.${index}.lieuLivraison.latitude`);
                const endLng = form.watch(`commandes.${index}.lieuLivraison.longitude`);

                if (isNaN(startLat) || isNaN(startLng) || isNaN(endLat) || isNaN(endLng)) {
                    return null;
                }
                return {
                    start: { lat: startLat, lng: startLng },
                    end: { lat: endLat, lng: endLng },
                    color: ROUTE_COLORS[index % ROUTE_COLORS.length],
                };
            })
            .filter((marker): marker is MarkerData => marker !== null);

        setMarkers(updatedMarkers);
    }, [fields, form]);

    const [state, formAction] = useFormState(
        async (prevState: any, formData: FormData) => {
            console.log("form.getValues()", form.getValues())
            console.log("data", form.getValues())
            const result = await addCourseExterne(form.getValues(), restaurant.id);
            if (result.status === 'success') {
                toast.success(result.message);
                router.push('/delivery');
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
                <h1 className="text-2xl font-bold text-primary">{isEditing ? 'Modifier la demande coursier' : 'Nouvelle demande coursier'}</h1>
            </div>

            <Breadcrumbs>
                <BreadcrumbItem as={Link} href="/delivery">
                    Mes Courses
                </BreadcrumbItem>
                <BreadcrumbItem>Nouvelle demande de coursier</BreadcrumbItem>
            </Breadcrumbs>

            <div className="p-6">
                <Form {...form}>
                    <form action={formAction} className="space-y-6">
                        {fields.map((field, index) => (
                            <CommandeFormSection
                                key={field.id}
                                index={index}
                                form={form}
                                remove={remove}
                                handleAddressSelect={handleAddressSelect}
                                restaurant={restaurant}
                                fraisLivraisons={fraisLivraisons}
                            />
                        ))}

                        <Button
                            type="button"
                            variant="bordered"
                            className="w-full"
                            onClick={() =>
                                append({
                                    libelle: '',
                                    numero: '',
                                    destinataire: {
                                        nomComplet: '',
                                        contact: '',
                                    },
                                    lieuRecuperation: {
                                        address: restaurant.localisation ?? '',
                                        longitude: restaurant.longitude ?? 0,
                                        latitude: restaurant.latitude ?? 0,
                                    },
                                    lieuLivraison: {
                                        address: '',
                                        longitude: 0,
                                        latitude: 0,
                                    },
                                    modePaiement: 'ESPECE',
                                    prix: 0,
                                    livraisonPaye: false,
                                    zoneId: '',
                                })
                            }
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Ajouter une commande
                        </Button>

                        <MapComponent markers={markers} restaurant={restaurant} />

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
