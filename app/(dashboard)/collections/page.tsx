import React, { Suspense } from 'react';
import Content from './content';
import Loading from '@/components/layouts/loading';
import { getDishesGroupByCollection } from '@/src/actions/restaurant.actions';
import { InWorking } from '@/components/commons/InWorking';

export default async function Page() {
    const data = await getDishesGroupByCollection();

    return (
        <Suspense fallback={<Loading />}>
            {/* <InWorking
                titre="Notre Nouvelle Fonctionnalité Arrive Bientôt"
                message="Notre équipe travaille actuellement sur cette page pour vous offrir une meilleure expérience"
                datePrevue="1er Avril 2024"
                showDate={true}
            /> */}
            <Content data={data} />
        </Suspense>
    );
}
