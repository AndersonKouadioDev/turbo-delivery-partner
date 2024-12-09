export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Lunion-Booking",
  description: "Real Estate ERP Powered by Lunion-Lab",
  contacts:{
    email:'support@lunion-lab.com',
    tel:'225 07 68 56 66 47'
  },
  navItems: [
    {
      label: "Présentation",
      href: "/",
    },
    {
      label: "Portail",
      href: "/portal",
    },
    {
      label: "Tarifs",
      href: "/pricing",
    },
  ],
  links: {
    sponsor: "https://patreon.com/Lunion_Lab",
  },
};
