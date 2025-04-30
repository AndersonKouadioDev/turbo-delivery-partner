// 'use client';

// import { Control, Controller, useFieldArray } from 'react-hook-form';
// import { Input, Button } from '@heroui/react';
// import { CreateDishSchema } from '@/src/schemas/restaurants.schema';
// import { Trash2 } from 'lucide-react';

// interface IngredientsFormProps {
//     control: Control<CreateDishSchema>;
// }

// export function IngredientsForm({ control }: IngredientsFormProps) {
//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: 'ingredients',
//     });

//     return (
//         <div className="space-y-4">
//             {fields.map((field, index) => (
//                 <div key={field.id} className="flex gap-2">
//                     <Controller name={`ingredients.${index}.name`} control={control} render={({ field }) => <Input {...field} variant="bordered" placeholder="Ingrédient" className="flex-1" />} />
//                     <Button isIconOnly type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
//                         <Trash2 className="h-4 w-4" />
//                     </Button>
//                 </div>
//             ))}

//             <Button type="button" variant="bordered" className="w-full" onClick={() => append({ name: '', quantity: '' })}>
//                 + Ajouter un ingrédient
//             </Button>
//         </div>
//     );
// }

export default function IngredientsForm() {
    return <div>IngredientsForm</div>;
}
