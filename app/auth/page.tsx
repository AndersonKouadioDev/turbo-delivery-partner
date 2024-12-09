import { Suspense } from 'react';

import Content from './content';
import Loading from '@/components/layouts/loading';

export default function AuthPage() {
    return (
        <Suspense fallback={<Loading />}>
            <Content />
        </Suspense>
    );
}
