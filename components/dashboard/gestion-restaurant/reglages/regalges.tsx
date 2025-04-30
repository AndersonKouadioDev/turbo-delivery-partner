"use client"
import { Button, Modal, ModalBody, ModalContent } from '@heroui/react';
import { Tabs, TabsContent, TabsList, TabsReglageTrigger, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import { FindOneRestaurant } from '@/types/models';
import Image from 'next/image';
import { CardHeader } from '@/components/commons/card-header';
import DetailRestaurants from '../detail-restaurant/detail-restaurants';

interface ReglageLayoutProps {
    isOpen: boolean;
    onClose: () => void;
    restaurant: FindOneRestaurant | null | undefined

}

export default function ReglageContent({ isOpen, onClose, restaurant }: ReglageLayoutProps) {
    return (
        <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()} backdrop="opaque"
            isDismissable={false}
            hideCloseButton={false}
            size="full">
            <ModalContent>
                <>
                    <div className="flex  justify-between  items-center border-b dark:border-muted px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Image
                                alt="logo lunion-booking"
                                src={'/assets/images/logo.png'}
                                width={40} height={40} className='rounded-full'
                            />
                            <span className="text-md lg:text-4xl xl:text-4xl font-bold text-primary">Turbo Delivery</span>
                        </Link>
                        <div className='mr-5'>
                            {restaurant &&
                                <div className='flex gap-2'>
                                    <Image
                                        alt="logo lunion-booking"
                                        src={'/assets/images/logo.png'}
                                        width={40} height={40} className='rounded-full'
                                    />
                                    <span className="text-md lg:text-4xl xl:text-4xl font-bold text-primary">{restaurant.restaurant.nomEtablissement}</span>
                                </div>}
                        </div>
                    </div>
                    <ModalBody>
                        <div className='max-h-[700px] overflow-auto'>
                            <div className=' mt-4 lg:mt-0 xl:mt-0 flex justify-start mb-4'>
                                <Link href={"/"} className='flex items-center'><ChevronLeft className="mr-2" size={18} />  Retour a l'accueil</Link>
                            </div>
                            <div className="flex flex-col">
                                <div className='contain-none lg:contain xl:container lg:pl-20 xl:pl-20 mb-5'>
                                    <div className='flex items-center justify-between'>
                                        <CardHeader title='Réglages' />
                                        <Button className='h-10 text-white bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 transition'><Save className='mr-2' size={18} />Enregistrer</Button>
                                    </div>
                                </div>
                                <Tabs defaultValue="detailRestaurant" className="flex-wrap lg:flex xl:flex w-full gap-6">
                                    <TabsList className="flex flex-col w-48 items-start mt-20 mb-10 lg:mt-0 xl:mt-0 lg:mb-0 xl:mb-0">
                                        <TabsReglageTrigger value="detailRestaurant" className="w-full justify-start">Détail du restaurant</TabsReglageTrigger>
                                        <TabsReglageTrigger value="impotTaux" className="w-full justify-start">Impôts et taux</TabsReglageTrigger>
                                        <TabsReglageTrigger value="notification" className="w-full justify-start">Notification</TabsReglageTrigger>
                                        <TabsReglageTrigger value="teamAdaministration" className="w-full justify-start">Teams et autorisations</TabsReglageTrigger>
                                        <TabsReglageTrigger value="securite" className="w-full justify-start">Securités</TabsReglageTrigger>
                                    </TabsList>
                                    <div className="flex-1">
                                        <TabsContent value="detailRestaurant">
                                            <DetailRestaurants />
                                        </TabsContent>
                                        <TabsContent value="impotTaux">
                                            <CardContent className="space-y-2">
                                                Interface de d'impôt et taux (A implémenté)
                                            </CardContent>
                                        </TabsContent>
                                        <TabsContent value="notification">
                                            <CardContent className="space-y-2">
                                                Interface de notification (A implémenté)
                                            </CardContent>
                                        </TabsContent>
                                        <TabsContent value="teamAdaministration">
                                            <CardContent className="space-y-2">
                                                Interface de team et autorisations (A implémenté)
                                            </CardContent>
                                        </TabsContent>
                                        <TabsContent value="securite">
                                            <CardContent className="space-y-2">
                                                Interface de securité (A implémenté)
                                            </CardContent>
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    );
}
