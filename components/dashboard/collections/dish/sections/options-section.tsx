import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@heroui/react";
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus } from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { Button } from "@heroui/react";
import { DishComplet, Option, OptionValue } from '@/types/models';
import { toast } from 'react-toastify';
import { addOption, addOptionValue, updateOption, updateOptionValue } from '@/src/actions/restaurant.actions';

interface OptionsSectionProps {
    dish: DishComplet;
    options: Option[];
    onUpdate: (options: Option[]) => void;
}

export function OptionsSection({ dish, options, onUpdate }: OptionsSectionProps) {
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
                      optionValeurs: option.optionValeurs.map((v, j) => (j === valueIndex ? { ...v, [field]: field === 'prixSup' ? parseFloat(value) : value } : v)),
                  }
                : option,
        );
        setEditedOptions(updated);
    };

    const handleAddOption = () => {
        setEditedOptions([...editedOptions, { id: '', libelle: '', isRequired: false, maxSelected: 1, optionValeurs: [] }]);
    };

    const handleAddValue = (optionIndex: number) => {
        const updated = editedOptions.map((option, i) => (i === optionIndex ? { ...option, optionValeurs: [...option.optionValeurs, { valeur: '', prixSup: 0, id: '' }] } : option));
        setEditedOptions(updated);
    };

    const handleDelete = (optionIndex: number, valueIndex?: number) => {
        setDeleteIndex({ option: optionIndex, value: valueIndex });
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            let updated;
            if (deleteIndex.value !== undefined) {
                updated = editedOptions.map((option, i) => (i === deleteIndex.option ? { ...option, optionValeurs: option.optionValeurs.filter((_, j) => j !== deleteIndex.value) } : option));
            } else {
                updated = editedOptions.filter((_, i) => i !== deleteIndex.option);
            }
            setEditedOptions(updated);
            setDeleteIndex(null);
        }
    };
    const handleSave = async () => {
        try {
            // 1. Ajouter les nouvelles options
            for (const option of editedOptions) {
                if (!option.id) {
                    console.log(option);
                    // Nouvelle option
                    const formData = new FormData();
                    formData.append('libelle', option.libelle);
                    formData.append('isRequired', option.isRequired.toString());
                    formData.append('maxSeleteted', option.maxSelected.toString());
                    formData.append('platId', dish.platM.id);

                    const response = await addOption(formData);
                    if (response.status === 'success') {
                        // Ajouter les valeurs pour cette option
                        for (const value of option.optionValeurs) {
                            const formData = new FormData();
                            formData.append('valeur', value.valeur);
                            formData.append('prixSup', value.prixSup.toString());
                            formData.append('optionId', response.data?.id ?? '');

                            await addOptionValue(formData);
                        }
                        toast.success(`Option "${option.libelle}" ajoutée avec succès`);
                    } else {
                        toast.error(`Erreur lors de l'ajout de l'option ${option.libelle}`);
                    }
                } else {
                    // Option existante - Mettre à jour si nécessaire
                    const originalOption = options.find((o) => o.id === option.id);
                    if (originalOption && (originalOption.libelle !== option.libelle || originalOption.isRequired !== option.isRequired || originalOption.maxSelected !== option.maxSelected)) {
                        const formData = new FormData();
                        formData.append('libelle', option.libelle);
                        formData.append('isRequired', option.isRequired.toString());
                        formData.append('maxSeleteted', option.maxSelected.toString());
                        formData.append('platId', dish.platM.id);
                        formData.append('optionId', option.id);
                        // const response = await updateOption(formData);
                        // if (response.status !== 'success') {
                        //     toast.error(`Erreur lors de la mise à jour de l'option ${option.libelle}`);
                        // }
                    }

                    // Gérer les valeurs de l'option
                    for (const value of option.optionValeurs) {
                        if (!value.id) {
                            // Nouvelle valeur
                            const formData = new FormData();
                            formData.append('valeur', value.valeur);
                            formData.append('prixSup', value.prixSup.toString());
                            formData.append('optionId', option.id ?? '');
                            const response = await addOptionValue(formData);
                            if (response.status !== 'success') {
                                toast.error(`Erreur lors de l'ajout de la valeur ${value.valeur}`);
                            }
                        } else {
                            // Valeur existante - Mettre à jour si nécessaire
                            const originalValue = originalOption?.optionValeurs.find((v) => v.id === value.id);
                            if (originalValue && (originalValue.valeur !== value.valeur || originalValue.prixSup !== value.prixSup)) {
                                const formData = new FormData();
                                formData.append('valeur', value.valeur);
                                formData.append('prixSup', value.prixSup.toString());
                                formData.append('optionId', option.id ?? '');
                                // const response = await updateOptionValue(formData);
                                // if (response.status !== 'success') {
                                //     toast.error(`Erreur lors de la mise à jour de la valeur ${value.valeur}`);
                                // }
                            }
                        }
                    }
                }
            }

            onUpdate(editedOptions);
            setIsEditing(false);
            toast.success('Options mises à jour avec succès');
        } catch (error) {
            toast.error('Une erreur est survenue lors de la sauvegarde');
            console.error(error);
        }
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
                                <Input value={option.libelle} onChange={(e) => handleEdit(optionIndex, 'libelle', e.target.value)} placeholder="Libellé de l'option" />
                                <Input
                                    type="number"
                                    value={option.maxSelected}
                                    onChange={(e) => handleEdit(optionIndex, 'maxSelected', parseInt(e.target.value))}
                                    placeholder="Max sélectionné"
                                    className="w-32"
                                />
                                <Checkbox checked={option.isRequired} onValueChange={(checked) => handleEdit(optionIndex, 'isRequired', checked)}>
                                    <span className="text-sm">Requis</span>
                                </Checkbox>
                                <Button variant="ghost" isIconOnly size="sm" onClick={() => handleDelete(optionIndex)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="ml-4 space-y-2">
                                {option?.optionValeurs &&
                                    option?.optionValeurs?.map((value, valueIndex) => (
                                        <div key={valueIndex} className="flex items-center gap-2">
                                            <Input value={value.valeur} onChange={(e) => handleEditValue(optionIndex, valueIndex, 'valeur', e.target.value)} placeholder="Valeur" />
                                            <Input
                                                type="number"
                                                value={value.prixSup}
                                                onChange={(e) => handleEditValue(optionIndex, valueIndex, 'prixSup', e.target.value)}
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
                            <h4 className="font-semibold">{option.libelle}</h4>
                            <p className="text-sm text-gray-600">
                                {option.isRequired ? 'Requis' : 'Optionnel'} - Max: {option.maxSelected}
                            </p>
                            <ul className="list-disc pl-5">
                                {option?.optionValeurs &&
                                    option?.optionValeurs?.map((value, vIndex) => (
                                        <li key={vIndex}>
                                            {value.valeur}
                                            {value.prixSup > 0 && ` (+${value.prixSup.toFixed(2)} XOF)`}
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
