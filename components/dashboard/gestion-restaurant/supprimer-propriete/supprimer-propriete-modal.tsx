'use client'
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface TransfertProprieteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export function SupprimerProprieteModal({ isOpen, onClose }: TransfertProprieteModalProps) {
    return (
        <div className="">
            <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <SheetTrigger asChild>
                    <></>
                </SheetTrigger>
                <SheetContent side={"bottom"} className="w-[80%] left-1/2 -translate-x-1/2">
                    <SheetHeader className="card border-gray-300">
                        <SheetTitle className="text-center text-primary font-bold mb-10 text-2xl">Supprimer le compte</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">
                        <div className="flex items-center justify-around">
                            <div className="">
                                <Image src="/assets/images/supprimer-compte.png" width={200} height={200} alt="CI" />
                            </div>
                            <div className="mt-5 p-8 text-primary bg-primary/10 text-center rounded-lg">
                                Êtes-vous sûr de vouloir suppimer votre restaurant ? Après il sera définitivement supprimer dans 7 jours
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-10 mb-10">
                        <div className="flex gap-2">
                            <Button className="h-8 bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 transition" onClick={onClose}>Oui je confirme</Button>
                            <Button variant={"hover"} className="h-8 bg-gray-500 text-white hover:opacity-90 transition" onClick={onClose}>Annuler</Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
