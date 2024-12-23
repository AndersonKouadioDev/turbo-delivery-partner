import { Dish } from "@/types/models";
import { CollectionHeader } from "@/components/dashboard/collections/collection-header";
import { DishGrid } from "@/components/dashboard/collections/dish-grid";
import { getDishesByCollection, getDishesGroupByCollection } from "@/src/actions/restaurant.actions";
import { notFound } from "next/navigation";

interface CollectionPageProps {
  params: {
    id: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const collections = await getDishesGroupByCollection();
    const collection = collections.find((item) => item.collectionModel.id === params.id);
    const dishes = await getDishesByCollection(params.id);

    if (!collection) {
        return notFound();
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <CollectionHeader collectionModel={collection.collectionModel} totalPlat={collection.totalPlat} />
            <DishGrid dishes={dishes} />
        </div>
    );
}
