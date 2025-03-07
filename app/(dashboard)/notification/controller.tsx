

import { fetchAllNotifcation } from "@/src/actions/notifcation.action";
import { NotificationVM } from "@/types/notifcation.model";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useNotificationController() {
    const session = useSession();
    const utilisateurId = session.data?.user?.id;
    const [notifications, setNotifications] = useState<NotificationVM[]>([]);

    const fetchAllNotifications = async () => {
        try {
            const result = await fetchAllNotifcation(utilisateurId ?? "")
            setNotifications(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    return {
        notifications
    }

}