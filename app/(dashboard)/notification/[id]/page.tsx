
"use client"
import { useDetailNotificationController } from "./controller";
import { Suspense } from "react";
import Loading from "@/components/layouts/loading";
import { DetailNotification } from "./content";
import { useParams } from "next/navigation";

export default async function Page(){
    const params = useParams();
    const ctrl = await useDetailNotificationController(params.id as any)
    return(
        <Suspense fallback={<Loading />}>
            <DetailNotification detailNotification={ctrl.notifcationDetail} />
        </Suspense>
    )
}