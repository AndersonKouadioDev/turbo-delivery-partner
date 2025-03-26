'use client';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Dropdown from '@/components/dropdown';
import IconInfoCircle from '@/components/icon/icon-info-circle';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NotificationVM } from '@/types/notifcation.model';
import EmptyDataTable from '@/components/commons/EmptyDataTable';

const Content = ({ className, notifications, notificationNonLus, voirTout, toutMarqueCommeLus, isConnected, voirMoins }: {
    className?: string,
    notifications: NotificationVM[],
    notificationNonLus: NotificationVM[];
    voirTout: () => void,
    toutMarqueCommeLus: () => void,
    voirMoins: boolean
    isConnected: boolean;
}) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    return (
        <div className={`dropdown shrink-0 ${className}`}>
            <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40  hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                    <span>
                        <Bell />
                        <span className="absolute top-0 flex h-3 w-3 ltr:right-0 rtl:left-0">
                            <span className="absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 ltr:-left-[3px] rtl:-right-[3px]"></span>
                            <span className={`relative inline-flex h-[6px] w-[6px] rounded-full bg-success p-1`}>
                                <span className=' rounded-full text-red-500 font-bold'> {notificationNonLus.length > 0 && notificationNonLus.length}</span>
                            </span>
                        </span>
                    </span>
                }
            >
                <ul className="lg:w-[600px] xl:w-[600px] divide-y !py-0 text-dark dark:divide-white/10 dark:text-white-dark sm:w-[350px] !shadow-xl">
                    <li onClick={(e) => e.stopPropagation()}>
                        <div className="flex-wrap lg:flex xl:flex items-center justify-between px-4 py-2 font-semibold">
                            <h4 className="text-lg text-red-500 font-bold">Notification</h4>
                            <span className='text-gray-500 cursor-pointer hover:text-gray-800' onClick={toutMarqueCommeLus}>Tous marquer comme lus</span>
                        </div>
                    </li>
                    <li className='mt-5 border-none'> <span className='border-b-3 border-b-red-500 mb-5 font-bold pb-1 ml-5 '>Tous 1</span></li>
                    {notifications.length > 0 ? (
                        <>
                            {notifications.map((notification) => {
                                return (
                                    <div key={notification.id}>
                                        <li className="dark:text-white-light/90 p-2 w-full  hover:bg-primary/10 mt-5">
                                            <div className=" flex items-center px-4 py-2" >
                                                <div className="grid place-content-center rounded">
                                                    <div className=" h-12 w-12 rounded-full flex items-center">
                                                        <span className={`absolute  block h-2 w-2 rounded-full ${isConnected ? "bg-success" : " bg-red-500"}`}></span>
                                                        <img className="h-12 w-12 rounded-full object-cover ml-2" alt="profile" src={`/assets/images/avatar.png`} />
                                                    </div>
                                                </div>
                                                <div className="flex w-full  justify-between ltr:pl-3 rtl:pr-3 ml-2">
                                                    <div className="ltr:pr-3 rtl:pl-3">
                                                        <h6 className={`${"font-bold"}`}>{notification.titre}</h6>
                                                        {notification.message && <p className={`${!notification.lu && "font-semibold"}`}>{notification.message}</p>}
                                                        {
                                                            !notification.lu &&
                                                            <div className='flex justify-between items-center'>
                                                                <Button className='h-8 mt-2 mb-2 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-500'>
                                                                    <Link href={notification.lien ? notification.lien : "#"}>
                                                                        {notification.type?.toString()
                                                                            .toLocaleLowerCase()
                                                                            .replace(/_/g, " ")
                                                                            .replace(/\b\w/g, char => char.toUpperCase())}</Link>
                                                                </Button>
                                                            </div>
                                                        }
                                                    </div>

                                                    <div className='flex-col gap-0 items-center'>
                                                        <span className="block text-xs font-normal dark:text-gray-500 pb-8">{notification.tempsPasse}</span>
                                                        <Link href={"/notification/" + notification.id} className='text-blue-500 cursor-pointer hover:text-blue-800'>detail</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                );
                            })}
                            <Link href={"/notification"}>
                                <div className="p-4 text-center">
                                    <span className=" font-bold text-md text-primary  w-full pl-2 pr-2 p-1 rounded-full cursor-pointer hover:bg-primary/30"
                                    >Voir tous</span>

                                </div></Link>

                        </>
                    ) : (
                        <div className="text-center py-6 text-primary font-bold mt-10 text-xl">
                            <EmptyDataTable title='Aucun Resultat' />
                        </div>
                    )}
                </ul>
            </Dropdown>
        </div>
    );
};

export default Content;
