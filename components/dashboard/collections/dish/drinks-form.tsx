// "use client";

// import { Control, useFieldArray } from 'react-hook-form';
// import { Button, Input } from '@heroui/react';
// import { CreateDishSchema } from '@/src/schemas/restaurants.schema';
// import { Trash2 } from 'lucide-react';

// interface DrinksFormProps {
//   control: Control<CreateDishSchema>;
// }

// export function DrinksForm({ control }: DrinksFormProps) {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "drinks"
//   });

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-medium">Boissons</h3>
//       {fields.map((field, index) => (
//         <div key={field.id} className="flex gap-2">
//           <Input
//             {...control.register(`drinks.${index}.label`)}
//             variant="bordered"
//             placeholder="Libellé"
//             className="flex-1"
//           />
//           <Input
//             {...control.register(`drinks.${index}.price`, { valueAsNumber: true })}
//             variant="bordered"
//             placeholder="Prix"
//             type="number"
//             step="0.01"
//             className="w-24"
//           />
//           <Input
//             {...control.register(`drinks.${index}.volume`)}
//             variant="bordered"
//             placeholder="Volume"
//             className="w-24"
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             isIconOnly
//             onClick={() => remove(index)}
//           >
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       ))}
      
//       <Button
//         type="button"
//         variant="bordered"
//         className="w-full"
//         onClick={() => append({ label: '', price: 0, volume: '' })}
//       >
//         + Ajouter une boisson
//       </Button>
//     </div>
//   );
// }


export default function DrinksForm() {
  return <div>DrinksForm</div>;
}
