
import useConfirm from "@/components/commons/use-confirm-dialog";
import { fetchFilleAttente } from "@/src/actions/file-attente.actions";
import { retirerLivreur } from "@/src/actions/restaurant.actions";
import { FileAttenteLivreur } from "@/types/file-attente.model";
import { useDisclosure } from "@heroui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
    data: FileAttenteLivreur[];
    searchKey?: string;
    restaurantId?: string
}

export function useCoursiersDisponibleController({ searchKey, data, restaurantId }: Props) {
    const turboyDisclosure = useDisclosure();
    const turboDisclosure = useDisclosure();
    const errorDisclosure = useDisclosure();
    const [selectValue, setSelectValue] = useState("");
    const [filterData, setFilterData] = useState<any[]>(data);
    const confirm = useConfirm()

    useEffect(() => {
        if (searchKey) {
            const filteredData = data.filter((user) =>
                user?.nomComplet?.toLowerCase().includes(searchKey?.toLowerCase())
            );
            setFilterData(filteredData);
        } else {
            setFilterData(data);
        }
    }, [searchKey, data]);

    const handleTurboyOpen = () => {
        turboyDisclosure.onOpen();
    };

    const handleTurboOpen = () => {
        turboDisclosure.onOpen();
    };

    const handleErrorOpen = () => {
        errorDisclosure.onOpen();
    };

    const fetchFileAttenteLivreur = async () => {
        try {
            const data = await fetchFilleAttente(restaurantId ?? '');
            setFilterData(data);
        } catch (error) { }
    }


    const retirerLivreurs = async (livreruId: string) => {
        const confirmAndSend = async () => {
            try {
                const data = await retirerLivreur(livreruId);
                if (data && data.status === "success") {
                    toast.success(data.message);
                    await fetchFileAttenteLivreur()
                } else {
                    toast.error("Une erreur s'est produite !");
                }
            } catch (error: any) {
                toast.error(error.message || "Une erreur s'est produite")
            }
        }
        confirm.openConfirmDialog(confirmAndSend);
    }
    return {
        filterData,
        selectValue,
        setSelectValue,
        handleTurboyOpen,
        turboyDisclosure,
        turboDisclosure,
        handleTurboOpen,
        handleErrorOpen,
        errorDisclosure,
        retirerLivreurs,
        confirm


    }
}