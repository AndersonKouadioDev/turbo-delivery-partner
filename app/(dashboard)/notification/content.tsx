'use client';

import { CardHeader } from '@/components/commons/card-header';
import { PageWrapper } from '@/components/commons/page-wrapper';
import { NotificationVM } from '@/types/notifcation.model';
import { Card, Button, DropdownItem, DropdownMenu, DropdownTrigger, Dropdown, CardBody } from '@heroui/react';
import Link from 'next/link';
import EmptyDataTable from '@/components/commons/EmptyDataTable';
import { Bell } from 'lucide-react';

export function NotificationContent({ initalNotification }: { initalNotification: NotificationVM[] }) {
    // const { notifications, notificationFilter } = useNotificationController({ initalNotification, utilisateurId });

    return (
        <PageWrapper>
            <CardHeader title="Liste des notifications" />
            <div className="overflow-auto lg:overflow-hidden xl:overflow-hidden md:overflow-hidden w-full">
                {initalNotification.length > 0 ? (
                    <>
                        {initalNotification.map((notification) => {
                            return (
                                <Card key={notification.id} className="mt-2">
                                    <CardBody className="dark:text-white-light/90 p-2 w-full hover:bg-primary/10 card">
                                        <div className=" flex items-center px-4 py-2">
                                            <div className="flex w-full justify-between  ml-2 flex-wrap sm:flex-nowrap">
                                                <div className="h-12 w-12 rounded-full mr-5">
                                                    <Bell />
                                                </div>

                                                <div className="ltr:pr-3 rtl:pl-3 flex-1">
                                                    <h6 className="font-bold">{notification.titre}</h6>
                                                    {notification.message && <p className={`${!notification.lu && "font-semibold"}`}>{notification.message}</p>}
                                                    {notification.lien && (
                                                        <div className="flex justify-between items-center mt-2">
                                                            <Button className="h-8 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-500">

                                                                <Link href={notification.lien}>
                                                                    {notification.type
                                                                        ?.toString()
                                                                        .toLocaleLowerCase()
                                                                        .replace(/_/g, " ")
                                                                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                                                                </Link>

                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-col gap-0 items-center sm:items-end mt-0 lg:mt-0 md:mt-0 nxl:mt-0">
                                                    <span className="block text-xs font-normal dark:text-gray-500 lg:pb-8 md:pb-8 nxl:pb-8">{notification.tempsPasse}</span>
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button variant="bordered" className="border-none text-2xl">...</Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu aria-label="Static Actions">
                                                            <DropdownItem key="new">
                                                                <Link href={"/notification/" + notification.id} className="text-blue-500 cursor-pointer hover:text-blue-800 p-1">Voir detail</Link>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </>
                ) : (
                    <div className="text-center py-6 text-primary font-bold mt-10 text-xl">
                        <EmptyDataTable title='Aucun Resultat' />
                    </div>
                )}
            </div>
        </PageWrapper>
    );
}
