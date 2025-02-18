'use client'
import { useCoursiersPasActiviteController } from "./controller"

interface CoursisersPasActiviteProps {
    data: any[];
    searchKey?: string
}
export function CoursisersPasActivite({ data, searchKey }: CoursisersPasActiviteProps) {
    const ctrl = useCoursiersPasActiviteController({ data, searchKey })
    return (
        <div className="max-h-[600px] lg:overflow-y-auto lg:overflow-x-hidden md:overflow-scoll overflow-scroll">
            {(ctrl.filterData && ctrl.filterData.length > 0) &&
                ctrl.filterData.map((item: any) => (
                    <div key={item.id} className="grid grid-cols-1 items-center gap-4 pt-3 border-b cursor-pointer flex-1">
                        <div className="flex gap-4 p-2 rounded-lg">
                            <span className="py-1 rounded-lg text-center text-sm border-2 pl-2 pr-2 ">
                                Position : {item.position}
                            </span>
                            <div className="flex  items-center gap-4 justify-start">
                                <div className="w-8 h-8 bg-gray-300 rounded-full">
                                    <img src={'/assets/images/photos/avatar-2.png'} alt={''} />
                                </div>
                                <span className="font-semibold">{item.nomPrenom}</span>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}