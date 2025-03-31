"use client";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import {
  User,
  Languages,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRightIcon,
  Building,
} from "lucide-react";
import "@smastrom/react-rating/style.css";

import Link from "next/link";

const navItems = [
  {
    href: "/settings/account",
    icon: <User className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10" />,
    label: "Compte",
  },
  {
    href: "/settings/restaurant",
    icon: <Building className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10" />,
    label: "Restaurant",
  },
  {
    href: "/settings/languages",
    icon: <Languages className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10" />,
    label: "Langues",
    badge: 6,
  },
  {
    href: "/settings/help",
    icon: <HelpCircle className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10" />,
    label: "Aide",
  },
  {
    href: "/settings/policy",
    icon: <Shield className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10" />,
    label: "Politique de confidentialité",
  },
];

export default function Content() {
  return (
    <div className="w-full h-full p-4 space-y-6">
      <Listbox
        variant="light"
        aria-label="Listbox menu settings"
        itemClasses={{
          base: "px-3 md:gap-10 my-4 md:my-6",
        }}
      >
        <ListboxSection
          showDivider
          title="Paramètres"
          classNames={{
            heading: "text-lg md:text-3xl text-gray-400",
          }}
        >
          {navItems.map((item) => (
            <ListboxItem
              key={item.href}
              href={item.href}
              as={Link}
              startContent={item.icon}
              endContent={<ChevronRightIcon className="text-xl" />}
            >
              <p className="md:text-lg lg:text-3xl">{item.label}</p>
            </ListboxItem>
          ))}
        </ListboxSection>
        <ListboxItem
          key="logout"
          className="text-danger"
          color="danger"
          startContent={<LogOut className="w-8 h-8 md:w-10 md:h-10" />}
          endContent={<ChevronRightIcon className="text-xl" />}
        >
          <p className="md:text-lg lg:text-3xl">Déconnexion</p>
        </ListboxItem>
      </Listbox>
    </div>
  );
}
