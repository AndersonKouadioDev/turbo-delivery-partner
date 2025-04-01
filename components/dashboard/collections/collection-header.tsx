import { CollectionWithDishes } from '@/types/models';
import { Button } from "@heroui/react";
import { IconPlus } from '@tabler/icons-react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function CollectionHeader({ collectionModel, totalPlat }: CollectionWithDishes) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <Link href="/collections" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour aux collections
                </Link>
                <Button as={Link} href={`/collections/dish/create?collectionId=${collectionModel.id}`} color="primary" size="sm" startContent={<IconPlus className="h-5 w-5 text-white" />}>
                    Ajouter un plat
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{collectionModel.libelle}</h1>
                    <p className="text-muted-foreground">
                        {totalPlat} {totalPlat > 1 ? 'plats' : 'plat'}
                    </p>
                </div>
            </div>
        </div>
    );
}
