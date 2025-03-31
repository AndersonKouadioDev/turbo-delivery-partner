'use client';

import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import Link from 'next/link';
import Image from 'next/image';
import { Picture, Restaurant } from '@/types/models';
import createUrlFile from '@/utils/createUrlFile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface ActivationDetailsProps {
    restaurant: Restaurant;
}

export default function Content({ restaurant }: ActivationDetailsProps) {
    const [isHoursExpanded, setIsHoursExpanded] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        return timeString.slice(0, 5);
    };

    const dayOrder = ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'];
    const sortedHours = [...restaurant.openingHours].sort((a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek));

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <header className="flex items-center gap-4 mb-8">
                <Button as={Link} href="/activation-pending" variant="light" isIconOnly className="p-0">
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-primary font-medium">Détails de la demande</h1>
            </header>

            {/* Main Content */}
            <div className="space-y-6">
                {/* Restaurant Info Card */}
                <Card>
                    <CardHeader className="flex gap-3">
                        <Image alt={restaurant.nomEtablissement} height={40} src={createUrlFile(restaurant.logo_Url, 'restaurant')} width={40} className="rounded-full" />
                        <div className="flex flex-col">
                            <p className="text-md font-semibold">{restaurant.nomEtablissement}</p>
                            <p className="text-small text-default-500">{restaurant.email}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>
                            <strong>Téléphone:</strong> {restaurant.telephone}
                        </p>
                        <p>
                            <strong>Adresse:</strong> {restaurant.localisation}, {restaurant.commune}
                        </p>
                        <p>
                            <strong>Code Postal:</strong> {restaurant.codePostal}
                        </p>
                        <p>
                            <strong>Date de création:</strong> {formatDate(restaurant.dateCreation)}
                        </p>
                        <p>
                            <strong>Description:</strong> {restaurant.description}
                        </p>
                        <div className="flex justify-center mt-10">{restaurant?.pictures && restaurant?.pictures?.length > 0 && <RestaurantImages images={restaurant.pictures} />}</div>
                    </CardBody>
                </Card>

                {/* Opening Hours Card */}
                <Card>
                    <CardHeader className="flex justify-between cursor-pointer" onClick={() => setIsHoursExpanded(!isHoursExpanded)}>
                        <h2 className="text-lg font-semibold">Horaires d&apos;ouverture</h2>
                        {isHoursExpanded ? <ChevronUp /> : <ChevronDown />}
                    </CardHeader>
                    {isHoursExpanded && (
                        <CardBody>
                            {sortedHours.map((hour) => (
                                <div key={hour.id} className="flex justify-between py-1">
                                    <span className="font-medium">{hour.dayOfWeek}</span>
                                    {hour.closed ? (
                                        <span>Fermé</span>
                                    ) : (
                                        <span>
                                            {formatTime(hour.openingTime)} - {formatTime(hour.closingTime)}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </CardBody>
                    )}
                </Card>

                {/* Documents Card */}
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold">Documents</h2>
                    </CardHeader>
                    <CardBody>
                        <p>
                            <strong>Logo:</strong>{' '}
                            <Link href={createUrlFile(restaurant.logo_Url, 'restaurant')} target="_blank" className="text-blue-600 underline">
                                Voir le logo
                            </Link>
                        </p>
                        <p>
                            <strong>Document:</strong>{' '}
                            <Link href={createUrlFile(restaurant.documentUrl, 'restaurant')} target="_blank" className="text-blue-600 underline">
                                Voir le document
                            </Link>
                        </p>
                        <p>
                            <strong>CNI:</strong>{' '}
                            <Link href={createUrlFile(restaurant.cni, 'restaurant')} target="_blank" className="text-blue-600 underline">
                                Voir la CNI
                            </Link>
                        </p>
                    </CardBody>
                </Card>

                {/* Status Card */}
                <Card>
                    <CardBody>
                        <p className="text-lg font-semibold">
                            Statut de la demande:
                            {restaurant.status == 1 ? (
                                <span className="ml-2 text-yellow-600">En cours d&apos;examen</span>
                            ) : restaurant.status == 2 ? (
                                <span className="ml-2 text-blue-600">Prise en charge</span>
                            ) : (
                                <span className="ml-2 text-green-600">Demande acceptée</span>
                            )}
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}


function RestaurantImages({ images }: { images: Picture[] }) {
    return (
        <Carousel className="w-8/12"  opts={{
            align: "center",
          }}>
            <CarouselContent className='ml-4'>
                {images.map((picture) => (
                    <CarouselItem key={picture?.id} className="md:basis-1/2 lg:basis-1/3 h-60 relative p-4">
                        <Image alt={`Image ${picture?.id}`} fill className="object-cover p-4" src={createUrlFile(picture.pictureUrl ?? '', 'restaurant')} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
