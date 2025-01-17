import React, { Suspense } from 'react';
import Content from './content';
import Loading from '@/components/layouts/loading';
import { getAllCourseExterne } from '@/src/actions/courses.actions';
import { auth } from '@/auth';

export default async function DeliveryPage() {
    const session = await auth();

    const data = await getAllCourseExterne(session?.user?.restauranID ?? '');

    return (
        <Suspense fallback={<Loading />}>
            <Content data={data} />
        </Suspense>
    );
}