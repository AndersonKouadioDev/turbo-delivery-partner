'use client';

import { useState } from 'react';
import { title } from '@/components/primitives';
import { Image, CircularProgress, Button } from '@nextui-org/react';
import { Card, CardBody, CardHeader, Progress } from '@nextui-org/react';
import { Clock, Pizza, ChevronRight, Star } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { categories, foodItems, bestSellers, orders } from '@/data';

export default function Content() {
    return (
        <div className="w-full h-full flex flex-1 flex-col gap-4 lg:gap-6 mb-10">
            <div className="flex items-center">
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
            </div>
        </div>
    );
}

export function Collection() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <div className="w-full h-full p-4 space-y-6">
            <ScrollArea className="w-full whitespace-nowrap pb-2">
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        className="flex-shrink-0 mx-2"
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
    return (
        <div className="w-full h-full p-4 space-y-6">
            <h2 className={title({ size: 'h4', class: 'text-primary mb-4' })}>Un clin d&apos;œil sur les commandes</h2>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
                {['#218099', '#215568', '#216987', '#217965', '#21200'].map((orderId: string, index: number) => (
                    <Button size="sm" key={orderId} className="flex-shrink-0 rounded-full mx-2" color={index % 2 === 0 ? 'success' : 'primary'}>
                        {orderId}
                    </Button>
                ))}
                <ScrollBar orientation="horizontal" className="h-0" />
            </ScrollArea>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {orders.map((order) => (
                    <OrderCard key={order.id} {...order} />
                ))}
            </div>
        </div>
    );
}

export function CardContent({ name, image, recipes, progress }: { name: string; image: string; recipes: number; progress: number }) {
    return (
        <Card className="w-full" shadow="sm">
            <CardBody>
                <div className="flex items-center gap-4">
                    <Image alt={name} className="object-cover w-24 h-24 rounded-lg" src={image} />
                    <div className="flex-1">
                        <h3 className={title({ size: 'h4' })}>{name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Pizza className="w-5 h-5 text-gray-500" />
                            <p className="text-sm text-gray-500">{recipes} recettes</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <CircularProgress
                            classNames={{
                                svg: 'w-28 h-28 md:w-36 md:h-36 drop-shadow-md',
                                indicator: 'stroke-primary',
                                track: 'stroke-secondary/50',
                                value: 'text-xl md:text-2xl font-semibold',
                            }}
                            value={progress}
                            strokeWidth={4}
                            showValueLabel={true}
                        />
                        <ChevronRight className="text-gray-400" />
                    </div>
                </div>
                <Progress
                    value={progress}
                    color="primary"
                    classNames={{
                        base: 'w-full mt-4 sm:hidden',
                        indicator: 'bg-primary',
                        track: 'bg-secondary/50',
                    }}
                    showValueLabel={true}
                />
            </CardBody>
        </Card>
    );
}

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
                        <h4 className="text-lg font-bold">Check Order #{id}</h4>
                        <p className="text-sm text-gray-500">{name}</p>
                    </div>
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">{avatar}</div>
                </div>
                <div className="flex gap-4 mb-4">
                    {items.map((item, index) => (
                        <div key={index} className="text-center">
                            <Image alt={item.name} className="object-cover w-16 h-16 rounded-lg mb-1" src={item.image} />
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
