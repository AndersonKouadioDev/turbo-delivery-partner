import Content from './content';
import { getAllChiffreAffaire } from '@/src/actions/statistiques.action';
import { auth } from '@/auth';

export default async function Page() {
    const session = await auth();
    const data = await getAllChiffreAffaire({ restaurantID: session?.user?.restauranID ?? '' });

    // if (!data) throw new Error("Données de chiffres d'affaire pas disponible");

    return <Content initialData={data} />;
}
