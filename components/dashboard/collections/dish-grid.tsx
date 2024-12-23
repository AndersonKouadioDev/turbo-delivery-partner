import { DishCard } from "./dish-card";
import type { Dish } from "@/types/models";

interface DishGridProps {
  dishes: Dish[];
}

export function DishGrid({ dishes }: DishGridProps) {
  if (dishes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun plat dans cette collection</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}

