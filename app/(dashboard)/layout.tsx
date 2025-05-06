import Link from 'next/link';
import { Bell, Home, Menu, Gauge, Settings, Pizza, MessageSquare, ShoppingBag, TicketCheck, Hammer } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DashboardNavItems } from '@/components/dashboard/dashboard-nav-items';
import { Button } from '@heroui/react';
import { DashboardUserDropdown } from '@/components/dashboard/dashboard-user-dropdown';
import { Logo } from '@/components/icons';
import { auth } from '@/auth';
import { findOneRestaurant } from '@/src/actions/restaurant.actions';
import { TbTruckDelivery } from 'react-icons/tb';
import Notifications from '@/components/dashboard/notifications/notifications';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await auth();

    const data = await findOneRestaurant();
    const restaurant = data?.restaurant;

    const navItems = [
        {
            href: '/',
            icon: <Home className="h-5 w-5" />,
            label: 'Accueil',
        },
        {
            href: '/analytics',
            icon: <Gauge className="h-5 w-5" />,
            label: 'Tableau de bord',
        },
        {
            href: '/collections',
            icon: <Pizza className="h-5 w-5" />,
            label: 'Collections',
            // badge: 6,
        },
        {
            href: '/delivery',
            icon: <TicketCheck className="h-5 w-5" />,
            label: 'Mes Courses',
        },
        {
            href: '/file-attente',
            icon: <TbTruckDelivery className="h-5 w-5" />,
            label: "File d'attente",
        },
        {
            href: '/tickets',
            icon: <Hammer className="h-5 w-5" />,
            label: "Gestion des tickets",
        },
        {
            href: '/notification',
            icon: <Bell className="h-5 w-5" />,
            label: 'Notification',
        },
        {
            href: '/orders',
            icon: <ShoppingBag className="h-5 w-5" />,
            label: 'Mes Commandes',
        },
        {
            href: '/messages',
            icon: <MessageSquare className="h-5 w-5" />,
            label: 'Messages',
        },
        {
            href: '/gestion-restaurant',
            icon: <Hammer className="h-5 w-5" />,
            label: 'Gestion de restaurant',
        },
        {
            href: '/settings',
            icon: <Settings className="h-5 w-5" />,
            label: 'Paramètres',
        },

    ];

    return (
        <div className="grid relative mx-auto w-full max-w-screen-2xl h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r dark:border-muted bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b dark:border-muted px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Logo />
                            <span className="">Turbo Delivery</span>
                        </Link>
                        {/* <Button variant="bordered" startContent={
                            <Bell className="h-4 w-4" />} className="ml-auto h-8 w-8" isIconOnly={true} radius="sm" /> */}
                        <Notifications />
                    </div>
                    <div className="flex-1">
                        <DashboardNavItems navItems={navItems} />
                    </div>
                    <div className="mt-auto p-4">{/* <DashboardCardProgress /> */}</div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b dark:border-muted bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="bordered" startContent={<Menu className="h-5 w-5" />} className="shrink-0 md:hidden" isIconOnly={true} />
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <DashboardNavItems navItems={navItems} />
                        </SheetContent>
                    </Sheet>
                    <div className="md:hidden lg:hidden xl:hidden">
                        <Notifications />
                    </div>
                    <div className="w-full flex-1 flex items-center justify-end">
                        {/* <DashboardSearchBar /> */}
                        {/* <ThemeSwitch /> */}
                    </div>

                    {session && session?.user && <DashboardUserDropdown restaurant={restaurant} user={session?.user} />}
                </header>
                <main className="relative  p-2 lg:p-4 w-full bg-muted overflow-y-auto h-full max-h-[calc(100vh-60px)]">{children}</main>
            </div>
        </div>
    );
}
