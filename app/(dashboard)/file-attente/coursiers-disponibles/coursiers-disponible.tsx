"use client"
import { NextUIModal } from "@/components/commons/next-ui-modal";
import { useCoursiersDisponibleController } from "./controller";
import { Button } from "@/components/ui/button";
import { Bike } from "lucide-react";
import { Textarea } from "@nextui-org/react";
import CustomProgressBar from "@/components/commons/custom-progress-bar";

interface CoursiersDiaponibleProps {
    data: any[];
    searchKey?: string;
    setRowData?: (rowData: string) => void;
    rowData?: any
}

export function CoursiersDiaponible({ data, searchKey, setRowData, rowData }: CoursiersDiaponibleProps) {
    const ctrl = useCoursiersDisponibleController({ data, searchKey });
    return (
        <div className="max-h-[600px] lg:overflow-y-auto lg:overflow-x-hidden md:overflow-scoll overflow-scroll ">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className=" divide-y ">
                        {ctrl.filterData.map((item) => (
                            <tr key={item.id} onClick={() => setRowData && setRowData(item)}
                                className={`cursor-pointer ${!item.estRetirerDeLaFileAttente ? '' : 'opacity-50 bg-gray-100 cursor-not-allowed'}`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <CustomProgressBar position={item.position} nomPrenom={item.nomPrenom} progress={item.progression || 0} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.status === "RECUPERATION" ? (
                                        <span className="px-2 inline-flex text-xs items-center flex gap-4">
                                            Recupération <Bike color="red" size={20} className="font-bold" />
                                        </span>
                                    ) : item.status === "SE_PREPARE" ? (
                                        <span className="px-2 inline-flex text-xs flex items-center gap-4 ">
                                            Se prépare <Bike color="red" size={20} className="font-bold" />
                                        </span>
                                    ) : ""}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Button variant={"success"} className="h-8" onClick={ctrl.handleTurboyOpen} disabled={item.estRetirerDeLaFileAttente}>Ecrire au turboy</Button>&nbsp;&nbsp;
                                    <Button variant={"success"} className="h-8" onClick={ctrl.handleTurboOpen} disabled={item.estRetirerDeLaFileAttente}>Ecrire à un turbo</Button>&nbsp;&nbsp;
                                    <Button variant={"primary"} className="h-8" onClick={ctrl.handleErrorOpen} disabled={item.estRetirerDeLaFileAttente}>Signaler une erreur</Button>
                                </td>
                            </tr>
                        ))}
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
        </div>
    )
}