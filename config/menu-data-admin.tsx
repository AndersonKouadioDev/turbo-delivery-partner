'use client';
import { IconHome, IconLayoutDashboard, IconSettings } from '@tabler/icons-react';
import { TbDatabaseDollar, TbLayout } from 'react-icons/tb';

export interface IMenuDataAdmin {
    isHeader?: boolean;
    title: string;
    icon?: React.ElementType;
    path?: string;
    children?: IMenuDataAdmin[];
}

const menuDataAdmin: IMenuDataAdmin[] = [
    { icon: IconLayoutDashboard, title: 'overview', path: '/' },
    { icon: IconHome, title: 'properties', path: '/properties' },
    {
        isHeader: true,
        title: 'configuration',
        icon: IconSettings,
        children: [
            { icon: TbDatabaseDollar, title: 'plan', path: '/plans' },
            { icon: TbLayout, title: 'modules', path: '/modules' },
        ],
    },
];

export default menuDataAdmin;
