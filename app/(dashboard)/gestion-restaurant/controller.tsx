import { useDisclosure } from "@heroui/react";

export function useGestionRestaurantController() {
    const dialogClosture = useDisclosure();
    const reglageDialogCloture = useDisclosure();

    return {
        dialogClosture,
        reglageDialogCloture
    }
}