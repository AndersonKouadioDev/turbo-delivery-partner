import React from 'react';
import { PackageX } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
}

export default function EmptyDataTable({
    title = 'Aucune donnée',
    message = 'Aucune donnée à afficher pour le moment.',
    icon: Icon = <PackageX className="w-12 h-12 text-gray-400" />,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            {Icon}
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">{message}</p>
        </div>
    );
}
