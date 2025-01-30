'use client';

import IconX from '@/components/icon/icon-x';
import { CourseExterne, Restaurant } from '@/types/models';
import { Transition, Dialog, TransitionChild, DialogPanel } from '@headlessui/react';
import React, { Fragment } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const DeliveryQRCode = ({ restaurant, delivery, open, setOpen }: { 
    restaurant: Restaurant; 
    delivery: CourseExterne; 
    open: boolean; 
    setOpen: (open: boolean) => void 
}) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" open={open} onClose={() => setOpen(false)} className="relative z-50">
                <TransitionChild 
                    as={Fragment} 
                    enter="ease-out duration-300" 
                    enterFrom="opacity-0" 
                    enterTo="opacity-100" 
                    leave="ease-in duration-200" 
                    leaveFrom="opacity-100" 
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[black]/60" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                >
                                    <IconX />
                                </button>
                                <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c] text-primary">
                                    Code QR du code de la course
                                </div>
                                <div className="flex flex-col items-center gap-6 p-8">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <QRCodeSVG 
                                            value={delivery.id}
                                            size={200}
                                            level="H"
                                            includeMargin={true}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-medium mb-2">Code de la course: {delivery.code}</p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Restaurant: {restaurant.nomEtablissement}
                                        </p>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary mt-4"
                                        onClick={() => setOpen(false)}
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DeliveryQRCode;