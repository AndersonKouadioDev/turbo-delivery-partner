import { getPaginationCourseExterne } from "@/src/actions/courses.actions";
import { findOneRestaurant } from "@/src/actions/restaurant.actions";
import { redirect } from "next/navigation";
import Content from "./content";


export default async function Page() {
    const data = await findOneRestaurant();
    const restaurant = data?.restaurant;
    if (!restaurant) {
        redirect('/auth/signout');
    }

    const data2 = await getPaginationCourseExterne(restaurant.id ?? '', 0, 5);
    return (
        <Content initialData={data2} restaurant={restaurant} />
    )
}