import { fetchDetailNotifcation, updateNotifcation } from "@/src/actions/notifcation.action";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { NotificationDetailsVM } from "@/types/notifcation.model";


export function useDetailNotificationController(id: string) {
    const {data} = useSession();
    const [notifcationDetail, setNotificationDetail] = useState<NotificationDetailsVM>({})
    const getDetailNBotification = async () => {
        try {
            const result = await fetchDetailNotifcation(id as any ?? "");
            if(result){
                setNotificationDetail(result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getDetailNBotification();
        lireNotification()
    },[id]);

    const lireNotification = async() =>{
        try {
            await updateNotifcation({
                utilisateurId: data ? data.user?.id : "",
                notificationId: id
            })
        } catch (error) {}
    }

    return {
       notifcationDetail
    }
}