
import { useEffect, useState } from "react";

interface Props {
    data: any[];
    searchKey?: string
}


export function useCoursiersPasActiviteController({ searchKey, data }: Props) {
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

    return {
        filterData

    }
}