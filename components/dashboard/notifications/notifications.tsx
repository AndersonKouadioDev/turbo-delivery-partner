'use client';

import { useNotificationController } from './controller';
import Content from './content';

export function Notifications({ className }: { className?: string }) {
    const ctrl = useNotificationController();
    return (
        <Content
            notifications={ctrl.notifications}
            notificationNonLus={ctrl.notificationNonLus}
            voirTout={ctrl.voirTout}
            toutMarqueCommeLus={ctrl.toutMarqueCommeLus}
            isConnected={ctrl.isConnected}
            voirMoins={ctrl.voirMoins}
        />
    );
}

export default Notifications;
