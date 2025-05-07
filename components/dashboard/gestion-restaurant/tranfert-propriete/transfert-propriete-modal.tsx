"use client"

import Image from "next/image";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TransfertProprieteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export function TransfertProprieteModal({ isOpen, onClose }: TransfertProprieteModalProps) {
    return (
        <div className="">
            <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <SheetTrigger asChild>
                    <></>
                </SheetTrigger>
                <SheetContent side={"bottom"} className="w-[80%] left-1/2 -translate-x-1/2">
                    <SheetHeader className="card border-gray-300">
                        <SheetTitle className="text-center text-primary font-bold mb-10 text-2xl">Transférer la propriété</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">
                        <div className="flex items-center justify-around">
                            <div className="">
                                <Image src="/assets/images/confirm-transfert.png" width={200} height={200} alt="CI" />
                            </div>
                            <div className="">
                                <label className="text-primary/50">Selectionnée un nouveau super adaministrateur</label>
                                <Select>
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="Sélectionnez une propriété" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"td"} >test</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="mt-5">
                                    <p className="text-primary/80 mb-5">Cele transferera toutes vos autorisations au niveau super administrateur</p>
                                    <ul>
                                        <li className="text-gray-500 font-bold flex gap-2"><Dot /> Chaque entreprise ne peut avoir qu'un seul super adaministrateur à la fois</li>
                                        <li className="text-gray-500 font-bold flex gap-2"><Dot />Une fois que vous transférez la propriété à un nouveau propriétaire, votre rôle sera modifié en administrateur</li>
                                        <li className="text-gray-500 font-bold flex gap-2"><Dot />Le nouveau super administrateur peut vous retirez du restaurant ou supprimer le restaurant</li>
                                        <li className="text-gray-500 font-bold flex gap-2"><Dot />Vous ne pouvez pas transferer la propriété a un membre du personnel qui ne travail pas dans votre restaurant</li>
                                    </ul>
                                    <div className="flex gap-2 mt-20 items-center ">
                                        <Checkbox /><span className="font-bold text-primary/80"> J'ai lu et compris la description ci-dessus et j'accepte de transferer la propriété a un autre membre du personnel</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="flex justify-center mt-10 mb-10">
                        <div className="flex gap-2">
                            <Button className="h-8 bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 transition" onClick={onClose}>Confirmez le transfert</Button>
                            <Button variant={"hover"} className="h-8 bg-gray-500 text-white hover:opacity-90 transition" onClick={onClose}>Annuler</Button>
                        </div>

                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
