'use client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '@/store';
import { useState, useEffect, Fragment } from 'react';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconMinus from '@/components/icon/icon-minus';

import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import { Logo } from '../icons';
import menuData, { IMenuData } from '@/config/menu-data';
import { ProfileOrganisations } from '@/types';
import { OrganisationDropdown } from './organisation-dropdown';
const Sidebar = ({ reference, profileOrganisations }: { reference: string; profileOrganisations: ProfileOrganisations | null }) => {
    const dispatch = useDispatch();
    const { t } = getTranslation();
    const pathname = usePathname();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo">
                            <Logo className="w-32 py-2" />
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <div className="p-4 border-b border-muted lg:hidden">
                        <OrganisationDropdown reference={reference} profileOrganisations={profileOrganisations} />
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                            <RenderMenu reference={reference} menu={menuData} currentMenu={currentMenu} toggleMenu={toggleMenu} t={t} />
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;

function RenderMenu({ reference, menu, currentMenu, toggleMenu, t }: { reference: string; menu: IMenuData[]; currentMenu: string; toggleMenu: (value: string) => void; t: (value: string) => string }) {
    const renderMenuItem = (item: IMenuData, key: number) => {
        return (
            <li key={key} className="menu nav-item">
                <button type="button" className={`${currentMenu === item.title ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu(item.title)}>
                    <div className="flex items-center">
                        {item.icon && <item.icon className="shrink-0 group-hover:!text-primary" />}
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-gray-600 dark:group-hover:text-white-dark">{t(item.title)}</span>
                    </div>

                    <div className={currentMenu !== item.title ? '-rotate-90 rtl:rotate-90' : ''}>
                        <IconCaretDown />
                    </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === item.title ? 'auto' : 0}>
                    <ul className="sub-menu text-gray-500">
                        {item?.children?.map((child: any, index: number) => (
                            <li key={index}>
                                <Link href={`/workspaces/${reference}${child.path ?? ''}`}>{t(child.title)}</Link>
                            </li>
                        ))}
                    </ul>
                </AnimateHeight>
            </li>
        );
    };

    const renderItem = (item: IMenuData, key: number) => {
        return (
            <li key={key} className="nav-item">
                <Link href={`/workspaces/${reference}${item.path ?? ''}`} className="group">
                    <div className="flex items-center">
                        {item.icon && <item.icon className="shrink-0 group-hover:!text-primary" />}
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-muted-foreground dark:group-hover:text-white-dark">{t(item.title)}</span>
                    </div>
                </Link>
            </li>
        );
    };
    const renderItemMenuHeader = (item: IMenuData, key: number) => {
        return (
            <Fragment key={key}>
                <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                    <IconMinus className="hidden h-5 w-4 flex-none" />
                    <span>{t(item.title)}</span>
                </h2>
                <li className="nav-item">
                    <ul>{item?.children?.map((child: any, index: number) => (child.children ? renderMenuItem(child, index) : renderItem(child, index)))}</ul>
                </li>
            </Fragment>
        );
    };
    return menu.map((item, index) => {
        if (!item.isHeader && item.children) {
            return renderMenuItem(item, index);
        }if (!item.isHeader) {
            return renderItem(item, index);
        } else {
            return renderItemMenuHeader(item, index);
        }
    });
}
