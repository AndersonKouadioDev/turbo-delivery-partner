import { useDisclosure } from "@heroui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

interface InputField {
    nomRestaurant: string;
    numero: string;
    pays: string;
    devise: string;
    adresseRestaurant: string;
    dateOuverteure: string;
}

const schema = yup.object({
    nomRestaurant: yup.string().required("Ce champ est requis !"),
    numero: yup.string().required("Ce champ est requis !"),
    pays: yup.string().required("Ce champ est requis"),
    devise: yup.string().required("Ce champ est requis !"),
    adresseRestaurant: yup.string().required("Ce champ est requis !"),
    dateOuverteure: yup.string().required("Ce champ est requis !")
})
export function useCreerRestaurantController() {
    const [selectCountry, setSelectedCountry] = useState<any>("")
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

    const dialogClosture = useDisclosure();

    const initialValues: InputField = Object.assign({}, {
        nomRestaurant: "",
        numero: "",
        pays: "",
        devise: "",
        adresseRestaurant: "",
        dateOuverteure: "",
    });

    const form = useForm<InputField>({
        values: initialValues,
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: InputField) => {
        console.log(data)
    }

    return {
        dialogClosture,
        form,
        onSubmit,
        listPayes,
        setSelectedCountry,
        selectCountry

    }
}