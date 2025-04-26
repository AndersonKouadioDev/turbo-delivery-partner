import Loading from '@/components/layouts/loading';
import Content from './content';
import { getAllBonLivraisons } from '@/src/actions/tickets.actions';
import { auth } from '@/auth';

export default async function Page() {
    const session = await auth();
    const initialData = await getAllBonLivraisons(session?.user.restauranID ?? "", 0, 10, { dates: { start: null, end: null } });
    return (
        <Content initialData={initialData} restaurantId={session?.user.restauranID} />

    );
}
