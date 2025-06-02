import { Button, Calendar, DatePicker, Modal, ModalBody, ModalContent } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useReportingController } from "./controller";
import { SelectField } from "../commons/form/select-field";


interface Props {
    isOpen?: boolean;
    onClose: () => void;
    restaurantId?: string;
}
export function TicketTermineReportingDialog({ isOpen, onClose, restaurantId }: Props) {
    const ctrl = useReportingController(restaurantId)
    return (
        <Modal isOpen={isOpen} size={"md"} onClose={onClose} >
            <ModalContent>
                <ModalBody className="p-5">
                    <div className="text-center text-primary">Imprimer les bon bons de livraison</div>
                    <div className="grid grid-cols-1 gap-4">
                        <Controller name="debut" control={ctrl.form.control}
                            render={({ field }) =>
                                <DatePicker className="w-full" label="Date de debut" onChange={(value: any) => {
                                    if (value?.year && value?.month && value?.day) {
                                        const nativeDate = new Date(value.year, value?.month - 1, value.day);
                                        field.onChange(nativeDate?.toISOString().slice(0, 10))
                                    } else {
                                        field.onChange(value?.toString());
                                    }
                                }} />}
                        />
                        <Controller name="fin" control={ctrl.form.control}
                            render={({ field }) =>
                                <DatePicker className="w-full" label="Date de fin" onChange={(value: any) => {
                                    if (value?.year && value?.month && value?.day) {
                                        const nativeDate = new Date(value.year, value?.month - 1, value.day);
                                        field.onChange(nativeDate?.toISOString().slice(0, 10))
                                    } else {
                                        field.onChange(value?.toString());
                                    }
                                }} />}
                        />
                        <Controller name="type" control={ctrl.form.control}
                            render={({ field }) =>
                                <div className="w-full ">
                                    <div className="mb-2">Selectionnez un type</div>
                                    <SelectField label="id"
                                        options={[
                                            { label: "Pourcentage", id: "POURCENTAGE" },
                                            { label: "Fixe", id: "FIXE" }
                                        ]} setSelectValue={field.onChange} selectValue={field.value} />
                                </div>
                            } />
                        <Controller name="format" control={ctrl.form.control}
                            render={({ field }) =>
                                <div className="w-full ">
                                    <div className="mb-2">Selectionnez un format</div>
                                    <SelectField label="id"
                                        options={[
                                            { label: "PDF", id: "PDF" },
                                            { label: "EXCEL", id: "EXCEL" }
                                        ]} setSelectValue={field.onChange} selectValue={field.value} />
                                </div>
                            } />
                    </div>
                    <div className="flex justify-end">
                        <div className="flex gap-2">
                            <Button onPress={ctrl.onPreview} className="h-10  text-md">Previsuliser</Button>
                            <Button onPress={ctrl.onexportFile} className="h-10 bg-primary text-white font-bold text-md">Exporter</Button>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}