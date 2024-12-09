// Type pour définir la structure des labels personnalisés
export type CustomLabels<T extends string> = {
    [K in T]?: string;
};

// Type pour l'option générée
type Option = {
    label: string;
    value: string;
};

// Fonction utilitaire pour formater le label par défaut
export function formatEnumLabel(value: string): string {
    return value
        .toLowerCase()
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Fonction pour transformer l'enum en tableau d'options
export default function enumToOptions<T extends { [K: string]: string }>(enumObj: T, customLabels: CustomLabels<T[keyof T]> = {}): Option[] {
    return Object.values(enumObj).map((value) => ({
        // Ici nous vérifions explicitement si la valeur existe dans customLabels
        label: customLabels[value as keyof typeof customLabels] || formatEnumLabel(value),
        value: value,
    }));
}

// // Exemple d'utilisation
// enum OrganisationCategory {
//     HOTEL = 'HOTEL',
//     RESIDENCE = 'RESIDENCE',
//     GUEST_HOUSE = 'GUEST_HOUSE',
//     COMPANY = 'COMPANY'
// }
// const customLabels: CustomLabels<OrganisationCategory> = {
//     HOTEL: 'Hôtel',
//     RESIDENCE: 'Résidence',
//     GUEST_HOUSE: 'Maison d\'hôtes',
//     COMPANY: 'Entreprise'
// };

// // Utilisation avec labels personnalisés
// const optionsWithCustomLabels = enumToOptions(OrganisationCategory, customLabels);

// // Utilisation sans labels personnalisés (formatage automatique)
// const optionsWithDefaultLabels = enumToOptions(OrganisationCategory);
