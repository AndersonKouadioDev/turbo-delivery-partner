'use client';
import { title } from '@/components/primitives';
import { categories } from '@/data';

import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';
import { ChevronRight, HandPlatter } from 'lucide-react';

export default function Content() {
    return (
        <div className="w-full h-full pb-10 flex flex-1 flex-col gap-4 lg:gap-6">
            <div className="flex items-center">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Collections</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.slice(1).map((collection) => (
                    <Card key={collection.name} className="overflow-hidden">
                        <CardHeader className="flex justify-between gap-2">
                            <Image src={collection.image} alt={collection.name} width={100} height={100} className="object-cover" />
                            <div className="flex flex-col justify-center items-center ">
                                <HandPlatter className="h-8 w-8 mr-2 text-pretty text-primary" />
                                <span className="text-sm text-gray-500">{collection.dishes} plats</span>
                            </div>
                        </CardHeader>

                        <CardBody className="p-4"></CardBody>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">{collection.name}</h2>
                            <Button variant="light" size="sm" endContent={<ChevronRight className="h-5 w-5 text-gray-400" />}>
                                <span>Voir la collection</span>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
