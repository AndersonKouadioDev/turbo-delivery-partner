
"use client"

import { CardHeader } from "@/components/commons/card-header"
import { PageWrapper } from "@/components/commons/page-wrapper"
import { Card } from "@/components/ui/card"
import { NotificationDetailsVM } from "@/types/notifcation.model"
import { MoveLeft } from "lucide-react"
import moment from "moment"
import Link from "next/link"


interface DetailNotificationProps {
    detailNotification: NotificationDetailsVM
}
export function DetailNotification({ detailNotification }: DetailNotificationProps) {
    return (
        <PageWrapper>
            <CardHeader title="Detail des notifications" />
            <div className="flex-wrap lg:flex xl:flex gap-2  justify-between">
                <div className="h1 text-md lg:text-2xl xl:text-2xl font-bold flex lg:flex xl:flex gap-2 ">
                    <div>Objet : </div><div className="text-gray-500">{detailNotification.titre}</div>
                </div>
                <Link href="/">
                    <div className="flex justify-end">
                        <span className="flex items-center gap-2 mr-4 text-blue-500"><MoveLeft className="cursor-pointer" />Retour</span>
                    </div>
                </Link>
            </div>
            <Card className="w-full p-4">
                <p className="text-md">{detailNotification.message}</p>
                <div className="flex justify-end mt-5 p-4">
                    <i className="font-bold">{moment(detailNotification.createdAt).format("DD/MM/YYYY HH:mm:ss")}</i>
                </div>
            </Card>
        </PageWrapper>
    )
}