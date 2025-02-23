export interface ChiffreAffaire {
    commandeTotalTermine: number;
    fraisLivraisonTotalTermine: number;
    nbCommandeTotalTermine: number;
    commandeTotalEnAttente: number;
    fraisLivraisonTotalEnAttente: number;
    nbCommandeTotalEnAttente: number;
    commandeTotalInitie: number;
    fraisLivraisonTotalInitie: number;
    nbCommandeTotalInitie: number;
    commandeTotalEnCours: number;
    fraisLivraisonTotalEnCours: number;
    nbCommandeTotalEnCours: number;
    commissionCommande: number;
    commissionChiffreAffaire: number;
}

export interface ChiffreAffaireRestaurant extends ChiffreAffaire {
    restaurantId: string;
    restaurant: string;
}
