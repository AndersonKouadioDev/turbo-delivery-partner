
export interface Limits {
  organizations: number | 'Illimité';
  membersPerOrg: number | 'Illimité';
}

export interface Tier {
  id: string;
  name: string;
  price: string;
  priceAmount: number | null;
  duration: string;
  billing?: string;
  description: string;
  buttonText: string;
  popular: boolean;
  limits: Limits;
}

export interface Feature {
  category: string;
  features: string[];
}

export type FeatureAvailability = {
  [key: string]: {
      [key: string]: boolean | string;
  };
};

export const tiers: Tier[] = [
  {
      id: 'start',
      name: 'STARTER',
      price: 'Free',
      priceAmount: 0,
      duration: '30 jours',
      description: 'Pour les petites équipes',
      buttonText: 'Commencer gratuitement',
      popular: false,
      limits: {
          organizations: 2,
          membersPerOrg: 10,
      },
  },
  {
      id: 'starter',
      name: 'STARTER',
      price: '80XOF',
      priceAmount: 80,
      duration: 'par mois',
      billing: '810XOF facturés annuellement',
      description: 'Pour les petites équipes',
      buttonText: "S'abonner",
      popular: false,
      limits: {
          organizations: 2,
          membersPerOrg: 10,
      },
  },
  {
      id: 'business',
      name: 'BUSINESS',
      price: '160XOF',
      priceAmount: 160,
      duration: 'par mois',
      billing: '1206XOF facturés annuellement',
      description: 'Pour les équipes en croissance',
      buttonText: "S'abonner",
      popular: true,
      limits: {
          organizations: 10,
          membersPerOrg: 50,
      },
  },
];

export const features: Feature[] = [
  {
      category: 'Authentification des utilisateurs',
      features: ['Connexion sécurisée avec OTP', 'Système de délégation des permissions', 'SSO Enterprise'],
  },
  {
      category: "Gestion d'équipes",
      features: ['Organigramme interactif', 'Tableaux de bord personnalisés', 'Outils de collaboration intégrés', 'Gestion avancée des rôles'],
  },
  {
      category: 'Gestion de biens',
      features: ['Catalogue virtuel basique', 'Catalogue virtuel avec visite 3D', 'Système de matching automatique', 'Suivi en temps réel'],
  },
  {
      category: 'Gestion des réservations',
      features: ['Système de réservation en ligne', 'Génération de contrats', 'Gestion des enchères', 'Relance automatique'],
  },
  {
      category: 'Analytics',
      features: ['Visualisation basique', 'Analyses comparatives', 'Prévisions IA', 'Rapports personnalisables'],
  },
  {
      category: 'CRM',
      features: ['Segmentation client basique', 'Automatisation du parcours client', 'Intégration réseaux sociaux', 'Notation prédictive des leads'],
  },
];

export const featureAvailability: FeatureAvailability = {

  STARTER: {
      'Connexion sécurisée avec OTP': true,
      'Système de délégation des permissions': true,
      'SSO Enterprise': false,
      'Organigramme interactif': true,
      'Tableaux de bord personnalisés': true,
      'Outils de collaboration intégrés': true,
      'Gestion avancée des rôles': false,
      'Catalogue virtuel basique': true,
      'Catalogue virtuel avec visite 3D': true,
      'Système de matching automatique': true,
      'Suivi en temps réel': true,
      'Système de réservation en ligne': true,
      'Génération de contrats': true,
      'Gestion des enchères': false,
      'Relance automatique': true,
      'Visualisation basique': true,
      'Analyses comparatives': true,
      'Prévisions IA': false,
      'Rapports personnalisables': true,
      'Segmentation client basique': true,
      'Automatisation du parcours client': true,
      'Intégration réseaux sociaux': false,
      'Notation prédictive des leads': false,
  },
  BUSINESS: {
      'Connexion sécurisée avec OTP': true,
      'Système de délégation des permissions': true,
      'SSO Enterprise': true,
      'Organigramme interactif': true,
      'Tableaux de bord personnalisés': true,
      'Outils de collaboration intégrés': true,
      'Gestion avancée des rôles': true,
      'Catalogue virtuel basique': true,
      'Catalogue virtuel avec visite 3D': true,
      'Système de matching automatique': true,
      'Suivi en temps réel': true,
      'Système de réservation en ligne': true,
      'Génération de contrats': true,
      'Gestion des enchères': true,
      'Relance automatique': true,
      'Visualisation basique': true,
      'Analyses comparatives': true,
      'Prévisions IA': true,
      'Rapports personnalisables': true,
      'Segmentation client basique': true,
      'Automatisation du parcours client': true,
      'Intégration réseaux sociaux': true,
      'Notation prédictive des leads': true,
  },
};
