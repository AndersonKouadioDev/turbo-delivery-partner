'use client';
import { IconCalendar, IconDashboard, IconHome, IconLayoutDashboard, IconLock, IconSettings, IconSettings2, IconUsersGroup } from '@tabler/icons-react';

export interface IMenuData {
    isHeader?: boolean;
    title: string;
    icon?: React.ElementType;
    path?: string;
    children?: IMenuData[];
}

const menuData: IMenuData[] = [
    { icon: IconLayoutDashboard, title: 'overview', path: '/' },
    { icon: IconCalendar, title: 'bookings', path: '/bookings' },
    { icon: IconHome, title: 'properties', path: '/properties' },
    { icon: IconDashboard, title: 'statistics', path: '/statistics' },
    {
        isHeader: true,
        title: 'settings',
        icon: IconSettings2,
        children: [
            { icon: IconSettings, title: 'settings-general', path: '/settings/general'},
            { icon: IconUsersGroup, title: 'settings-members', path: '/settings/members'},
            { icon: IconLock, title: 'settings-roles', path: '/settings/roles'},
        ],
    },
];

export default menuData;
