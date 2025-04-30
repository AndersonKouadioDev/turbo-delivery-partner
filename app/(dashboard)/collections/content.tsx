'use client';
import EmptyDataTable from '@/components/commons/EmptyDataTable';
import { title } from '@/components/primitives';
import { CollectionWithDishes } from '@/types/models';
import createUrlFile from '@/utils/createUrlFile';

import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@heroui/react';
import { IconPlus } from '@tabler/icons-react';
import { ChevronRight, HandPlatter } from 'lucide-react';
import Link from 'next/link';

export default function Content({ data }: { data: CollectionWithDishes[] }) {
    return (
        <div className="w-full h-full pb-10 flex flex-1 flex-col gap-4 lg:gap-6">
            <div className="flex items-center justify-between">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Collections</h1>
                <Button as={Link} href="/collections/dish/create" color="primary" size="sm" startContent={<IconPlus className="h-5 w-5 text-white" />}>
                    Ajouter un plat
                </Button>
            </div>

            {data && data.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((collection) => (
                        <Card key={collection.collectionModel.id} className="overflow-hidden">
                            <CardHeader className="flex justify-between gap-2">
                                <Image
                                    src={createUrlFile(collection.collectionModel?.pictureUrl ?? '', 'erp')}
                                    alt={collection.collectionModel?.libelle}
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                />
                                <div className="flex flex-col justify-center items-center ">
                                    <HandPlatter className="h-8 w-8 mr-2 text-pretty text-primary" />
                                    <span className="text-sm text-gray-500">{collection.totalPlat} plats</span>
                                </div>
                            </CardHeader>

                            <CardBody className="p-4"></CardBody>
                            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                                <h2 className="text-xl font-semibold">{collection.collectionModel.libelle}</h2>
                                <Button as={Link} href={`/collections/${collection.collectionModel.id}`} variant="bordered" size="sm" endContent={<ChevronRight className="h-5 w-5 text-primary" />}>
                                    <span>Voir la collection</span>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyDataTable />
            )}
        </div>
    );
}
