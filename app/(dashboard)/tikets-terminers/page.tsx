import { auth } from "@/auth";
import { getAllBonLivraisons } from "@/src/actions/tickets.actions";
import Content from "./content";


export default async function Page() {
    const session = await auth();
    const initialData = await getAllBonLivraisons(session?.user.restauranID ?? "", 0, 10, { dates: { start: null, end: null } });
    return (
        <Content initialData={initialData} restaurantId={session?.user.restauranID} />
    )
}