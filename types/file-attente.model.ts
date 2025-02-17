export interface TimeOfDay {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }
  
  export interface FileAttenteLivreur {
    id: string;
    avatar: string;
    nomComplet: string;
    position: number;
    dateJour: string;
    heureJour: TimeOfDay;
    statut: string;
  }