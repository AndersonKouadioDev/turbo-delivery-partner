export const categories = [
  {
    id: "all",
    name: "Toutes les catégories",
    dishes: 10,
    image:
      "https://img.freepik.com/photos-gratuite/vue-dessus-fast-food-mix-batonnets-mozzarella-club-sandwich-hamburger-pizza-aux-champignons-pizza-cesar-salade-crevettes-frites-ketchup-mayo-sauces-au-fromage-table_141793-3998.jpg?t=st=1729529376~exp=1729532976~hmac=167a44da6de0712683861095215e9e8eb6f614e7ea8faf64ce6b4a85609a121d&w=1800",
  },
  {
    id: "deserts",
    name: "Déserts",
    dishes: 10,
    image:
      "https://img.freepik.com/photos-gratuite/mini-shortcake-aux-fraises-mignon-rose_53876-106073.jpg?uid=R54521588&ga=GA1.1.1908964846.1724333514&semt=ais_hybrid",
  },
  {
    id: "pizza",
    name: "Pizza",
    dishes: 0,
    image:
      "https://img.freepik.com/photos-gratuite/pizza-pizza-remplie-tomates-salami-olives_140725-1200.jpg?t=st=1729103619~exp=1729107219~hmac=057a62dcaf953a937193b628b6cca266da6a684fd17fa251b24acbc39a8afc89&w=1380",
  },
  {
    id: "burger",
    name: "Burger",
    dishes: 10,
    image:
      "https://img.freepik.com/photos-gratuite/vue-avant-delicieux-hamburger-viande-du-fromage-salade-fond-sombre_140725-89597.jpg?uid=R54521588&ga=GA1.1.1908964846.1724333514&semt=ais_hybrid",
  },
];

export const foodItems = [
  {
    name: "Déserts",
    image:
      "https://img.freepik.com/photos-gratuite/mini-shortcake-aux-fraises-mignon-rose_53876-106073.jpg?uid=R54521588&ga=GA1.1.1908964846.1724333514&semt=ais_hybrid",
    recipes: 10,
    progress: 33,
  },
  {
    name: "Pizza",
    image:
      "https://img.freepik.com/photos-gratuite/pizza-pizza-remplie-tomates-salami-olives_140725-1200.jpg?t=st=1729103619~exp=1729107219~hmac=057a62dcaf953a937193b628b6cca266da6a684fd17fa251b24acbc39a8afc89&w=1380",
    recipes: 0,
    progress: 14.4,
  },
  {
    name: "Burgers",
    image:
      "https://img.freepik.com/photos-gratuite/vue-avant-delicieux-hamburger-viande-du-fromage-salade-fond-sombre_140725-89597.jpg?uid=R54521588&ga=GA1.1.1908964846.1724333514&semt=ais_hybrid",
    recipes: 10,
    progress: 61.8,
  },
];

export const bestSellers = [
  {
    name: "Chicken Burger",
    image:
      "https://img.freepik.com/photos-gratuite/vue-avant-delicieux-hamburger-viande-du-fromage-salade-fond-sombre_140725-89597.jpg?uid=R54521588&ga=GA1.1.1908964846.1724333514&semt=ais_hybrid",
    description: "Indulge in a flavorful Chicken Burger: seasoned chicken...",
    time: "10 min",
    rating: 4.8,
  },
  {
    name: "Poulet crispy",
    image:
      "https://img.freepik.com/photos-gratuite/poulet-frit-frites-sol-ciment-noir_1150-28542.jpg?t=st=1729107189~exp=1729110789~hmac=7a7b180de6c829ceaf745cea21cb5df1111125c4633f533858156065826effad&w=1800",
    description: "Indulge in a flavorful Poulet crispy : seasoned poulet...",
    time: "30 min",
    rating: 5.0,
  },
];

export const orders = [
  {
    id: "218099",
    name: "Jean David",
    avatar: "JD",
    items: [
      {
        name: "Poulet crispy",
        image:
          "https://img.freepik.com/photos-gratuite/poulet-frit-frites-sol-ciment-noir_1150-28542.jpg?t=st=1729107189~exp=1729110789~hmac=7a7b180de6c829ceaf745cea21cb5df1111125c4633f533858156065826effad&w=1800",
        price: "5 000 FCFA",
      },
      {
        name: "Chicken Burger",
        image:
          "https://img.freepik.com/photos-gratuite/vue-avant-delicieux-hamburger-viande-du-fromage-salade-fond-sombre_140725-89597.jpg?uid=R54521588&ga=GA1.1.1908964846.1724333514&semt=ais_hybrid",
        price: "5 000 FCFA",
      },
    ],
    status: "En cours",
    count: 2,
    price: "10 000 FCFA",
    date: "2024-01-01",
  },
  {
    id: "215568",
    name: "Sarah M",
    avatar: "SM",
    items: [
      {
        name: "Poulet crispy",
        image:
          "https://img.freepik.com/photos-gratuite/poulet-frit-frites-sol-ciment-noir_1150-28542.jpg?t=st=1729107189~exp=1729110789~hmac=7a7b180de6c829ceaf745cea21cb5df1111125c4633f533858156065826effad&w=1800",
        price: "5 000 FCFA",
      },
    ],
    status: "Livré",
    count: 1,
    price: "5 000 FCFA",
    date: "2024-01-01",
  },
  {
    id: "216987",
    name: "Samuel Triol",
    avatar: "ST",
    items: [
      {
        name: "Déserts",
        image:
          "https://img.freepik.com/photos-gratuite/mini-shortcake-aux-fraises-mignon-rose_53876-106073.jpg?uid=R54521588&ga=GA1.1.1908964846.1724333514&semt=ais_hybrid",
        price: "3 000 FCFA",
      },
      {
        name: "Poulet crispy",
        image:
          "https://img.freepik.com/photos-gratuite/poulet-frit-frites-sol-ciment-noir_1150-28542.jpg?t=st=1729107189~exp=1729110789~hmac=7a7b180de6c829ceaf745cea21cb5df1111125c4633f533858156065826effad&w=1800",
        price: "5 000 FCFA",
      },
    ],
    status: "Livré",
    count: 2,
    price: "10 000 FCFA",
    date: "2024-01-01",
  },
];

export const restaurants = [
  {
    id: "kfc",
    name: "KFC",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/26/c4/8a/f8/kfc-logo.jpg",
    images: [
      "https://www.pagesjaunes.fr/media/ugc/20/75/70/00/00/82/01/d2/35/49/5d3f20757000008201d23549/5d3f20757000008201d2354a.jpg",
      "https://beymedias.brightspotcdn.com/dims4/default/83f2fe5/2147483647/strip/false/crop/6446x4297+0+0/resize/1486x991!/quality/90/?url=http%3A%2F%2Fl-opinion-brightspot.s3.amazonaws.com%2Ff1%2F63%2F8d6f8a11b0661539d60f0e4de2a0%2Frestaurant-kfc-dr.jpg",
      "https://www.toute-la-franchise.com/images/zoom/kfc-douai-sin-le-noble.jpg",
    ],
    description: "Indulge in a flavorful Chicken Burger: seasoned chicken...",
    time: "10 min",
    rating: 3.5,
    address: "123 Rue de la Paix, Paris, France",
    phone: "+33 12 34 56 78 90",
    email: "contact@restaurant.com",
    website: "https://www.restaurant.com",
    socialMedia: {
      facebook: "https://www.facebook.com/restaurant",
      instagram: "https://www.instagram.com/restaurant",
      twitter: "https://www.twitter.com/restaurant",
    },
    categories: ["Déserts", "Pizza", "Burgers"],
    bestSellers: ["Chicken Burger", "Poulet crispy"],
    orders: ["En cours", "Livré"],
    reviews: [
      {
        name: "John Doe",
        rating: 4.5,
        comment: "Excellent restaurant!",
      },
      {
        name: "Jane Doe",
        rating: 4.0,
        comment: "Good food, good service!",
      },
    ],
  },
  {
    id: "mcdonalds",
    name: "McDonald's",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/McDonald%27s_square_2020.svg/640px-McDonald%27s_square_2020.svg.png",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPrfQIkBGvYspfEHihcVtzTs7cKmy3sl1dHA&s",
      "https://s7d1.scene7.com/is/image/mcdonalds/crown_point_mcdonalds-RR-EDIT_001:hero-desktop?resmode=sharp2",
      "https://www.surf-finance.com/wp-content/uploads/restaurant-mcdonalds-empire-immobilier-entreprise.jpg.webp",
    ],
    description: "Indulge in a flavorful Chicken Burger: seasoned chicken...",
    time: "10 min",
    rating: 4.5,
    address: "123 Rue de la Paix, Paris, France",
    phone: "+33 12 34 56 78 90",
    email: "contact@restaurant.com",
    website: "https://www.restaurant.com",
    socialMedia: {
      facebook: "https://www.facebook.com/restaurant",
      instagram: "https://www.instagram.com/restaurant",
      twitter: "https://www.twitter.com/restaurant",
    },
    categories: ["Déserts", "Pizza", "Burgers"],
    bestSellers: ["Chicken Burger", "Poulet crispy"],
    orders: ["En cours", "Livré"],
    reviews: [
      {
        name: "John Doe",
        rating: 4.5,
        comment: "Excellent restaurant!",
      },
      {
        name: "Jane Doe",
        rating: 4.0,
        comment: "Good food, good service!",
      },
    ],
  },
  {
    id: "burger-king",
    name: "Burger King",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/2024px-Burger_King_logo_%281999%29.svg.png",
    images: [
      "https://www.enpaysdelaloire.com/sites/default/files/styles/ogimage/public/sit/images/RESPDL044V50ZY3F/Burger-King-2.jpg?itok=3SSHl7TZ",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IXElx6h3kyUg_Zh0_MIJ8PhfwkG6dxQOiRitCUZ9pvVazleCBSNZR-RQSLzxQ5PwKoA&usqp=CAU",
      "https://www.marketingdirecto.com/wp-content/uploads/2020/03/Burger-King-coronavirus.png",
    ],
    description: "Indulge in a flavorful Chicken Burger: seasoned chicken...",
    time: "10 min",
    rating: 4.8,
    address: "123 Rue de la Paix, Paris, France",
    phone: "+33 12 34 56 78 90",
    email: "contact@restaurant.com",
    website: "https://www.restaurant.com",
    socialMedia: {
      facebook: "https://www.facebook.com/restaurant",
      instagram: "https://www.instagram.com/restaurant",
      twitter: "https://www.twitter.com/restaurant",
    },
    categories: ["Déserts", "Pizza", "Burgers"],
    bestSellers: ["Chicken Burger", "Poulet crispy"],
    orders: ["En cours", "Livré"],
    reviews: [],
  },
];

export type Account = {
  id: string;
  username: string;
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  password: string;
};
export const account: Account = {
  id: "1",
  username: "john.doe",
  lastname: "John Doe",
  firstname: "John Doe",
  email: "john.doe@example.com",
  phone: "+33 12 34 56 78 90",
  password: "password",
};

export const rapportCommande = [
  { month: "Janvier", orders: 350 },
  { month: "Février", orders: 105 },
  { month: "Mars", orders: 430 },
  { month: "Avril", orders: 580 },
  { month: "Mai", orders: 400 },
  { month: "Juin", orders: 520 },
  { month: "Juillet", orders: 750 },
  { month: "Août", orders: 720 },
  { month: "Sept", orders: 600 },
  { month: "Oct", orders: 650 },
  { month: "Nov", orders: 0 },
  { month: "Dec", orders: 0 },
];
export const rapportCommandeWeek = [
  { day: "Lundi", orders: 50 },
  { day: "Mardi", orders: 30 },
  { day: "Mercredi", orders: 15 },
  { day: "Jeudi", orders: 15 },
  { day: "Vendredi", orders: 20 },
  { day: "Samedi", orders: 105 },
  { day: "Dimanche", orders: 70 },
];
export const orderState = [
  { id: "all", name: "Toutes les commandes" },
  { id: "pending", name: "En cours" },
  { id: "delivered", name: "Livré" },
  { id: "canceled", name: "Annulé" },
];
