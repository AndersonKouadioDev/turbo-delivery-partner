"use client";

import React from "react";
import Link from "next/link";
import {
  IconCalendar,
  IconHome,
  IconLayoutDashboard,
  IconSettings2,
} from "@tabler/icons-react";
import { AiOutlineDashboard } from "react-icons/ai";
import { Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function TabsD({ reference }: { reference: string }) {
  // const { tab, setTab } = useTabManage();
  const tab_items = tabItems(reference);

  return (
    <ScrollArea className="whitespace-nowrap">
      <div className="relative flex gap-6 w-full">
        {tab_items.map((tab_item) => (
          <Link
            key={tab_item.key}
            // className={`relative flex items-center gap-2 pt-2 pb-4 transition-all ease-soft-spring ${
            //   tab === tab_item.key
            //     ? "text-primary"
            //     : "text-black/60 dark:text-white/60 hover:text-black/40 dark:hover:text-white/40"
            // }`}
            className={`relative flex items-center gap-2 pt-2 pb-4 transition-all ease-soft-springtext-black/60 dark:text-white/60 hover:text-black/40 dark:hover:text-white/40`}
            href={tab_item.href}
            // onClick={() => setTab(tab_item.key as string)}
          >
            <tab_item.icon size={16} />
            <span className="text-sm">{tab_item.title}</span>
            <Chip color="primary" size="sm" variant="flat">
              {tab_item.notify}
            </Chip>
            {/* {tab === tab_item.key && (
              <div className="absolute transition-all ease-soft-spring w-full h-0.5 bg-primary rounded-sm bottom-0" />
            )} */}
          </Link>
        ))}
      </div>
      <ScrollBar className="h-0" orientation="horizontal" />
    </ScrollArea>
  );
}

export const useTabManage = () => {
  const router = useRouter();
  // const [tab, setTab] = useLocalStorageState<string | undefined>(
  //   "use-local-storage-state-tab",
  //   {
  //     defaultValue: "overview",
  //   },
  // );
  const changeRoute = (route: string, tab: string = "overview") => {
    router.push(route);
    // setTab(tab);
  };

  return {
    // tab,
    // setTab,
    changeRoute,
  };
};

interface TabItem {
  key: string;
  href: string;
  title: string;
  icon: React.ElementType;
  notify: number;
}


const tabItems = (reference: string): TabItem[] => {
  return [
    {
      key: `overview`,
      href: `/workspaces/${reference}`,
      title: "Aperçu",
      icon: IconLayoutDashboard,
      notify: 9,
    },
    {
      key: `bookings`,
      href: `/workspaces/${reference}/bookings`,
      title: "Réservations",
      icon: IconCalendar,
      notify: 3,
    },
    {
      key: `properties`,
      href: `/workspaces/${reference}/properties`,
      title: "Biens",
      icon: IconHome,
      notify: 1,
    },
    {
      key: `statistics`,
      href: `/workspaces/${reference}/statistics`,
      title: "Statistiques",
      icon: AiOutlineDashboard,
      notify: 9,
    },
    {
      key: `settings`,
      href: `/workspaces/${reference}/settings/general`,
      title: "Paramètres",
      icon: IconSettings2,
      notify: 2,
    },
  ];
};
