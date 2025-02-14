import React, { Suspense } from 'react';
import Content from './content';
import { getAllChiffreAffaire } from '@/src/actions/statistiques.action';
import { auth } from '@/auth';

export default async function Page() {
    const session = await auth();
    const data = await getAllChiffreAffaire(session?.user?.restauranID ?? '');
console.log(data)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Content />
        </Suspense>
    );
}
