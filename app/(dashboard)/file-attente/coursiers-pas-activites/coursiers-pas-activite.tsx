'use client'
import EmptyDataTable from "@/components/commons/EmptyDataTable";
import { useCoursiersPasActiviteController } from "./controller"
import { FileAttenteLivreur } from "@/types/file-attente.model";

interface CoursisersPasActiviteProps {
    data: FileAttenteLivreur[];
    searchKey?: string
}
export function CoursisersPasActivite({ data, searchKey }: CoursisersPasActiviteProps) {
    const ctrl = useCoursiersPasActiviteController({ data, searchKey })
    return (
        <div className="max-h-[600px] lg:overflow-y-auto lg:overflow-x-hidden md:overflow-scoll overflow-scroll">
            <table className=" divide-y divide-gray-200 w-full card border-1 shadown-md ">
                <tbody className=" divide-y ">
                    {
                        !ctrl.filterData || ctrl.filterData.length === 0 ? (
                            <div className="text-center py-6 text-primary font-bold mt-10 text-xl">
                                <EmptyDataTable title='Aucun Resultat' />
                            </div>
                        ) :
                            <>
                                {ctrl.filterData.map((item) => (
                                    <tr key={item.id}
                                        className={`flex justify-between`}>
                                        <td className="flex items-center gap-10 min-w-[50%]">
                                            <div className="rounded-lg px-3 py-1 text-sm border p-1 border-gray-400 m-1">
                                                Position : {item.position}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-bold">
                                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                                    <img
                                                        src={"/assets/images/photos/avatar-2.png"}
                                                        alt={"Avatar"}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>{item.nomComplet}</div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>
                    }
                </tbody>
            </table>
        </div>
    )
}