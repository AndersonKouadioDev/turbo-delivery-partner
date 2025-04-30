

export interface NotificationVM {
    id?: string;
    titre?: string;
    message?: string;
    lu?: string;
    lien?: string;
    type?: NotificationEnum
    tempsPasse?: string
}

export interface LireNotificationCommande {
    notificationId: string;
    utilisateurId: string;
}

export interface NotificationDetailsVM {
    id?: string;
    titre?: string;
    message?: string;
    lu?: string;
    lien?: string;
    type?: NotificationEnum
    tempsPasse?: string;
    createdAt?: string;
    updatedAt?: string;
    utilisateurId?: string;
}

export enum NotificationEnum {
    NOUVELLE_COURSE,
    ACCEPTATION_COURSE,
    ASSIGNATION_COURSE,
    CLOTURE_COURSE,
    COMMANDE,
    ANNULATION_COMMANDE,
    DEMANDE_ASSIGNATION,
    DEMANDE_ASSIGNATION_ACCEPTE,
    DEMANDE_ASSIGNATION_REJETER
}