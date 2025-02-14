export interface ChiffreAffaire {
    commandeTotalTermine: number;
    fraisLivraisonTotalTermine: number;
    fraisLivraisonTotalEnAttente: number;
    commandeTotalEnAttente: number;
    nbCommandeTotalTermine: number;
    nbCommandeTotalEnAttente: number;
    commissionCommande: number;
    commissionChiffreAffaire: number;
}

export interface ChiffreAffaireRestaurant extends ChiffreAffaire {
    restaurantId: string;
    restaurant: string;
}
