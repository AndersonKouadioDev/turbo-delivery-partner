'use client';

import { CardHeader } from '@/components/commons/card-header';
import { PageWrapper } from '@/components/commons/page-wrapper';
import IconInfoCircle from '@/components/icon/icon-info-circle';
import { Card } from '@/components/ui/card';
import { NotificationVM } from '@/types/notifcation.model';
import { Button, Divider, DropdownItem, DropdownMenu, DropdownTrigger, Dropdown } from "@heroui/react";
import Link from 'next/link';
import { useNotificationController } from './controller';
import EmptyDataTable from '@/components/commons/EmptyDataTable';

export function NotificationContent({ initalNotification }: { initalNotification: NotificationVM[] }) {
    // const { notifications, notificationFilter } = useNotificationController({ initalNotification, utilisateurId });

    return (
        <PageWrapper>
            <CardHeader title="Liste des notifications" />
            <Card className="overflow-auto lg:overflow-hidden xl:overflow-hidden md:overflow-hidden w-full">
                {initalNotification.length > 0 ? (
                    <>
                        {initalNotification.map((notification) => {
                            return (
                                <div key={notification.id} className="p-2">
                                    <div className="dark:text-white-light/90 p-2 w-full hover:bg-primary/10 mt-5">
                                        <div className="group flex items-center px-4 py-2 flex-wrap">
                                            <div className="grid place-content-center rounded">
                                                <div className="h-12 w-12 rounded-full flex items-center">
                                                    <img className="h-12 w-12 rounded-full object-cover ml-2" alt="profile" src={`/assets/images/avatar.png`} />
                                                </div>
                                            </div>
                                            <div className="flex w-full justify-between ltr:pl-3 rtl:pr-3 ml-2 flex-wrap sm:flex-nowrap">
                                                <div className="ltr:pr-3 rtl:pl-3 flex-1">
                                                    <h6 className="font-bold">{notification.titre}</h6>
                                                    {notification.message && <p className={`${!notification.lu && 'font-semibold'}`}>{notification.message}</p>}
                                                    {!notification.lu && (
                                                        <div className="flex justify-between items-center mt-2">
                                                            <Button className="h-8 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-500">
                                                                <Link href={notification.lien ? notification.lien : '#'}>
                                                                    {notification.type
                                                                        ?.toString()
                                                                        .toLocaleLowerCase()
                                                                        .replace(/_/g, ' ')
                                                                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-col gap-0 items-center sm:items-end mt-4 lg:mt-0 md:mt-0 nxl:mt-0">
                                                    <span className="block text-xs font-normal dark:text-gray-500 lg:pb-8 md:pb-8 nxl:pb-8">{notification.tempsPasse}</span>
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button variant="bordered" className="border-none text-2xl">
                                                                ...
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu aria-label="Static Actions">
                                                            <DropdownItem key="new">
                                                                <Link href={'/notification/' + notification.id} className="text-blue-500 cursor-pointer hover:text-blue-800 p-1">
                                                                    Voir detail
                                                                </Link>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider className="m-2" />
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <div className="text-center py-6 text-primary font-bold mt-10 text-xl">
                        <EmptyDataTable title='Aucun Resultat' />
                    </div>
                )}
            </Card>
        </PageWrapper>
    );
}
