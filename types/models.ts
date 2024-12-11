export interface TypeCuisine {
    // Définissez les propriétés de type cuisine ici, par exemple :
    // id: string;
    // nom: string;
}

export interface Role {
    id: string;
    status: number;
    deleted: boolean;
    dateCreation: string;
    dateEdition: string;
    libelle: string;
}

export interface User {
    id: string;
    status: number;
    deleted: boolean;
    dateCreation: string;
    dateEdition: string;
    nom: string;
    prenoms: string;
    image: string;
    username: string;
    email: string;
    changePassword: boolean;
    attemptLogin: number;
    passwordExpired: string;
    dateOfInactivity: string;
    role: Role | null;
    restaurant: Restaurant | null;
}

export interface Restaurant {
    id: string;
    status: number;
    deleted: boolean;
    dateCreation: string;
    dateEdition: string;
    nomEtablissement: string;
    description: string;
    email: string;
    telephone: string;
    codePostal: string;
    commune: string;
    localisation: string;
    siteWeb: string | null;
    logo: string;
    logo_Url: string;
    dateService: string;
    documentUrl: string;
    cni: string;
    pictures: Picture[];
    openingHours: Horaire[];
}
export interface Picture {
    id: string;
    status: number;
    deleted: boolean;
    dateCreation: string;
    dateEdition: string;
    pictureUrl: string;
  }
  
export interface Horaire {
    id: string;
    status: number;
    deleted: boolean;
    dateCreation: string;
    dateEdition: string;
    dayOfWeek: string;
    openingTime: string;
    closingTime: string;
    closed: boolean;
}

export interface DeliveryMan {
    id: string;
    status: number;
    deleted: boolean;
    dateCreation: string;
    dateEdition: string;
    nom: string | null;
    prenoms: string | null;
    avatarUrl: string | null;
    telephone: string;
    email: string | null;
    birthDay: string | null;
    gender: string | null;
    cniUrlR: string | null;
    cniUrlV: string | null;
    category: string | null;
    habitation: string | null;
    immatriculation: string | null;
    numeroCni: string | null;
    matricule: string;
}

export interface TypePlat {
    id: string;
    status: number;
    deleted: boolean;
    dateCreation: string;
    dateEdition: string;
    libelle: string;
    description?: string; // Champ optionnel
    picture?: string | null; // Champ optionnel
    pictureUrl?: string | null; // Champ optionnel
}

export interface FindOneRestaurant {
    typecuisine: string[];
    restaurant: Restaurant;
}
