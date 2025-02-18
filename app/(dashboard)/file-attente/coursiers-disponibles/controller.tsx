
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Props {
    data: any[];
    searchKey?: string
}

export function useCoursiersDisponibleController({ searchKey, data }: Props) {
    const turboyDisclosure = useDisclosure();
    const turboDisclosure = useDisclosure();
    const errorDisclosure = useDisclosure();
    const [selectValue, setSelectValue] = useState("");
    const [filterData, setFilterData] = useState<any[]>([]);

    useEffect(() => {
        if (searchKey) {
            const filteredData = data.filter((user) =>
                user?.nomPrenom?.toLowerCase().includes(searchKey?.toLowerCase())
            );
            setFilterData(filteredData);
        } else {
            setFilterData(data);
        }
    }, [searchKey]);

    const handleTurboyOpen = () => {
        turboyDisclosure.onOpen();
    };

    const handleTurboOpen = () => {
        turboDisclosure.onOpen();
    };

    const handleErrorOpen = () => {
        errorDisclosure.onOpen();
    };
    return {
        filterData,
        selectValue,
        setSelectValue,
        handleTurboyOpen,
        turboyDisclosure,
        turboDisclosure,
        handleTurboOpen,
        handleErrorOpen,
        errorDisclosure

    }
}