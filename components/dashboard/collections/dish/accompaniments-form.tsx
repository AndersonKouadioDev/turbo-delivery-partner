// 'use client';

// import { Control, useFieldArray } from 'react-hook-form';
// import { Input, Button } from '@heroui/react';
// import { Trash2 } from 'lucide-react';
// import { _createDishSchema } from '@/src/schemas/restaurants.schema';
// interface AccompanimentsFormProps {
//     control: Control<_createDishSchema>;
// }

// export function AccompanimentsForm({ control }: AccompanimentsFormProps) {
//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: 'accompagnementM',
//     });

//     return (
//         <div className="space-y-4">
//             <h3 className="text-lg font-medium">Accompagnements</h3>
//             {fields.map((field, index) => (
//                 <div key={field.id} className="flex gap-2">
//                     <Input {...control.register(`accompaniments.${index}.label`)} variant="bordered" placeholder="Libellé" className="flex-1" />
//                     <Input {...control.register(`accompaniments.${index}.price`, { valueAsNumber: true })} variant="bordered" placeholder="Prix" type="number" step="0.01" className="w-24" />
//                     <Button type="button" variant="ghost" isIconOnly onClick={() => remove(index)}>
//                         <Trash2 className="h-4 w-4" />
//                     </Button>
//                 </div>
//             ))}

//             <Button type="button" variant="bordered" className="w-full" onClick={() => append({ label: '', price: 0 })}>
//                 + Ajouter un accompagnement
//             </Button>
//         </div>
//     );
// }

export default function AccompanimentsForm() {
    return <div>AccompanimentsForm</div>;
}
