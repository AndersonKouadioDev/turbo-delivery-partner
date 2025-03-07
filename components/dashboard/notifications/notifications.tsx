"use client"

import { useNotificationController } from './controller';
import Content from './content';
import { Suspense } from 'react';
import Loading from '@/app/loading';

export async function  Notifications({ className }: { className?: string }) {
    const ctrl = await useNotificationController();
    return (
          <Suspense fallback={<Loading />}>
            <Content notifications={ctrl.notifications} notificationNonLus={ctrl.notificationNonLus} voirTout={ctrl.voirTout}
            toutMarqueCommeLus={ctrl.toutMarqueCommeLus} isConnected={ctrl.isConnected} voirMoins={ctrl.voirMoins}/>
          </Suspense>
    );
};

export default Notifications;
