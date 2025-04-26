import React, { Suspense } from 'react';
import Loading from '@/components/layouts/loading';
import Content from './content';

export default async function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <Content />
        </Suspense>
    );
}
