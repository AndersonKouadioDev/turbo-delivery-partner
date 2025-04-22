import { findOneRestaurant } from "@/src/actions/restaurant.actions";
import Content from "./content";


export default async function Page() {
    const restaurant = await findOneRestaurant();
    return <Content restaurant={restaurant} />;
}
