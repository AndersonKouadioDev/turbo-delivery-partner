
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { reportingBonLivraisonTerminers } from "@/src/actions/tickets.actions";
import { TypeReportingSchema, reportingSchema } from "@/src/schemas/reporting.schema";
import { TypeCommission, FormatsSupportes } from "@/types";
import { saveAsPDFFile, saveAsExcelFile } from "@/utils/reporting-file";


export function useReportingController(restaurantId?: string) {
    const initialiValues: TypeReportingSchema = {
        restaurantId: "",
        debut: "",
        fin: "",
        type: "",
        format: ""
    };
    const form = useForm<TypeReportingSchema>({
        resolver: zodResolver(reportingSchema),
        defaultValues: Object.assign({}, initialiValues),
    });

    const onPreview = async () => {
        await form.trigger();
        const data: TypeReportingSchema = form.getValues();
        try {
            const result = await reportingBonLivraisonTerminers({
                restaurantId: restaurantId ?? "",
                debut: data.debut ?? "",
                fin: data.fin ?? "",
                type: data.type as TypeCommission,
                format: data.format as FormatsSupportes
            });
            if (result) {
                const file = new Blob([result], {
                    type: "application/pdf",
                });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL, "_blank");
            }
        } catch (error: any) {
            if (error.response && error.response?.data) {
                toast.error(error.response?.data?.detail)
            } else if (error.response && error.response?.message) {
                toast.error(error.response?.message)
            } else {
                toast.error("Une erreur s'est produite")
            }
        }
    };

    const onexportFile = async () => {
        await form.trigger();
        const data: TypeReportingSchema = form.getValues()
        try {
            const result = await reportingBonLivraisonTerminers({
                restaurantId: data.restaurantId,
                debut: data.debut ?? "",
                fin: data.fin ?? "",
                type: data.type as TypeCommission,
                format: data.format as FormatsSupportes
            });
            if (data?.type === "PDF" && result != null) {
                try {
                    saveAsPDFFile(result, "bon-de-livraison-termine");
                } catch (e) {
                    console.log("Erreur lors de l'exportation du fichier pdf");
                }
            }
            if (data?.type === "EXCEL" && result != null) {
                try {
                    saveAsExcelFile(result, "bon-de-livraison-termine");
                } catch (e) {
                    console.log("Erreur lors de l'exportation du fichier pdf");
                }
            }
        } catch (error: any) {
            if (error.response && error.response?.data) {
                toast.error(error.response?.data?.detail)
            } else if (error.response && error.response?.message) {
                toast.error(error.response?.message)
            } else {
                toast.error("Une erreur s'est produite")
            }
        }
    };



    return {
        onexportFile,
        onPreview,
        form
    }
}
