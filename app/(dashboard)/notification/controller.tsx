'use client';

import { fetchAllNotifcation } from '@/src/actions/notifcation.action';
import { NotificationVM } from '@/types/notifcation.model';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function useNotificationController({ initalNotification, utilisateurId }: { initalNotification: NotificationVM[], utilisateurId?: string }) {
    // const [notifications, setNotifications] = useState<NotificationVM[]>(initalNotification);
    // const notificationFilter = notifications.filter((no)=>no.lu === "NON LU");

    // const fetchAllNotifications = async () => {
    //     try {
    //         const result = await fetchAllNotifcation(utilisateurId ?? '');
    //         setNotifications(result);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return {
        // notifications,
        // notificationFilter,
    };
}
