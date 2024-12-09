'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { signOut } from '@/src/actions/users.actions';
import { Restaurant } from '@/types/models';
import { title } from '../primitives';
import { Avatar } from '@nextui-org/react';
import createUrlFile from '@/utils/createUrlFile';

export const DashboardUserDropdown = ({ restaurant }: { restaurant: Restaurant | null }) => {
    console.log(restaurant)
    return (
        <div className="flex items-center gap-2">
            <span className={title({ size: 'h4', class: 'uppercase' })}>{restaurant?.nomEtablissement ?? ''}</span>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <Avatar size="sm" src={createUrlFile(restaurant?.logo ?? '', 'restaurant') ?? ''} alt="Logo Restaurant" />
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={async () => {
                            await signOut();
                        }}
                    >
                        Déconnexion
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
