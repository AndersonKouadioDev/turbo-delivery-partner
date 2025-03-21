import { fetchFilleAttente } from "@/src/actions/file-attente.actions";
import { repositionnerLivreur } from "@/src/actions/restaurant.actions";
import { FileAttenteLivreur, StatistiqueFileAttente } from "@/types/file-attente.model";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useFileAttenteController(
    initialData: FileAttenteLivreur[],
    stattitiqueFileAttente: StatistiqueFileAttente | null,
    restaurantId?: string
) {
    const [tempRecuperation, setTempRecuperation] = useState(3 * 60);
    const [currentDelivery, setCurrentDelivery] = useState<FileAttenteLivreur>();
    const [timeProgressions, setTimeProgression] = useState(0);
    const [datas, setData] = useState<FileAttenteLivreur[]>(initialData);
    const [haseError, setHasErreur] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchFileAttenteLivreur = async () => {
        try {
            const data = await fetchFilleAttente(restaurantId ?? '');
            setData(data);
        } catch (error) { }
    }

    const repositionLivreur = async (livreruId: string) => {
        setLoading(true)
        try {
            const data = await repositionnerLivreur(livreruId);
            if (data && data.status === "success") {
                setTempRecuperation(3 * 60);
                setTimeProgression(0)
                toast.success(data.message);
            } else {
                toast.error("Erreur lors de la réposition du livreur");
                setHasErreur(true)
            }
        } catch (error: any) {
            toast.error(error?.message || "Une erreur s'est produite !");
            setHasErreur(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!haseError && stattitiqueFileAttente?.commandeEnAttente !== 0) {
            setCurrentDelivery(initialData[0]);
            if (tempRecuperation === 1) {
                setLoading(true)                   // Vérifie si le temps de recuperation est écoulé
                repositionLivreur(initialData[0].id); //Reposition le livreur
                fetchFileAttenteLivreur();
            }
            const timer = setInterval(() => {
                if (!loading && !haseError) {
                    setTempRecuperation((prevTime) => prevTime - 1);
                    setTimeProgression((prev) => prev + 0.55)
                }
            }, 1000);
            return () => clearInterval(timer);
        }

    }, [tempRecuperation, stattitiqueFileAttente?.commandeEnAttente, loading]);

    const minutes = Math.floor(tempRecuperation / 60);
    const seconds = tempRecuperation % 60;

    return { minutes, seconds, currentDelivery, datas, timeProgressions };
}