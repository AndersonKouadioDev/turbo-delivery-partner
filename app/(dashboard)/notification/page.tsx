"use client"
import { Suspense } from "react";
import { useNotificationController } from "./controller"
import { NotificationContent } from "./content";
import Loading from "@/app/loading";

export default async function Page(){
    const ctrl = await useNotificationController();
    return(
        <Suspense fallback={<Loading />}>
            <NotificationContent notifications={ctrl.notifications}/>
        </Suspense>
    )
}