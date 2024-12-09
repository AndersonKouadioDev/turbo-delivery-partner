import HorairesForm from '@/components/dashboard/horaires/horaires-form';
import { Suspense } from 'react';

export default function HorairePage() {
    return (
        <Suspense>
            <HorairesForm />
        </Suspense>
    );
}
