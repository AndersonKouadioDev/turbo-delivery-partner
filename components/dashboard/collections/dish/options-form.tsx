// 'use client';

// import { Control, useFieldArray } from 'react-hook-form';
// import { Button, Input, Checkbox } from '@heroui/react';
// import { CreateDishSchema } from '@/src/schemas/restaurants.schema';
// import { Trash2 } from 'lucide-react';

// interface OptionsFormProps {
//     control: Control<CreateDishSchema>;
// }

// export function OptionsForm({ control }: OptionsFormProps) {
//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: 'options',
//     });

//     return (
//         <div className="space-y-4">
//             <h3 className="text-lg font-medium">Options</h3>
//             {fields.map((field, index) => (
//                 <div key={field.id} className="space-y-2 border p-4 rounded-md">
//                     <div className="flex gap-2">
//                         <Input {...control.register(`options.${index}.label`)} variant="bordered" placeholder="Libellé" className="flex-1" />
//                         <Input {...control.register(`options.${index}.maxSelected`, { valueAsNumber: true })} variant="bordered" placeholder="Max sélectionné" type="number" className="w-32" />
//                         <Checkbox {...control.register(`options.${index}.isRequired`)} />
//                         <Button type="button" variant="ghost" isIconOnly onClick={() => remove(index)}>
//                             <Trash2 className="h-4 w-4" />
//                         </Button>
//                     </div>
//                     <OptionValuesForm control={control} optionIndex={index} />
//                 </div>
//             ))}

//             <Button type="button" variant="bordered" className="w-full" onClick={() => append({ label: '', isRequired: false, maxSelected: 1, values: [] })}>
//                 + Ajouter une option
//             </Button>
//         </div>
//     );
// }

// interface OptionValuesFormProps {
//     control: Control<CreateDishSchema>;
//     optionIndex: number;
// }

// function OptionValuesForm({ control, optionIndex }: OptionValuesFormProps) {
//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: `options.${optionIndex}.values`,
//     });

//     return (
//         <div className="space-y-2 ml-4">
//             {fields.map((field, valueIndex) => (
//                 <div key={field.id} className="flex gap-2">
//                     <Input {...control.register(`options.${optionIndex}.values.${valueIndex}.value`)} variant="bordered" placeholder="Valeur" className="flex-1" />
//                     <Input
//                         {...control.register(`options.${optionIndex}.values.${valueIndex}.extraPrice`, { valueAsNumber: true })}
//                         variant="bordered"
//                         placeholder="Prix sup."
//                         type="number"
//                         step="0.01"
//                         className="w-24"
//                     />
//                     <Button type="button" variant="ghost" isIconOnly onClick={() => remove(valueIndex)}>
//                         <Trash2 className="h-4 w-4" />
//                     </Button>
//                 </div>
//             ))}
//             <Button type="button" variant="bordered" onClick={() => append({ value: '', extraPrice: 0 })}>
//                 + Ajouter une valeur
//             </Button>
//         </div>
//     );
// }


export default function OptionsForm() {
    return <div>OptionsForm</div>;
}
