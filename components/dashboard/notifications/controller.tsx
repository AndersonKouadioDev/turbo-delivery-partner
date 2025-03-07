

import { socket } from "@/socket";
import { fetchAllNotifcation, fetchNotifcationNonLu, updateNotifcation } from "@/src/actions/notifcation.action";
import { NotificationVM } from "@/types/notifcation.model";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useNotificationController() {
    const session = useSession();
    const utilisateurId = session.data?.user?.id;
    const [notifications, setNotifications] = useState<NotificationVM[]>([]);
    const [notificationNonLus, setNotificationNonLus] = useState<NotificationVM[]>([]);
    const [realTimeData, setRealTimeData] = useState<any>({});
    const [toutNotifications, setToutNotifications] = useState<NotificationVM[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [voirMoins, setVoirMoins] = useState(false);
  
    useEffect(() => {
        const setNotification = (data: any) => {
            const jsonData = data && JSON.parse(data) as NotificationVM;
            setRealTimeData(jsonData)
        }
        socket.on('connect', ()=> setIsConnected(true))
        socket.on('disconnect', ()=> setIsConnected(false))
        socket.on(`/notification/restaurant/${utilisateurId}`, setNotification);
        return () => {
            socket.off(`/notification/restaurant/${utilisateurId}`, setNotification);
            socket.off('connect', ()=> setIsConnected(true))
            socket.off('disconnect', ()=> setIsConnected(false))
        };
    }, [utilisateurId]);


    const fetchAllNotifications = async () => {
        try {
            const result = await fetchAllNotifcation(utilisateurId ?? "")
            setToutNotifications(result);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchAllNotificationNonLus = async () => {
        try {
            const result = await fetchNotifcationNonLu(utilisateurId ?? "")
            setNotificationNonLus(result);
            setNotifications(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setNotificationNonLus([...notificationNonLus, realTimeData])
    }, [realTimeData])

    useEffect(() => {
        fetchAllNotificationNonLus();
        fetchAllNotifications();
    }, []);

    const voirTout = () => {
        if (toutNotifications.length > 0) {
            if(voirMoins){
                setVoirMoins(false)
                setNotifications(notificationNonLus)
            }else{
                setNotifications(toutNotifications);
                setVoirMoins(true)
            }
           
        }
    }

    const toutMarqueCommeLus = async () => {
        if(notificationNonLus && notificationNonLus.length > 0){
            try {
                notificationNonLus.map( async(item: any) => {
                    await updateNotifcation({
                        utilisateurId: utilisateurId ?? "",
                        notificationId: item.id
                    })
            })
            fetchAllNotifications();
            fetchAllNotificationNonLus();
            } catch (error) {}
        }
    }

    return {
        notifications,
        notificationNonLus,
        voirTout,
        toutMarqueCommeLus,
        isConnected,
        voirMoins
    }

}