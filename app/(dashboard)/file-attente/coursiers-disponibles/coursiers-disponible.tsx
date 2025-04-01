"use client"
import { NextUIModal } from "@/components/commons/next-ui-modal";
import { useCoursiersDisponibleController } from "./controller";
import { Button } from "@/components/ui/button";
import { Bike } from "lucide-react";
import { Textarea } from "@heroui/react";
import EmptyDataTable from "@/components/commons/EmptyDataTable";
import { FileAttenteLivreur } from "@/types/file-attente.model";
import { ConfirmDialog } from "@/components/commons/confirm-dialog";

interface CoursiersDiaponibleProps {
    data: FileAttenteLivreur[];
    searchKey?: string;
    timeProgressions: number;
    currentDelivery?: FileAttenteLivreur,
    restaurantId?: string;
}

export function CoursiersDiaponible({ data, searchKey, timeProgressions, currentDelivery, restaurantId }: CoursiersDiaponibleProps) {
    const ctrl = useCoursiersDisponibleController({ data, searchKey, restaurantId });
    return (
        <div className="max-h-[300px] lg:overflow-y-auto lg:overflow-x-hidden ">
            <div className="overflow-scroll max-w-[300px] md:max-w-[500px] lg:overflow-y-auto lg:overflow-x-hidden lg:max-w-full xl:max-w-full xl:overflow-y-auto">
                <table className=" divide-y divide-gray-200 w-full ">
                    <tbody className=" divide-y overflow-scroll">
                        {
                            !ctrl.filterData || ctrl.filterData.length === 0 ?
                                <div className="text-center py-6 text-primary font-bold mt-10 text-xl">
                                    <EmptyDataTable title='Aucun Resultat' />
                                </div>
                                :
                                <>
                                    {ctrl.filterData.map((item: FileAttenteLivreur, index: number) => (
                                        <tr key={item.id}
                                            className={`cursor-pointer cursor-not-allowed flex items-center`}>
                                            <td className=" py-4 min-w-[140px]">
                                                <div className="flex items-center rounded-lg  py-1 text-sm border p-1 border-gray-400">
                                                    Position : {item.position}
                                                </div>
                                            </td>
                                            <td className="min-w-[30%] relative items-center">
                                                <div className="flex items-center gap-2 text-sm font-bold relative z-10">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                                        <img
                                                            src={"/assets/images/photos/avatar-2.png"}
                                                            alt={"Avatar"}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex">{item.nomComplet}</div>
                                                </div>
                                                {
                                                    (currentDelivery && currentDelivery.id === item.id) &&
                                                    <div
                                                        className="absolute left-0 top-0 h-10 mt-3 bg-gradient-to-r from-orange-200 to-orange-400 rounded-lg z-0"
                                                        style={{ width: `${timeProgressions}%` }}
                                                    ></div>
                                                }

                                            </td>

                                            <td className=" py-4 whitespace-nowrap flex w-[150px] gap-2">
                                                {index === 0 && (
                                                    <>
                                                        Recupération <Bike color="red" size={20} className="font-bold" />
                                                    </>
                                                )
                                                }
                                                {
                                                    index === 1 && (
                                                        <>
                                                            Se prépare <Bike color="red" size={20} className="font-bold" />
                                                        </>
                                                    )
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {/* <Button variant={"success"} className="h-7 text-md" onClick={() => ctrl.retirerLivreurs(item.id)} disabled={item.estRetirerDeLaFileAttente}>Ecrire au turboy</Button>&nbsp;&nbsp; */}
                                                {/* <Button variant={"success"} className="h-7 text-md" onClick={ctrl.handleTurboyOpen} disabled={item.estRetirerDeLaFileAttente}>Ecrire au turboy</Button>&nbsp;&nbsp;
                                                <Button variant={"success"} className="h-7" onClick={ctrl.handleTurboOpen} disabled={item.estRetirerDeLaFileAttente}>Ecrire à un turbo</Button>&nbsp;&nbsp;
                                                <Button variant={"primary"} className="h-7" onClick={ctrl.handleErrorOpen} disabled={item.estRetirerDeLaFileAttente}>Signaler une erreur</Button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                        }

                    </tbody>
                </table>
            </div>
            <NextUIModal onClose={ctrl.turboyDisclosure.onClose} isOpen={ctrl.turboyDisclosure.isOpen} children={<div>
                <Textarea type="text" placeholder="Ecrire au turboys" className="border-2 rounded-lg" />
            </div>} title="Ecrire au turboys" />

            <NextUIModal onClose={ctrl.turboDisclosure.onClose} isOpen={ctrl.turboDisclosure.isOpen} children={<div>
                <Textarea type="text" placeholder="Ecrire a un turbo" className="border-2 rounded-lg" />
            </div>} title="Ecrire à un turb" />

            <NextUIModal onClose={ctrl.errorDisclosure.onClose} isOpen={ctrl.errorDisclosure.isOpen} children={<div>
                <Textarea type="text" placeholder="Signaler une erreur" className="border-2 rounded-lg" />
            </div>} title="Signaler une erreur" />
            <div className="flex flex-wrap gap-3">
            </div>
            <ConfirmDialog {...ctrl.confirm} />
        </div>
    )
}