import Link from 'next/link';
import { Bell, Home, Menu, Gauge, Settings, Pizza, MessageSquare, ShoppingBag } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DashboardNavItems } from '@/components/dashboard/dashboard-nav-items';
import { Button } from '@nextui-org/react';
import { DashboardUserDropdown } from '@/components/dashboard/dashboard-user-dropdown';
import { Logo } from '@/components/icons';
import ThemeSwitch from '@/components/layouts/themeSwitch';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { findOneRestaurant } from '@/src/actions/restaurant.actions';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/auth');
    } else {
        // if (session.user.isNew) {
        //     redirect('/create-restaurant');
        // }
    }

    const findOne = await findOneRestaurant();

    const restaurant = findOne ? findOne.restaurant : null;

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
            badge: 6,
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
            href: '/settings',
            icon: <Settings className="h-5 w-5" />,
            label: 'Paramètres',
        },
    ];

    return (
        <div className="grid relative mx-auto w-full max-w-screen-2xl h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Logo />
                            <span className="">Turbo Delivery</span>
                        </Link>
                        <Button variant="bordered" startContent={<Bell className="h-4 w-4" />} className="ml-auto h-8 w-8" isIconOnly={true} radius="sm" />
                    </div>
                    <div className="flex-1">
                        <DashboardNavItems navItems={navItems} />
                    </div>
                    <div className="mt-auto p-4">{/* <DashboardCardProgress /> */}</div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="bordered" startContent={<Menu className="h-5 w-5" />} className="shrink-0 md:hidden" isIconOnly={true} />
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <DashboardNavItems navItems={navItems} />
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1 flex items-center justify-end">
                        {/* <DashboardSearchBar /> */}
                        <ThemeSwitch />
                    </div>

                    <DashboardUserDropdown restaurant={restaurant} />
                </header>
                <main className="relative  p-2 lg:p-4 w-full bg-muted overflow-y-auto h-full max-h-[calc(100vh-60px)]">{children}</main>
            </div>
        </div>
    );
}
