'use client';

import { useState } from 'react';
import { title } from '@/components/primitives';
import { Image, CircularProgress, Button, Chip } from "@heroui/react";
import { Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { Clock, Pizza, ChevronRight, Star } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { categories, foodItems, bestSellers, orders } from '@/data';
import { FindOneRestaurant } from '@/types/models';
import Link from 'next/link';

export default function Content({ restaurant }: { restaurant: FindOneRestaurant | null }) {

    return (
        <div className="w-full h-full flex flex-1 flex-col gap-4 lg:gap-6 mb-10">
            <div className='flex-col gap-2 items-center justify-center text-center'>
                <div className='flex justify-center text-center items-center'>
                    <div className='flex flex-col'>
                        <Image alt="logo lunion-booking" height={45} src={'/assets/images/logo.png'} width={45} className=' rounded-full' />
                        <span className='mt-2'>Bonjour,</span>
                    </div>
                </div>
                {
                    (restaurant && restaurant?.restaurant) && restaurant?.restaurant?.nomEtablissement ?
                        <p className='text-2xl font-bold text-gray-500'>{(restaurant && restaurant?.restaurant) && restaurant?.restaurant?.nomEtablissement}</p>
                        :
                        ''
                }

            </div>
            <div className='flex justify-center'>
                <div className='max-w-sm  lg:max-w-3xl md:max-w-3xl xl:max-w-3xl text-center text-gray-500'>
                    Le logiciel <span className='text-primary text-md'>Turbo for partner</span> est un système de gestion de restaurantn performant,
                    regroupant des fonctionnalités de haut gamme dans une seule application.
                    Il regroupe toutes les fonctionnalites nécessaires: commandes, facturation, ventes, stocks, personnel, gestion comptable.
                </div>
            </div>
            <div>
                <div className='flex justify-between'>
                    <span className='text-gray-500 ' style={{ fontSize: 10 }}>Restaurant</span>
                    <Link href={"/gestion-restaurant"} className='text-gray-500 font-bold'>Tout voir</Link>
                </div>
                <div className='flex gap-4 w-full'>
                    {
                        (restaurant && restaurant?.restaurant) && restaurant?.restaurant?.nomEtablissement ?
                            (["0", "1"] as any).map((item: any, index: number) => (
                                <div className='flex w-full justify-between border rounded-lg  border-green-400 items-center p-3  max-w-sm' key={index}>
                                    <div className='flex gap-2  mt-2items-center'>
                                        <Image alt="logo lunion-booking" height={25} src={'/assets/images/logo.png'} width={25} className='rounded-full' />
                                        {
                                            <p className='text-sm font-bold text-gray-500'>
                                                {(restaurant && restaurant?.restaurant) && restaurant?.restaurant?.nomEtablissement + " " + item}</p>
                                        }
                                    </div>
                                    <Chip className='mr-2 bg-green-200 text-green-700 text-sm' style={{ fontSize: 10 }}>Actif</Chip>
                                </div>
                            ))
                            : ""
                    }
                </div>
            </div>

            <div className='flex flex-wrap md:flex  lg:flex lg:flex-nowrap  xl:flex gap-4 xl:flex-nowrap '>
                <Card className="w-full  lg:w-1/2 xl:w-1/2 col-span-12 lg:col-span-8 2xl:col-span-7" shadow="sm">
                    <CardBody>
                        <Collection />
                    </CardBody>
                </Card>
                <Card className='w-full  lg:w-1/2 xl:w-1/2'>
                    <CardBody>
                        <Orders />
                    </CardBody>
                </Card>
            </div>

            {/* <div className="flex items-center">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Accueil</h1>
            </div>
            <div className="grid grid-cols-12 gap-6 lg:gap-4 justify-center">
                <Card className="w-full col-span-12 lg:col-span-8 2xl:col-span-7" shadow="sm">
                    <CardBody>
                        <Collection />
                    </CardBody>
                </Card>
                <Card className="w-full col-span-12 lg:col-span-4 2xl:col-span-5" shadow="sm">
                    <CardBody>
                        <CollectionMoreSell />
                    </CardBody>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:gap-4 ">
                <Card className="w-full col-span-12 lg:col-span-8 2xl:col-span-7" shadow="sm">
                    <CardBody>
                        <Orders />
                    </CardBody>
                </Card>
            </div> */}
        </div>
    );
}

export function Collection() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <div className="w-full h-full p-0 md:p-4 lg:p-4 xl:p-4 space-y-6">
            <ScrollArea className="w-full whitespace-nowrap pb-2">
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        className="flex-shrink-0 mx-0 lg:mx-2 md:mx-2 xl:mx-2"
                        variant={selectedCategory === category.id ? 'solid' : 'flat'}
                        color={selectedCategory === category.id ? 'primary' : 'default'}
                        onPress={() => setSelectedCategory(category.id)}
                        size="sm"
                    >
                        {category.name}
                    </Button>
                ))}
                <ScrollBar orientation="horizontal" className="h-0" />
            </ScrollArea>

            <div className="grid grid-cols-1 gap-4">
                {foodItems.map((item, index) => (
                    <CardContent key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

// export function Collectionx() {
//     const [selectedCategory, setSelectedCategory] = useState('all');

//     return (
//         <div className="w-full h-full p-4 space-y-6">
//             <ScrollArea className="w-full whitespace-nowrap pb-2">
//                 {categories.map((category) => (
//                     <Button
//                         key={category.id}
//                         className="flex-shrink-0 mx-2"
//                         variant={selectedCategory === category.id ? 'solid' : 'flat'}
//                         color={selectedCategory === category.id ? 'primary' : 'default'}
//                         onPress={() => setSelectedCategory(category.id)}
//                         size="sm"
//                     >
//                         {category.name}
//                     </Button>
//                 ))}
//                 <ScrollBar orientation="horizontal" className="h-0" />
//             </ScrollArea>

//             <div className="grid grid-cols-1 gap-4">
//                 {foodItems.map((item, index) => (
//                     <CardContent key={index} {...item} />
//                 ))}
//             </div>
//         </div>
//     );
// }
export function CollectionMoreSell() {
    return (
        <div className="w-full h-full p-4 space-y-6">
            <h2 className={title({ size: 'h4', class: 'text-primary' })}>Les plus vendus</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
                {bestSellers.map((item, index) => (
                    <CardMore key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

export function Orders() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    return (
        <div className="w-full h-full p-4 space-y-6">
            <h2 className={title({ size: 'h6', class: 'text-primary mb-4' })}>Un clin d&apos;œil sur les commandes</h2>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        className="flex-shrink-0 mx-0 lg:mx-2 md:mx-2 xl:mx-2"
                        variant={selectedCategory === category.id ? 'solid' : 'flat'}
                        color={selectedCategory === category.id ? 'primary' : 'default'}
                        onPress={() => setSelectedCategory(category.id)}
                        size="sm"
                    >
                        {category.name}
                    </Button>
                ))}
                <ScrollBar orientation="horizontal" className="h-0" />
            </ScrollArea>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start md:justify-start xl:justify-start">
                {orders.map((order) => (
                    <OrderCard key={order.id} {...order} />
                ))}
            </div>
        </div>
    );
}

// export function Ordersx() {
//     return (
//         <div className="w-full h-full p-4 space-y-6">
//             <h2 className={title({ size: 'h4', class: 'text-primary mb-4' })}>Un clin d&apos;œil sur les commandes</h2>
//             <ScrollArea className="w-full whitespace-nowrap pb-2">
//                 {['#218099', '#215568', '#216987', '#217965', '#21200'].map((orderId: string, index: number) => (
//                     <Button size="sm" key={orderId} className="flex-shrink-0 rounded-full mx-2" color={index % 2 === 0 ? 'success' : 'primary'}>
//                         {orderId}
//                     </Button>
//                 ))}
//                 <ScrollBar orientation="horizontal" className="h-0" />
//             </ScrollArea>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
//                 {orders.map((order) => (
//                     <OrderCard key={order.id} {...order} />
//                 ))}
//             </div>
//         </div>
//     );
// }


export function CardContent({ name, image, recipes, progress }: { name: string; image: string; recipes: number; progress: number }) {
    return (
        <Card className="w-full p-4" shadow="sm">
            <CardBody>
                <div className="flex items-center gap-4">
                    <Image alt={name} className="object-cover w-24 h-16 rounded-xl" src={image} />
                    <div className="flex-1">
                        <div className="text-lg font-[900]">{name}</div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Pizza className="w-3 h-3 text-gray-500" />
                            <p className="text-sm text-gray-500">{recipes} recettes</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <CircularProgress
                            classNames={{
                                svg: 'w-16 h-16 md:w-16 md:h-16 drop-shadow-md',
                                indicator: 'stroke-primary',
                                track: 'stroke-secondary/50',
                                value: 'text-xl md:text-sm font-semibold',
                            }}
                            value={progress}
                            strokeWidth={2}
                            showValueLabel={true}
                        />
                        {/* <ChevronRight className="text-gray-400" /> */}
                    </div>
                </div>
                <Progress
                    value={progress}
                    color="primary"
                    classNames={{
                        base: 'w-full mt-4 sm:hidden',
                        indicator: 'bg-primary',
                        track: 'bg-secondary/50'
                    }}
                    showValueLabel={true}
                />
            </CardBody>
        </Card>
    );
}

// export function CardContentx({ name, image, recipes, progress }: { name: string; image: string; recipes: number; progress: number }) {
//     return (
//         <Card className="w-full" shadow="sm">
//             <CardBody>
//                 <div className="flex items-center gap-4">
//                     <Image alt={name} className="object-cover w-24 h-24 rounded-lg" src={image} />
//                     <div className="flex-1">
//                         <h3 className={title({ size: 'h4' })}>{name}</h3>
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                             <Pizza className="w-5 h-5 text-gray-500" />
//                             <p className="text-sm text-gray-500">{recipes} recettes</p>
//                         </div>
//                     </div>
//                     <div className="hidden sm:flex items-center gap-2">
//                         <CircularProgress
//                             classNames={{
//                                 svg: 'w-28 h-28 md:w-36 md:h-36 drop-shadow-md',
//                                 indicator: 'stroke-primary',
//                                 track: 'stroke-secondary/50',
//                                 value: 'text-xl md:text-2xl font-semibold',
//                             }}
//                             value={progress}
//                             strokeWidth={4}
//                             showValueLabel={true}
//                         />
//                         <ChevronRight className="text-gray-400" />
//                     </div>
//                 </div>
//                 <Progress
//                     value={progress}
//                     color="primary"
//                     classNames={{
//                         base: 'w-full mt-4 sm:hidden',
//                         indicator: 'bg-primary',
//                         track: 'bg-secondary/50',
//                     }}
//                     showValueLabel={true}
//                 />
//             </CardBody>
//         </Card>
//     );
// }

export function CardMore({ name, image, description, time, rating }: { name: string; image: string; description: string; time: string; rating: number }) {
    return (
        <Card className="w-full" shadow="sm">
            <CardBody className="p-0">
                <Image alt={name} className="object-cover w-full h-48" width="100%" src={image} />
            </CardBody>
            <CardHeader className="flex-col items-start p-4">
                <h4 className="text-lg font-bold">{name}</h4>
                <p className="text-sm text-gray-500">{description}</p>
                <div className="flex justify-between items-center w-full mt-2">
                    <div className="flex items-center gap-1 text-primary">
                        <Clock className="w-4 h-4" />
                        <p className="text-sm">{time}</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                        <Star className="w-4 h-4" />
                        <p className="text-sm">{rating}</p>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}

export function OrderCard({ id, name, avatar, items, status, count }: { id: string; name: string; avatar: string; items: any[]; status: string; count: number }) {
    return (
        <Card className="w-ful bg-muted" shadow="sm">
            <CardBody>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h4 className="text-sm font-bold">Check Order #{id}</h4>
                        <p className="text-sm text-gray-500">{name}</p>
                    </div>
                    <div className="w-8 h-8 text-xs bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">{avatar}</div>
                </div>
                <div className="flex gap-4 mb-4">
                    {items.map((item, index) => (
                        <div key={index} className="text-center">
                            <Image alt={item.name} className="object-cover w-12 h-12 rounded-lg mb-1" src={item.image} />
                            <p className="text-xs">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.price}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        {count} article{count > 1 ? 's' : ''} en cours
                    </p>
                    <Button color={status === 'En cours' ? 'secondary' : 'success'} size="sm">
                        {status}
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}

// export function OrderCardx({ id, name, avatar, items, status, count }: { id: string; name: string; avatar: string; items: any[]; status: string; count: number }) {
//     return (
//         <Card className="w-ful bg-muted" shadow="sm">
//             <CardBody>
//                 <div className="flex justify-between items-center mb-4">
//                     <div>
//                         <h4 className="text-lg font-bold">Check Order #{id}</h4>
//                         <p className="text-sm text-gray-500">{name}</p>
//                     </div>
//                     <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">{avatar}</div>
//                 </div>
//                 <div className="flex gap-4 mb-4">
//                     {items.map((item, index) => (
//                         <div key={index} className="text-center">
//                             <Image alt={item.name} className="object-cover w-16 h-16 rounded-lg mb-1" src={item.image} />
//                             <p className="text-xs">{item.name}</p>
//                             <p className="text-xs text-gray-500">{item.price}</p>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex justify-between items-center">
//                     <p className="text-sm text-gray-500">
//                         {count} article{count > 1 ? 's' : ''} en cours
//                     </p>
//                     <Button color={status === 'En cours' ? 'secondary' : 'success'} size="sm">
//                         {status}
//                     </Button>
//                 </div>
//             </CardBody>
//         </Card>
//     );
// }
