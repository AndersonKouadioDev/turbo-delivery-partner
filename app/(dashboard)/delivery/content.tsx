'use client';
import { title } from '@/components/primitives';
import { CourseExterne, PaginatedResponse, Restaurant } from '@/types/models';
import { Clock, MapPin, User, Package, CreditCard, Store, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button, Card, CardBody, CardHeader, Input, Chip, Divider, Pagination, Skeleton } from '@nextui-org/react';
import { IconPlus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SORT_OPTIONS } from '@/data';
import { MarkerData } from '@/types';
import DeliveryTools from './component/deliveryTools';

type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

const getStatusColor = (statut: string) => {
    switch (statut.toUpperCase()) {
        case 'TERMINER':
            return 'warning';
        case 'VALIDER':
            return 'success';
        case 'ANNULER':
            return 'danger';
        case 'EN_ATTENTE':
            return 'secondary';
        default:
            return 'default';
    }
};

const getStatusBorderClass = (statut: string) => {
    switch (statut.toUpperCase()) {
        case 'TERMINER':
            return 'border-2 border-warning';
        case 'VALIDER':
            return 'border-2 border-success';
        case 'ANNULER':
            return 'border-2 border-danger';
        case 'EN_ATTENTE':
            return 'border-2 border-secondary';
        default:
            return 'border border-default';
    }
};

interface Props {
    restaurant: Restaurant;
    initialData: PaginatedResponse<CourseExterne> | null;
}

export default function Content({ restaurant, initialData }: Props) {
    // États
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState<SortOption>(SORT_OPTIONS.DATE_DESC);
    const [expandedDelivery, setExpandedDelivery] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [data, setData] = useState<PaginatedResponse<CourseExterne> | null>(initialData);
    const [isLoading, setIsLoading] = useState(!initialData);

    // Fonction pour construire l'URL avec tous les paramètres
    const buildFetchUrl = () => {
        const params = new URLSearchParams({
            page: (currentPage - 1).toString(),
            size: pageSize.toString(),
            // sort: sortBy,
        });

        if (searchTerm) params.append('search', searchTerm);
        if (statusFilter !== 'all') params.append('status', statusFilter);

        return `/api/restaurant/course-externe/${restaurant.id}/pagination?${params.toString()}`;
    };

    // Fonction de récupération des données
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(buildFetchUrl());
            if (!response.ok) throw new Error('Network response was not ok');
            const newData: PaginatedResponse<CourseExterne> = await response.json();
            setData(newData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Effect pour le debouncing de la recherche
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setCurrentPage(1); // Reset page when filters change
            fetchData();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [currentPage, searchTerm, statusFilter, sortBy, restaurant.id]);

    // Handlers
    const handleAccept = async (deliveryId: string) => {
        try {
            const response = await fetch(`/api/delivery/${deliveryId}/accept`, {
                method: 'PUT',
            });
            if (response.ok) {
                fetchData(); // Refresh data after accepting
            }
        } catch (error) {
            console.error('Error accepting delivery:', error);
        }
    };

    const handleReject = async (deliveryId: string) => {
        try {
            const response = await fetch(`/api/delivery/${deliveryId}/reject`, {
                method: 'PUT',
            });
            if (response.ok) {
                fetchData(); // Refresh data after rejecting
            }
        } catch (error) {
            console.error('Error rejecting delivery:', error);
        }
    };

    const handleReset = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setSortBy(SORT_OPTIONS.DATE_DESC);
        setCurrentPage(1);
    };

    const toggleExpand = (deliveryId: string) => {
        setExpandedDelivery(expandedDelivery === deliveryId ? null : deliveryId);
    };
    return (
        <div className="w-full h-full pb-10 flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Mes Courses</h1>
                <Button as={Link} href="/delivery/create" color="primary" size="sm" startContent={<IconPlus className="h-5 w-5" />}>
                    Demande de coursier
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Input
                    startContent={<Search className="text-gray-500 w-4 h-4" />}
                    label="Rechercher par code"
                    variant="bordered"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                    size="sm"
                />
                {/* <div className="flex items-center flex-1 gap-4">
                    <Select label="Filtrer par statut" variant="bordered" selectedKeys={[statusFilter]} onChange={(e) => setStatusFilter(e.target.value)}>
                        <SelectItem key="all">Tous les statuts</SelectItem>
                        <SelectItem key={'EN_ATTENTE'}>EN_ATTENTE</SelectItem>
                        <SelectItem key={'EN_COURS'}>EN_COURS</SelectItem>
                        <SelectItem key={'TERMINE'}>TERMINE</SelectItem>
                        <SelectItem key={'ANNULE'}>ANNULE</SelectItem>
                    </Select>

                    <Select label="Trier par" variant="bordered" selectedKeys={[sortBy]} onChange={(e) => setSortBy(e.target.value as SortOption)}>
                        <SelectItem key={SORT_OPTIONS.DATE_DESC}>Plus récent</SelectItem>
                        <SelectItem key={SORT_OPTIONS.DATE_ASC}>Plus ancien</SelectItem>
                        <SelectItem key={SORT_OPTIONS.TOTAL_DESC}>Montant décroissant</SelectItem>
                        <SelectItem key={SORT_OPTIONS.TOTAL_ASC}>Montant croissant</SelectItem>
                    </Select>

                    <Button variant="bordered" className="shrink-0" onClick={handleReset}>
                        Réinitialiser
                    </Button>
                </div> */}
            </div>

            {isLoading ? (
                <div className="flex flex-col gap-6">
                    {[...Array(2)].map((_, index) => (
                        <Skeleton key={index} className="rounded-lg h-52" />
                    ))}
                </div>
            ) : data?.content.length ? (
                <>
                    <div className="grid grid-cols-1 gap-6">
                        {data.content.map((delivery) => (
                            <Card key={delivery.id} className={`w-full ${getStatusBorderClass(delivery.statut)}`}>
                                <CardHeader className="flex justify-between">
                                    <div className="flex items-center gap-4">
                                        <Chip color={getStatusColor(delivery.statut)} variant="flat">
                                            {delivery.statut}
                                        </Chip>
                                        <span className="text-default-500 font-bold">Code: {delivery.code}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <DeliveryTools restaurant={restaurant} delivery={delivery} />

                                        <Button isIconOnly color="primary" variant="light" onClick={() => toggleExpand(delivery.id)}>
                                            {expandedDelivery === delivery.id ? <ChevronUp /> : <ChevronDown />}
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardBody>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Store className="text-default-500" />
                                            <div>
                                                <p className="text-default-700">{delivery.restaurant.nomEtablissement}</p>
                                                <p className="text-default-500 text-sm">{delivery.restaurant.commune}</p>
                                            </div>
                                        </div>

                                        <Divider />

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <Package className="text-default-500" />
                                                <span>
                                                    {delivery.nombreCommande} commande{delivery.nombreCommande > 1 ? 's' : ''}
                                                </span>
                                            </div>
                                            <span className="text-large font-semibold">{delivery.total.toFixed(2)} FCFA</span>
                                        </div>

                                        {expandedDelivery === delivery.id && (
                                            <div className="mt-4 space-y-4">
                                                {delivery.commandes.map((commande, index) => (
                                                    <Card key={commande.id} className="w-full">
                                                        <CardBody>
                                                            <div className="space-y-3">
                                                                <div className="flex justify-between">
                                                                    <h4 className="font-medium">Commande #{index + 1}</h4>
                                                                    <span className="text-default-500 font-bold">{commande.numero}</span>
                                                                </div>

                                                                <div className="flex items-start gap-2">
                                                                    <User className="text-default-500 mt-1" />
                                                                    <div>
                                                                        <p className="text-default-700">{commande.destinataire.nomComplet}</p>
                                                                        <p className="text-default-500">{commande.destinataire.contact}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-start gap-2">
                                                                    <MapPin className="text-default-500 mt-1" />
                                                                    <p className="text-default-600">{`${commande.lieuLivraison.latitude}, ${commande.lieuLivraison.longitude}`}</p>
                                                                </div>

                                                                <Divider />

                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex items-center gap-2">
                                                                        <CreditCard className="text-default-500" />
                                                                        <span className="text-default-600">{commande.modePaiement}</span>
                                                                    </div>
                                                                    <span className="font-semibold">{commande.prix.toFixed(2)} FCFA</span>
                                                                </div>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                ))}
                                                {/* <MapComponent
                                                    markers={delivery.commandes.map(
                                                        (c, index) =>
                                                            ({
                                                                start: { lat: c.lieuLivraison.latitude ?? 0, lng: c.lieuLivraison.longitude ?? 0 },
                                                                end: { lat: c.lieuRecuperation.latitude ?? 0, lng: c.lieuRecuperation.longitude ?? 0 },
                                                                color: ROUTE_COLORS[index % ROUTE_COLORS.length],
                                                            }) as MarkerData,
                                                    )}
                                                    restaurant={restaurant}
                                                /> */}
                                            </div>
                                        )}

                                        <Divider />

                                        <div className="flex items-center gap-2">
                                            <Clock className="text-default-500" />
                                            <div>
                                                <p className="text-default-600">Début: {delivery.dateHeureDebut}</p>
                                                <p className="text-default-600">Fin: {delivery.dateHeureFin ?? '---'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center mt-8">
                        <Pagination total={data.totalPages} page={currentPage} onChange={setCurrentPage} showControls color="primary" variant="bordered" isDisabled={isLoading} />
                    </div>
                </>
            ) : (
                <Card className="min-h-52">
                    <CardBody className="flex justify-center items-center">
                        <p className="text-center text-default-500">Aucune course ne correspond à vos critères de recherche. Essayez de modifier vos filtres.</p>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}
