"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export const DashboardNavItems = ({
  navItems,
}: {
  navItems: {
    href: string;
    label: string;
    icon: React.ReactNode;
    badge?: React.ReactNode;
  }[];
}) => {
  const pathname = usePathname();
  return (
    <nav className="grid md:items-start md:px-2 md:text-sm lg:px-4 gap-2 text-lg font-medium">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname === item.href && pathname === "/dashboard" ? "bg-muted text-primary" : item.href !== "/dashboard" && pathname.startsWith(item.href) ? "bg-muted text-primary" : "text-muted-foreground"} hover:text-foreground`}
        >
          {item.icon}
          {item.label}
          {item.badge && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {item.badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  );
};
