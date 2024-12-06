import { z } from 'zod';

// Create Restaurant
export const createRestaurantSchema = z.object({
    nomEtablissement: z.string().min(1, "Le nom de l'établissement est requis"),
    commune: z.string().min(1, 'La commune est requise'),
    localisation: z.string().min(1, 'La localisation est requise'),
    docUrl: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'Le document est requis')
        .refine((file) => file.size <= 5 * 1024 * 1024, 'La taille du document ne doit pas dépasser 5 Mo')
        .refine((file) => ['application/pdf'].includes(file.type), 'Format de fichier non supporté (PDF, JPEG, PNG uniquement)'),
    cniUrl: z
        .instanceof(File)
        .refine((file) => file.size > 0, "La carte d'identité est requise")
        .refine((file) => file.size <= 5 * 1024 * 1024, 'La taille du document ne doit pas dépasser 5 Mo')
        .refine((file) => ['application/pdf'].includes(file.type), 'Format de fichier non supporté (PDF, JPEG, PNG uniquement)'),
    dateService: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)'),
    description: z.string().min(1, 'La description est requise'),
    logoUrl: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'Le logo est requis')
        .refine((file) => file.size <= 2 * 1024 * 1024, 'La taille du logo ne doit pas dépasser 2 Mo')
        .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), 'Format de logo non supporté (JPEG, PNG, GIF uniquement)'),
    telephone: z.string(),
    codePostal: z.string().optional(),
    email: z.string().email('Adresse e-mail invalide'),
});

export type _createRestaurantSchema = z.infer<typeof createRestaurantSchema>;

// Update Restaurant
export const updateRestaurantSchema = z.object({
    nomEtablissement: z.string().min(1, "Le nom de l'établissement est requis"),
    commune: z.string().min(1, 'La commune est requise'),
    localisation: z.string().min(1, 'La localisation est requise'),
    docUrl: z.any(), // Fichier requis
    cniUrl: z.any(), // Fichier requis
    logoUrl: z.any(), // Fichier requis
    dateService: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)'),
    description: z.string().min(1, 'La description est requise'),
    telephone: z.string().regex(/^\d+$/, 'Numéro de téléphone invalide'),
    codePostal: z.string().optional(),
    email: z.string().email('Adresse e-mail invalide'),
    siteWeb: z.string().url('URL invalide').optional(), // C
});
export type _updateRestaurantSchema = z.infer<typeof updateRestaurantSchema>;

// Upload Picture
export const uploadPictureSchema = z.object({
    pictures: z.array(z.any()).nonempty(), // Le fichier est attendu en tant que tableau non vide
});
export type _uploadPictureSchema = z.infer<typeof uploadPictureSchema>;

// Assign Type Cuisine
export const assignTypeCuisineSchema = z.object({
    libelle: z.array(z.string()).nonempty(), // Tableau de chaînes non vide
});
export type _assignTypeCuisineSchema = z.infer<typeof assignTypeCuisineSchema>;

// Add Plat
export const addPlatSchema = z.object({
    libelle: z.string(),
    description: z.string(),
    price: z.number(),
    collectionId: z.string().uuid(), // L'ID de collection semble être une UUID
    imageUrl: z.string(), // URL de l'image (peut être ajusté avec une validation spécifique d'URL si nécessaire)
    cookTime: z.number(), // Temps de cuisson en minutes
});
export type _addPlatSchema = z.infer<typeof addPlatSchema>;

// Add Plat Option
export const addPlatOptionSchema = z.object({
    libelle: z.string(),
    isRequired: z.boolean(),
    maxSeleteted: z.number(),
    platId: z.string().uuid(),
});
export type _addPlatOptionSchema = z.infer<typeof addPlatOptionSchema>;

// Add Plat Option Value
export const addPlatOptionValueSchema = z.object({
    valeur: z.string(),
    prixSup: z.number(),
    optionId: z.string().uuid(),
});
export type _addPlatOptionValueSchema = z.infer<typeof addPlatOptionValueSchema>;

// Add Accompagnement
export const addAccompagnementSchema = z.object({
    libelle: z.string(),
    price: z.number(),
    platId: z.string().uuid(),
});
export type _addAccompagnementSchema = z.infer<typeof addAccompagnementSchema>;

// Update Accompagnement
export const updateAccompagnementSchema = z.object({
    libelle: z.string(),
    price: z.number(),
});
export type _updateAccompagnementSchema = z.infer<typeof updateAccompagnementSchema>;

// Add Boisson
export const addBoissonSchema = z.object({
    libelle: z.string(),
    price: z.number(),
    volume: z.number(),
});
export type _addBoissonSchema = z.infer<typeof addBoissonSchema>;

// Update Boisson
export const updateBoissonSchema = z.object({
    libelle: z.string(),
    price: z.number(),
    volume: z.number(),
});
export type _updateBoissonSchema = z.infer<typeof updateBoissonSchema>;
