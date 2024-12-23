import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Dish } from "@/types/models";
import createUrlFile from "@/utils/createUrlFile";

interface DishCardProps {
  dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
  // Calculate the base price (minimum price including required options)
  // const basePrice = dish.accompaniments.reduce((min, acc) => 
  //   acc.price < min ? acc.price : min, 
  //   dish.accompaniments[0]?.price ?? 0
  // );
  const basePrice = dish.price;

  return (
    <Link href={`/collections/dish/${dish.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={createUrlFile(dish.imageUrl, 'restaurant')}
            alt={dish.libelle}
            fill
            className="object-cover"
          />
          {dish.cookTime && (
            <Badge className="absolute top-2 right-2">
              {dish.cookTime}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">{dish.libelle}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {dish.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          {/* <div className="flex gap-2">
            {dish.options.map((option) => (
              option.isRequired && (
                <Badge key={option.label} variant="outline">
                  {option.label}
                </Badge>
              )
            ))}
          </div> */}
          <p className="font-semibold">
            À {basePrice.toFixed(2)} XOF
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

