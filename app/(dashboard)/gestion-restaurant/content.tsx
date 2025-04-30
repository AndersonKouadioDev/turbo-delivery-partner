

"use client"
import { CardHeader } from "@/components/commons/card-header";
import { SearchField } from "@/components/commons/form/search-field";
import { PlusIcon } from "lucide-react";
import { Image, Button, Chip } from "@heroui/react";
import { FindOneRestaurant } from "@/types/models";
import Link from "next/link";
import { useGestionRestaurantController } from "./controller";
import { CreerRestaurantModale } from "../../../components/dashboard/gestion-restaurant/creer-restaurant/content";
import ReglageContent from "../../../components/dashboard/gestion-restaurant/reglages/regalges";

export default function Content({ restaurant }: { restaurant: FindOneRestaurant | null }) {
    const ctrl = useGestionRestaurantController()
    return (
        <div className="w-full px-6 py-4 bg-white space-y-5">

            <div className="flex flex-wrap justify-between items-center gap-4">
                <CardHeader title="Gérer vos restaurants" />
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="w-full sm:w-auto">
                        <SearchField searchKey="" onChange={() => ""} className=" sm:w-auto " />
                    </div>
                    <Button className="w-full sm:w-auto mt-3 lg:mt-0 md:mt-0 xl:mt-0 flex items-center justify-center h-10 gap-2 px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 transition"
                        onPress={ctrl.dialogClosture.onOpen}>
                        <PlusIcon className="h-4 w-4" />
                        Créer un restaurant
                    </Button>
                </div>
            </div>
            {
                ["0", "1"].map((_, index: number) => (
                    <div className="flex flex-wrap justify-between items-center gap-4 border rounded-lg border-primary p-4">
                        <div className="flex items-center gap-2">
                            <Image alt="logo lunion-booking" height={25} width={25} src="/assets/images/logo.png" className="rounded-full" />
                            <p className="text-sm font-bold text-gray-500">
                                {restaurant?.restaurant?.nomEtablissement}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3" key={index} >
                            <Button size="sm" className="h-8 font-medium" onPress={() => ctrl.reglageDialogCloture.onOpen()}>
                                Réglages
                            </Button>
                            <Link href="/analytics">
                                <Button className="flex items-center gap-2 px-4 py-2 h-8 rounded-full text-white font-medium bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 transition">
                                    <PlusIcon className="h-4 w-4" />
                                    Tableau de bord
                                </Button>
                            </Link>
                            <Chip className="bg-green-200 text-green-700 text-sm" style={{ fontSize: 10 }}>
                                Actif
                            </Chip>
                        </div>
                    </div>
                ))
            }
            <CreerRestaurantModale onClose={ctrl.dialogClosture.onClose} isOpen={ctrl.dialogClosture.isOpen} />
            <ReglageContent onClose={ctrl.reglageDialogCloture.onClose} isOpen={ctrl.reglageDialogCloture.isOpen} restaurant={restaurant} />
        </div>

    )
}