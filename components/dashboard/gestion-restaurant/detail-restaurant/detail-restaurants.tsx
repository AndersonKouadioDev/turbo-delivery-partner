"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useDetailRestaurantController } from "./controller";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { form } from "@heroui/theme";
import { Trash2, User } from "lucide-react";
import { TransfertProprieteModal } from "../tranfert-propriete/transfert-propriete-modal";
import { SupprimerProprieteModal } from "../supprimer-propriete/supprimer-propriete-modal";
import { Select, SelectItem } from "@heroui/select";


export default function DetailRestaurants() {
    const ctrl = useDetailRestaurantController()

    return (
        <div className=" p-5">
            <div className="">
                <h3 className="text-md font-semibold text-gray-500 mb-5">Détails de base du restaurant</h3>
                <div className="flex items-center space-x-4 mb-4 gap-2">
                    <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                        <Image src="/assets/images/reglage-avatar.png" alt="Profil" width={100} height={100} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-500">Photo de profil</span>
                        <span className="text-sm text-gray-500">Téléchargez une nouvelle image pour modifier le profil de votre restaurant</span>
                        <div className="">
                            <Button color="danger" className="h-8 bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 transition">
                                {"Imprtez"}
                            </Button>
                        </div>
                    </div>

                </div>

                <Form {...ctrl.form}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-6 mt-5">
                        <div>
                            <FormField
                                control={ctrl.form.control}
                                name={`nomRestaurant`}
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-sm mt-2 text-primary/80">Le nom du restaurant <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} className="h-10  rounded-lg"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={ctrl.form.control}
                                name={`email`}
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-sm mt-2 text-primary/80">E-mail <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} className="h-10  rounded-lg"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 items-center gap-4">
                        <div>
                            <FormField
                                control={ctrl.form.control}
                                name={`pays`}
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-sm mt-2 text-primary/80">Pays <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                className="max-w-xs"
                                                aria-label="Pays"
                                                selectedKeys={ctrl.selectPays ? [ctrl.selectPays] : []}
                                                onSelectionChange={(keys) => {
                                                    const selected = Array.from(keys)[0];
                                                    ctrl.setSelectedPays(selected as string);
                                                }}
                                                renderValue={(items) => {
                                                    const selectedItem = items[0];
                                                    const pays = ctrl.listPayes.find((p) => p.nom === selectedItem?.key);
                                                    if (!pays) return null;
                                                    return (
                                                        <span className="flex items-center gap-2">
                                                            <img src={pays.url} alt="flag" width={20} height={20} />
                                                            <span>{pays.nom}</span>
                                                        </span>
                                                    );
                                                }}
                                            >
                                                {ctrl.listPayes.map((item: any) => (
                                                    <SelectItem
                                                        key={item.nom}
                                                        textValue={item.nom}
                                                    >
                                                        <span className="flex gap-2 items-center">
                                                            <Image src={item.url} width={20} height={20} alt="" />
                                                            <span className="text-sm">{item.nom}</span>
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={ctrl.form.control}
                                name={`devise`}
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-sm mt-2 text-primary/80">Devise  <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} className="h-10  rounded-lg"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <div className="">
                                <Label className="text-sm mt-2 text-primary/80">Numero du restaurant <span className="text-red-500">*</span></Label>
                                <div className="flex items-center border  rounded-md overflow-hidden bg-white w-full">
                                    <span className="bg-gray-100 px-3 py-2 text-sm flex items-center gap-1 h-full">
                                        <Image src="/assets/images/ci.png" width={20} height={20} alt="CI" />+225
                                    </span>
                                    <FormField
                                        control={ctrl.form.control}
                                        name={`numeroRestaurant`}
                                        render={({ field }) => (
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="tel"
                                                    placeholder="00 00 00 00 00"
                                                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-10 w-full"
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={ctrl.form.control}
                                    name={`numeroRestaurant`}
                                    render={({ field }) => (
                                        <FormItem className="mt-1">
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={ctrl.form.control}
                            name={`adresse`}
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm mt-2 text-primary/80">Adresse  <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} className="h-10  rounded-lg"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </Form>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 gap-4 mt-5 items-center">
                <div className="">
                    <span className="font-bold tex-gray-500 mb-2">Zone dangereuse</span>
                    <div className="card border border-gray-300 rounded-lg p-4 cursor-pointer" onClick={() => ctrl.setOpen(true)}>
                        <div className="flex gap-4 items-center">
                            <User size={30} className="mr-2" />
                            <div className="flex flex-col">
                                <span className="text-sm">Transfert de propriété</span>
                                <span className="text-sm">Selectionnée un nouveau super administrator</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border border-red-400 rounded-lg p-4 mt-5 cursor-pointer" onClick={() => ctrl.setOpenSupprimerPropriete(true)} >
                    <div className="flex gap-4 items-center">
                        <Trash2 size={30} className="mr-2" color="red" />
                        <div className="flex flex-col">
                            <span className="text-sm text-red-500 font-medium">Supprimez le compte</span>
                            <span className="text-sm text-red-500 font-medium">Le restaurant sera supprimé</span>
                        </div>
                    </div>
                </div>
            </div>
            <TransfertProprieteModal isOpen={ctrl.open} onClose={() => ctrl.setOpen(false)} onOpen={() => ctrl.setOpen(true)} />
            <SupprimerProprieteModal isOpen={ctrl.openSupprimerPropriete} onClose={() => ctrl.setOpenSupprimerPropriete(false)} onOpen={() => ctrl.setOpenSupprimerPropriete(true)} />
        </div>
    );
}
