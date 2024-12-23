import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@nextui-org/react';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus } from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { Button } from '@nextui-org/react';
interface OptionValue {
    value: string;
    extraPrice: number;
}

interface Option {
    label: string;
    isRequired: boolean;
    maxSelected: number;
    values: OptionValue[];
}

interface OptionsSectionProps {
    options: Option[];
    onUpdate: (options: Option[]) => void;
}

export function OptionsSection({ options, onUpdate }: OptionsSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedOptions, setEditedOptions] = useState(options);
    const [deleteIndex, setDeleteIndex] = useState<{ option: number; value?: number } | null>(null);

    const handleEdit = (optionIndex: number, field: keyof Option, value: any) => {
        const updated = editedOptions.map((option, i) => (i === optionIndex ? { ...option, [field]: value } : option));
        setEditedOptions(updated);
    };

    const handleEditValue = (optionIndex: number, valueIndex: number, field: keyof OptionValue, value: string) => {
        const updated = editedOptions.map((option, i) =>
            i === optionIndex
                ? {
                      ...option,
                      values: option.values.map((v, j) => (j === valueIndex ? { ...v, [field]: field === 'extraPrice' ? parseFloat(value) : value } : v)),
                  }
                : option,
        );
        setEditedOptions(updated);
    };

    const handleAddOption = () => {
        setEditedOptions([...editedOptions, { label: '', isRequired: false, maxSelected: 1, values: [] }]);
    };

    const handleAddValue = (optionIndex: number) => {
        const updated = editedOptions.map((option, i) => (i === optionIndex ? { ...option, values: [...option.values, { value: '', extraPrice: 0 }] } : option));
        setEditedOptions(updated);
    };

    const handleDelete = (optionIndex: number, valueIndex?: number) => {
        setDeleteIndex({ option: optionIndex, value: valueIndex });
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            let updated;
            if (deleteIndex.value !== undefined) {
                updated = editedOptions.map((option, i) => (i === deleteIndex.option ? { ...option, values: option.values.filter((_, j) => j !== deleteIndex.value) } : option));
            } else {
                updated = editedOptions.filter((_, i) => i !== deleteIndex.option);
            }
            setEditedOptions(updated);
            setDeleteIndex(null);
        }
    };

    const handleSave = () => {
        onUpdate(editedOptions);
        setIsEditing(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Options</h3>
                <Button variant="bordered" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Annuler' : 'Modifier'}
                </Button>
            </div>
            {isEditing ? (
                <div className="space-y-4">
                    {editedOptions.map((option, optionIndex) => (
                        <div key={optionIndex} className="border p-4 rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                                <Input value={option.label} onChange={(e) => handleEdit(optionIndex, 'label', e.target.value)} placeholder="Libellé de l'option" />
                                <Input
                                    type="number"
                                    value={option.maxSelected}
                                    onChange={(e) => handleEdit(optionIndex, 'maxSelected', parseInt(e.target.value))}
                                    placeholder="Max sélectionné"
                                    className="w-32"
                                />
                                <Checkbox checked={option.isRequired} onChange={(checked) => handleEdit(optionIndex, 'isRequired', checked)}>
                                    <span className="text-sm">Requis</span>
                                </Checkbox>
                                <Button variant="ghost" isIconOnly size="sm" onClick={() => handleDelete(optionIndex)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="ml-4 space-y-2">
                                {option.values.map((value, valueIndex) => (
                                    <div key={valueIndex} className="flex items-center gap-2">
                                        <Input value={value.value} onChange={(e) => handleEditValue(optionIndex, valueIndex, 'value', e.target.value)} placeholder="Valeur" />
                                        <Input
                                            type="number"
                                            value={value.extraPrice}
                                            onChange={(e) => handleEditValue(optionIndex, valueIndex, 'extraPrice', e.target.value)}
                                            placeholder="Prix supplémentaire"
                                            className="w-32"
                                        />
                                        <Button variant="ghost" isIconOnly size="sm" onClick={() => handleDelete(optionIndex, valueIndex)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="bordered" size="sm" onClick={() => handleAddValue(optionIndex)}>
                                    <Plus className="h-4 w-4 mr-2" /> Ajouter une valeur
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button variant="bordered" onClick={handleAddOption}>
                        <Plus className="h-4 w-4 mr-2" /> Ajouter une option
                    </Button>
                    <div className="flex justify-end mt-4">
                        <Button color="primary" onClick={handleSave}>
                            Enregistrer
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {options.map((option, index) => (
                        <div key={index} className="mb-2">
                            <h4 className="font-semibold">{option.label}</h4>
                            <p className="text-sm text-gray-600">
                                {option.isRequired ? 'Requis' : 'Optionnel'} - Max: {option.maxSelected}
                            </p>
                            <ul className="list-disc pl-5">
                                {option.values.map((value, vIndex) => (
                                    <li key={vIndex}>
                                        {value.value}
                                        {value.extraPrice > 0 && ` (+${value.extraPrice.toFixed(2)} €)`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            <Separator className="mt-4" />
            <ConfirmationModal
                isOpen={deleteIndex !== null}
                onClose={() => setDeleteIndex(null)}
                onConfirm={async () => await confirmDelete()}
                title="Confirmer la suppression"
                description={deleteIndex?.value !== undefined ? 'Êtes-vous sûr de vouloir supprimer cette valeur ?' : 'Êtes-vous sûr de vouloir supprimer cette option ?'}
            />
        </div>
    );
}
