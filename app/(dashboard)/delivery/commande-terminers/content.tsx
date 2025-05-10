'use client'

import EmptyDataTable from "@/components/commons/EmptyDataTable";
import { ScrollBar } from "@/components/ui/scroll-area";
import { courses_statuses_filters } from "@/data";
import { Restaurant, PaginatedResponse, CourseExterne } from "@/types/models";
import { Button, Skeleton, Card, CardHeader, Chip, CardBody, Divider, Pagination } from "@heroui/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { IconPlus } from "@tabler/icons-react";
import { Link, ChevronUp, ChevronDown, Store, Package, User, MapPin, CreditCard, Clock } from "lucide-react";
import DeliveryTools from "../component/deliveryTools";
import { useContentCtx } from "./useContentCtx";
import { title } from '@/components/primitives';

interface Props {
    restaurant: Restaurant;
    initialData: PaginatedResponse<CourseExterne> | null;
}

export default function Content({ restaurant, initialData }: Props) {
    const ctrl = useContentCtx(initialData, restaurant);
    console.log("initialData", ctrl.data)

    return (
        <div className="w-full h-full pb-10 flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Mes Courses</h1>
                <Button as={Link} href="/delivery/create" color="primary" size="sm" startContent={<IconPlus className="h-5 w-5" />}>
                    Demande de coursier
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <ScrollArea className="w-full whitespace-nowrap pb-2">
                    {courses_statuses_filters.map((category) => (
                        <Button
                            key={category.id}
                            className="flex-shrink-0 mx-2"
                            variant={ctrl.statusFilter === category.id ? 'solid' : 'flat'}
                            color={ctrl.statusFilter === category.id ? 'primary' : 'default'}
                            onPress={() => ctrl.handleFilter(category.id)}
                            size="sm"
                        >
                            {category.name}
                        </Button>
                    ))}
                    <ScrollBar orientation="horizontal" className="h-0" />
                </ScrollArea>

                {/* <Input
                        startContent={<Search className="text-gray-500 w-4 h-4" />}
                        label="Rechercher par code"
                        variant="bordered"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                        size="sm"
                    /> */}
                {/* <div className="flex items-center flex-1 gap-4">
                        <Select label="Filtrer par statut" variant="bordered" selectedKeys={[statusFilter]} onChange={(e) => setStatusFilter(e.target.value)}>
                            <SelectItem key="all">Tous les statuts</SelectItem>
                            <SelectItem key={'EN_ATTENTE'}>En Attentes</SelectItem>
                            <SelectItem key={'VALIDER'}>Validées</SelectItem>
                            <SelectItem key={'EN_COURS'}>En Cours</SelectItem>
                            <SelectItem key={'TERMINER'}>Terminées</SelectItem>
                            <SelectItem key={'ANNULER'}>Annulées</SelectItem>
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

            {ctrl.isLoading ? (
                <div className="flex flex-col gap-6">
                    {[...Array(2)].map((_, index) => (
                        <Skeleton key={index} className="rounded-lg h-52" />
                    ))}
                </div>
            ) : (ctrl.data && ctrl.data.content.length) ? (
                <>
                    <div className="grid grid-cols-1 gap-6">
                        {ctrl.dataFilter && ctrl.dataFilter.map((delivery) => (
                            <Card key={delivery.id} className={`w-full ${ctrl.getStatusBorderClass(delivery.statut)}`}>
                                <CardHeader className="flex justify-between">
                                    <div className="flex items-center gap-4">
                                        <Chip color={ctrl.getStatusColor(delivery.statut)} variant="flat">
                                            {delivery.statut}
                                        </Chip>
                                        <span className="text-default-500 font-bold">Code: {delivery.code}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <DeliveryTools restaurant={restaurant} delivery={delivery} />

                                        <Button isIconOnly color="primary" variant="light" onClick={() => ctrl.toggleExpand(delivery.id)}>
                                            {ctrl.expandedDelivery === delivery.id ? <ChevronUp /> : <ChevronDown />}
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
                                            <span className="text-large font-semibold">{delivery.total.toFixed(2)} XOF</span>
                                        </div>

                                        {ctrl.expandedDelivery === delivery.id && (
                                            <div className="mt-4 space-y-4">
                                                {delivery.commandes.map((commande, index) => (
                                                    <Card key={commande.id} className="w-full">
                                                        <CardHeader className="flex justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <Chip size="sm" variant="flat" color={ctrl.getCommandeStatusColor(commande.statut)}>
                                                                    {commande.statut ?? 'EN_ATTENTE'}
                                                                </Chip>
                                                                <span className="text-default-500 font-bold">Commande #{commande.numero}</span>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <span className="text-default-500 font-bold">{index + 1}</span>
                                                            </div>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <div className="space-y-3">
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
                                                                    <span className="font-semibold">{commande.prix.toFixed(2)} XOF</span>
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

                    <div className="flex h-fit z-10 justify-center mt-8 fixed bottom-4">
                        <div className="bg-gray-200 absolute inset-0 w-full h-full blur-sm opacity-50"></div>
                        <Pagination total={ctrl.data?.totalPages ?? 1} page={ctrl.currentPage}
                            onChange={ctrl.fetchData} showControls color="primary" variant="bordered" isDisabled={ctrl.isLoading} />
                    </div>
                </>
            ) : (
                <EmptyDataTable />
            )}
        </div>
    )
}