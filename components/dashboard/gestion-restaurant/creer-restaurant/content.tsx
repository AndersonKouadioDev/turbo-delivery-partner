"use client"
import { FormItem, FormLabel, FormControl, FormMessage, FormField, Form } from "@/components/ui/form";
import { useCreerRestaurantController } from "./controller";
import { Button, DatePicker, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@heroui/react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    onClose: () => void;
    isOpen: boolean;
}
export function CreerRestaurantModale({ onClose, isOpen }: Props) {
    const ctrl = useCreerRestaurantController();

    return (
        <div>
            <Modal isOpen={isOpen} size={"2xl"} onOpenChange={(open) => !open && onClose()}>
                <ModalContent >
                    <div >
                        <ModalHeader className="flex flex-col gap-1 text-primary text-center font-bold text-2xl">{"Créer un nouveau restaurant"}</ModalHeader>
                        <ModalBody>
                            <Form {...ctrl.form}>
                                <div className="grid grid-cols-1">
                                    <FormField
                                        control={ctrl.form.control}
                                        name={`nomRestaurant`}
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-sm mt-2 text-primary/80">Le nom du restaurant <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="h-10  rounded-lg" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="">
                                        <Label className="text-sm mt-2 text-primary/80">Numero du restaurant <span className="text-red-500">*</span></Label>
                                        <div className="flex items-center border  rounded-md overflow-hidden bg-white w-full">
                                            <span className="bg-gray-100 px-3 py-2 text-sm flex items-center gap-1 h-full">
                                                <Image src="/assets/images/ci.png" width={20} height={20} alt="CI" />+225
                                            </span>
                                            <FormField
                                                control={ctrl.form.control}
                                                name={`numero`}
                                                render={({ field }) => (
                                                    <FormControl>
                                                        <Input {...field} type="tel"
                                                            placeholder="00 00 00 00 00"
                                                            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-10 w-full"
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={ctrl.form.control}
                                            name={`numero`}
                                            render={({ field }) => (
                                                <FormItem className="mt-1">
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-2  gap-4 items-center">
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
                                                        selectedKeys={ctrl.selectCountry ? [ctrl.selectCountry] : []}
                                                        onSelectionChange={(keys) => {
                                                            const selected = Array.from(keys)[0];
                                                            ctrl.setSelectedCountry(selected as string);
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
                                                            <SelectItem key={item.nom} textValue={item.nom} >
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
                                    <FormField
                                        control={ctrl.form.control}
                                        name={`devise`}
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-sm mt-4 text-primary/80">Devise <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="h-10"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <FormField
                                        control={ctrl.form.control}
                                        name={`devise`}
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-md mt-4 text-primary/80">Adresse du restaurant <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="h-10"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={ctrl.form.control}
                                        name={`devise`}
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-sm mt-4 text-primary/80">Date d'ouverture <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <DatePicker className="h-10"
                                                        classNames={{
                                                            input: "pl-2 text-base text-gray-800 placeholder:text-gray-400",
                                                            inputWrapper: "shadow-none border-none bg-transparent"
                                                        }} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <div className="flex justify-center mb-10 gap-4 mt-10 ml-5">
                                <Button color="danger" onPress={() => ctrl.form.handleSubmit(ctrl.onSubmit)} size="md"
                                    className="w-48 bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 transition">
                                    {"Confirmez le transfert"}
                                </Button>
                                <Button className="bg-gray-500 text-white w-48" onPress={onClose} size="md">
                                    Annuler
                                </Button>
                            </div>
                        </ModalFooter>
                    </div>
                </ModalContent>
            </Modal>
        </div>
    )
}