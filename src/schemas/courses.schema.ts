import { z } from 'zod';

// Schéma pour les coordonnées géographiques
const localisationCourseExterneSchema = z.object({
    longitude: z.number(),
    latitude: z.number()
});

// Schéma pour le destinataire
const destinataireCourseExterneSchema = z.object({
    nomComplet: z.string().min(1, "Le nom complet est requis"),
    contact: z.string().min(1, "Le contact est requis")
});

// Enum pour les modes de paiement
const modePaiementEnum = z.enum(["Espèce", "Mobile Money", "Carte bancaire"]);

// Schéma pour une commande individuelle
const commandeCourseExterneSchema = z.object({
    libelle: z.string().min(1, "Le libellé est requis"),
    numero: z.string().min(1, "Le numéro de commande est requis"),
    dateHeure: z.string(),
    destinataire: destinataireCourseExterneSchema,
    lieuRecuperation: localisationCourseExterneSchema,
    lieuLivraison: localisationCourseExterneSchema,
    modePaiement: modePaiementEnum,
    prix: z.number().min(0, "Le prix doit être supérieur ou égal à 0"),
    livraisonPaye: z.boolean()
});

// Schéma principal pour la liste des commandes
export const courseExterneSchema = z.object({
    restaurantId: z.string().uuid("L'ID du restaurant doit être un UUID valide"),
    commandes: z.array(commandeCourseExterneSchema).min(1, "Au moins une commande est requise")
});

// Type pour TypeScript
export type _courseExterneSchema = z.infer<typeof courseExterneSchema>;

export const locationSchema = z.object({
    address: z.string().min(1, "L'adresse est requise"),
    longitude: z.number(),
    latitude: z.number(),
});

export const commandeSchema = z.object({
    libelle: z.string().min(1, 'Le libellé est requis'),
    numero: z.string().min(1, 'Le numéro est requis'),
    dateHeure: z.string(),
    destinataire: z.object({
        nomComplet: z.string().min(1, 'Le nom est requis'),
        contact: z.string().min(1, 'Le contact est requis'),
    }),
    lieuRecuperation: locationSchema,
    lieuLivraison: locationSchema,
   modePaiement: modePaiementEnum,
    prix: z.number().min(0, 'Le prix doit être positif'),
    livraisonPaye: z.boolean(),
});

export const AllCommandeSchema = z.object({
    commandes: z.array(commandeSchema).min(1, 'Au moins une commande est requise'),
});

export type FormValues = z.infer<typeof AllCommandeSchema>;
export type CommandeItem = z.infer<typeof commandeSchema>;


export const defaultCommande: CommandeItem = {
    libelle: '',
    numero: '',
    dateHeure: new Date().toISOString(),
    destinataire: {
        nomComplet: '',
        contact: '',
    },
    lieuRecuperation: {
        address: '',
        longitude: 0,
        latitude: 0,
    },
    lieuLivraison: {
        address: '',
        longitude: 0,
        latitude: 0,
    },
    modePaiement: 'Espèce',
    prix: 0,
    livraisonPaye: false,
};

