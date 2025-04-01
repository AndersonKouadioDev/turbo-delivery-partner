import { Tab, Tabs } from "@heroui/react"
import { CoursiersDiaponible } from "../coursiers-disponibles/coursiers-disponible"
import { CoursisersPasActivite } from "../coursiers-pas-activites/coursiers-pas-activite"
import { FileAttenteLivreur } from "@/types/file-attente.model";

interface Props {
    data: FileAttenteLivreur[];
    searchKey?: string;
    timeProgressions: number;
    currentDelivery?: FileAttenteLivreur;
    restaurantId?: string;
    livreurIndisponibles: FileAttenteLivreur[]
}
export function FileAttenteTab({ data, searchKey, timeProgressions, currentDelivery, restaurantId, livreurIndisponibles }: Props) {
    const items = [
        { title: "Disponible maintenant", kay: "disponible" },
        { title: "Pas en activité", kay: "indisponible" }
    ]
    return (
        <div className="mt-4">
            <Tabs items={items || []} className="w-full">
                {(item) => (
                    <Tab key={item.kay} title={<span className="m-0 p-0 lg:ml-10 lg:pl-5 lg:pr-5 xl:ml-10 xl:pl-5 xl:pr-5">{item.title}</span>}>
                        {
                            item.kay === "disponible" ?
                                <CoursiersDiaponible data={data} searchKey={searchKey} timeProgressions={timeProgressions} currentDelivery={currentDelivery} restaurantId={restaurantId} />
                                :
                                <CoursisersPasActivite data={livreurIndisponibles} searchKey={searchKey} />
                        }
                    </Tab>
                )}
            </Tabs>
        </div>
    )
}