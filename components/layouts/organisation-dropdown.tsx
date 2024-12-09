'use client';

import React, { useState } from 'react';
import { Avatar, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { IconCheck, IconChevronDown, IconList, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { ProfileOrganisations } from '@/types/index.d';

export const OrganisationDropdown = ({ reference, profileOrganisations }: { reference: string; profileOrganisations: ProfileOrganisations | null }) => {
    const [cuurentTeam, setCurrentTeam] = useState<string>(reference);

    const selectedOrganisation = (profileOrganisations?.organisations.find((team) => team.reference === cuurentTeam) ??
        profileOrganisations?.shared_organisations.find((team) => team.reference === cuurentTeam)) as unknown as any;

    const handleChangeTeam = (team: string) => {
        setCurrentTeam(team);
        window.location.href = `/workspaces/${team}`;
    };

    if (!profileOrganisations) return <></>;

    return (
        <Dropdown className="w-fit max-w-xs">
            <DropdownTrigger>
                <div className="w-fit flex items-center cursor-pointer justify-start gap-2">
                    <div className="flex items-center gap-2 max-w-fit">
                        <Avatar
                            showFallback
                            as="button"
                            className="transition-transform shrink-0"
                            name={
                                selectedOrganisation?.name
                                    .split(' ')[0]
                                    ?.slice(0, selectedOrganisation?.name.split(' ').length > 1 ? 1 : 2)
                                    ?.toUpperCase() + (selectedOrganisation?.name.split(' ').length > 1 ? selectedOrganisation?.name.split(' ')[1]?.slice(0, 1)?.toUpperCase() : '')
                            }
                            size="sm"
                            src={selectedOrganisation?.logo ?? ''}
                        />
                        <span className="text-xs sm:text-sm text-primary">{selectedOrganisation?.name}</span>
                    </div>
                    <IconChevronDown className="ml-auto h-4 w-4" />
                </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
                <DropdownSection title={profileOrganisations?.organisations?.length > 0 ? `Mes organisations (${profileOrganisations?.organisations?.length})` : ''}>
                    {profileOrganisations?.organisations?.slice(0, 2)?.map((team) => (
                        <DropdownItem key={team.name} variant="light" onClick={() => handleChangeTeam(team.reference)}>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <Avatar
                                        showFallback
                                        alt={team.name}
                                        name={
                                            team?.name
                                                .split(' ')[0]
                                                ?.slice(0, team?.name.split(' ').length > 1 ? 1 : 2)
                                                ?.toUpperCase() + (team?.name.split(' ').length > 1 ? team?.name.split(' ')[1]?.slice(0, 1)?.toUpperCase() : '')
                                        }
                                        size="sm"
                                        src={team.logo ?? ''}
                                        className="shrink-0"
                                    />
                                    <div className="ml-2">
                                       <p> {team.name + ' '}</p>
                                        <p className="text-gray-400">#{team.reference}</p>

                                        <Chip color="primary" size="sm">
                                            {team?.role}
                                        </Chip>
                                    </div>
                                </div>
                                {team.reference === cuurentTeam && <IconCheck className="ml-2 text-primary" size={16} />}
                            </div>
                        </DropdownItem>
                    ))}
                </DropdownSection>
                <DropdownSection title={profileOrganisations?.shared_organisations?.length > 0 ? `Mes organisations partagées (${profileOrganisations?.shared_organisations?.length})` : ''}>
                    {profileOrganisations?.shared_organisations?.slice(0, 2)?.map((team) => (
                        <DropdownItem key={team.name} variant="light" onClick={() => handleChangeTeam(team.reference)}>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    <Avatar
                                        showFallback
                                        alt={team.name}
                                        name={
                                            team?.name
                                                .split(' ')[0]
                                                ?.slice(0, team?.name.split(' ').length > 1 ? 1 : 2)
                                                ?.toUpperCase() + (team?.name.split(' ').length > 1 ? team?.name.split(' ')[1]?.slice(0, 1)?.toUpperCase() : '')
                                        }
                                        size="sm"
                                        src={team.logo ?? ''}
                                        className="shrink-0"
                                    />
                                   <div className="ml-2">
                                       <p> {team.name + ' '}</p>
                                        <p className="text-gray-400">#{team.reference}</p>

                                        <Chip color="primary" size="sm">
                                            {team?.role}
                                        </Chip>
                                    </div>
                                </div>
                                {team.reference === cuurentTeam && <IconCheck className="ml-2 text-primary" size={16} />}
                            </div>
                        </DropdownItem>
                    ))}
                </DropdownSection>
                <DropdownSection>
                    <DropdownItem key="add-team" showDivider as={Link} href="/workspaces/create_team" startContent={<IconPlus size={16} />} variant="light">
                        Nouvelle organisation
                    </DropdownItem>
                    <DropdownItem key="teams" as={Link} href="/workspaces" startContent={<IconList size={16} />} variant="light">
                        Afficher toutes les organisations
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};
