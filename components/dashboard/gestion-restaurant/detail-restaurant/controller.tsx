import { useDisclosure } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as yup from "yup";

interface InputField {
    nomRestaurant?: string;
    email?: string;
    pays?: string;
    devise?: string;
    numeroRestaurant?: string;
    adresse?: string;
}

const schema = yup.object({

})

export function useDetailRestaurantController() {
    const listPayes = [
        {
            nom: "Mali",
            url: "/assets/images/mali.png"
        },
        {
            nom: "Côte d'Ivoire",
            url: "/assets/images/ci.png"
        },
        {
            nom: "Etats unis",
            url: "/assets/images/etat-units.png"
        },
        {
            nom: "France",
            url: "/assets/images/france.png"
        }
    ];

    const [open, setOpen] = useState(false);
    const [openSupprimerPropriete, setOpenSupprimerPropriete] = useState(false);
    const [selectPays, setSelectedPays] = useState<any>("")
    const initialValues: InputField = Object.assign({}, {
        nomRestaurant: "",
        email: "",
        pays: "ci",
        devise: "xof",
        numeroRestaurant: "",
        adresse: "",
    })
    const form: UseFormReturn<InputField, any> = useForm<InputField>({
        values: initialValues,
        resolver: yupResolver(schema)
    });

    return {
        listPayes,
        form,
        open,
        setOpen,
        openSupprimerPropriete,
        setOpenSupprimerPropriete,
        selectPays,
        setSelectedPays
    }
}