import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus } from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { Button } from "@heroui/react";
import { DishComplet } from '@/types/models';
import { addAccompaniment, updateAccompaniment } from '@/src/actions/restaurant.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
interface Accompaniment {
    id?: string;
    libelle: string;
    price: number;
}

interface AccompanimentsSectionProps {
    dish: DishComplet;
    accompaniments: Accompaniment[];
    onUpdate: (accompaniments: Accompaniment[]) => void;
}

export function AccompanimentsSection({ dish, accompaniments, onUpdate }: AccompanimentsSectionProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [editedAccompaniments, setEditedAccompaniments] = useState(accompaniments);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const handleEdit = (index: number, field: keyof Accompaniment, value: string) => {
        const updated = editedAccompaniments.map((item, i) => (i === index ? { ...item, [field]: field === 'price' ? parseFloat(value) : value } : item));
        setEditedAccompaniments(updated);
    };

    const handleAdd = () => {
        setEditedAccompaniments([...editedAccompaniments, { id: '', libelle: '', price: 0 }]);
    };

    const handleDelete = (index: number) => {
        setDeleteIndex(index);
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            const updated = editedAccompaniments.filter((_, i) => i !== deleteIndex);
            setEditedAccompaniments(updated);
            setDeleteIndex(null);
        }
    };

    const handleSave = async () => {
        try {
            // Identifier les nouveaux accompagnements
            const newAccompaniments = editedAccompaniments.slice(dish.accompagnementM.length);

            // Identifier les accompagnements modifiés
            const modifiedAccompaniments = dish.accompagnementM
                .map((original, index) => {
                    const edited = editedAccompaniments[index];
                    if (!edited) return null;

                    const hasChanged = original.libelle !== edited.libelle || original.price !== edited.price;

                    return hasChanged
                        ? {
                              id: original.id,
                              edited: edited,
                          }
                        : null;
                })
                .filter(Boolean);
            console.log({ modifiedAccompaniments, newAccompaniments });

            // Ajouter les nouveaux accompagnements
            for (const newAccompaniment of newAccompaniments) {
                const formData = new FormData();
                formData.append('libelle', newAccompaniment.libelle);
                formData.append('price', newAccompaniment.price.toString());
                formData.append('platId', dish.platM.id);

                const response = await addAccompaniment(formData);
                if (response.status !== 'success') {
                    throw new Error(`Erreur lors de l'ajout : ${response.message}`);
                }
                toast.success(`Ajout de "${newAccompaniment.libelle}" réussi`);
                router.refresh();
            }

            // Mettre à jour les accompagnements modifiés
            for (const modified of modifiedAccompaniments) {
                if (!modified) continue;
                const formData = new FormData();
                formData.append('libelle', modified.edited.libelle);
                formData.append('price', modified.edited.price.toString());

                const response = await updateAccompaniment(modified.id ?? '', formData);
                if (response.status !== 'success') {
                    throw new Error(`Erreur lors de la mise à jour : ${response.message}`);
                }
                toast.success(`Mise à jour de "${modified.edited.libelle}" réussie`);
                router.refresh();
            }

            // Si tout s'est bien passé
            onUpdate(editedAccompaniments);
            setIsEditing(false);
        } catch (error: any) {
            toast.error(error.message || 'Une erreur est survenue lors de la sauvegarde');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Accompagnements</h3>
                <Button variant="bordered" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Annuler' : 'Modifier'}
                </Button>
            </div>
            {isEditing ? (
                <div className="space-y-2">
                    {editedAccompaniments.map((accompaniment, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input value={accompaniment.libelle} onChange={(e) => handleEdit(index, 'libelle', e.target.value)} placeholder="Libellé" />
                            <Input type="number" value={accompaniment.price} onChange={(e) => handleEdit(index, 'price', e.target.value)} placeholder="Prix" className="w-24" />
                            <Button variant="ghost" isIconOnly size="sm" onClick={() => handleDelete(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="bordered" size="sm" onClick={handleAdd} className="mt-2">
                        <Plus className="h-4 w-4 mr-2" /> Ajouter
                    </Button>
                    <div className="flex justify-end mt-4">
                        <Button color="primary" onClick={async () => await handleSave()}>
                            Enregistrer
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    {accompaniments.map((accompaniment, index) => (
                        <div key={index} className="flex justify-between">
                            <span>{accompaniment.libelle}</span>
                            <span>{accompaniment.price.toFixed(2)} XOF</span>
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
                description="Êtes-vous sûr de vouloir supprimer cet accompagnement ?"
            />
        </div>
    );
}
