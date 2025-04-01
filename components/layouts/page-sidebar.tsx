import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@heroui/react";
import Link from 'next/link';
import { title } from '@/components/primitives';

interface PageSidebarProps {
    items: {
        id: string;
        title: string;
    }[];
    selectedItemId: string;
    onItemSelect: (itemId: string) => void;
    className?: string;
}

export function PageSidebar({ items, selectedItemId, onItemSelect, className }: PageSidebarProps) {
    const ModulesList = () => (
        <div className="space-y-1">
            {items.map((item) => (
                <Button
                    key={item.id}
                    as={Link}
                    href={`#${item.id}`}
                    variant={selectedItemId === item.id ? 'bordered' : 'light'}
                    className={`w-full justify-start ${selectedItemId === item.id ? 'text-primary' : ''}`}
                    onClick={() => onItemSelect(item.id)}
                >
                    {item.title}
                </Button>
            ))}
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className={cn('hidden md:block w-64 shrink-0', className)}>
                <h2 className={title({ size: 'h4', className: 'text-primary' })}>Menu</h2>
                <div className="mt-8 h-[calc(100%-6rem)] overflow-y-auto pb-6">
                    <ModulesList />
                </div>
            </div>
        </>
    );
}
