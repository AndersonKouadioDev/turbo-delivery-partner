import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus } from 'lucide-react';
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Button } from "@heroui/react";
import { useRouter } from 'next/navigation';
import { addBoisson, updateBoisson } from '@/src/actions/restaurant.actions';
import { toast } from 'react-toastify';
import { DishComplet } from '@/types/models';
interface Drink {
  id?: string;
  label: string;
  price: number;
  volume: string;
}

interface DrinksSectionProps {
  dish: DishComplet;
  drinks: Drink[];
  onUpdate: (drinks: Drink[]) => void;
}

export function DrinksSection({ dish, drinks, onUpdate }: DrinksSectionProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDrinks, setEditedDrinks] = useState(drinks);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleEdit = (index: number, field: keyof Drink, value: string) => {
    const updated = editedDrinks.map((drink, i) => 
      i === index ? { ...drink, [field]: field === 'price' ? parseFloat(value) : value } : drink
    );
    setEditedDrinks(updated);
    };

    const handleAdd = () => {
        setEditedDrinks([...editedDrinks, { id: '', label: '', price: 0, volume: '' }]);
    };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updated = editedDrinks.filter((_, i) => i !== deleteIndex);
      setEditedDrinks(updated);
      setDeleteIndex(null);
    }
  };



  const handleSave = async () => {
    try {
        // Identifier les nouveaux accompagnements
        const newDrinks = editedDrinks.slice(drinks.length);

        // Identifier les accompagnements modifiés
        const modifiedDrinks = drinks
            .map((original, index) => {
                const edited = editedDrinks[index];
                if (!edited) return null;

                const hasChanged = original.label !== edited.label || original.price !== edited.price || original.volume !== edited.volume;

                return hasChanged
                    ? {
                          id: original.id,
                          edited: edited,
                      }
                    : null;
            })
            .filter(Boolean);

        // Ajouter les nouveaux accompagnements
        for (const newDrink of newDrinks) {
            const formData = new FormData();
            formData.append('libelle', newDrink.label);
            formData.append('price', newDrink.price.toString());
            formData.append('volume', newDrink.volume);

            const response = await addBoisson(formData);
            if (response.status !== 'success') {
                throw new Error(`Erreur lors de l'ajout : ${response.message}`);
            }
            toast.success(`Ajout de "${newDrink.label}" réussi`);
            router.refresh();
        }

        // Mettre à jour les boissons modifiées
        for (const modified of modifiedDrinks) {
            if (!modified) continue;
            const formData = new FormData();
            formData.append('libelle', modified.edited.label);
            formData.append('price', modified.edited.price.toString());
            formData.append('volume', modified.edited.volume);

            const response = await updateBoisson(modified.id ?? '', formData);
            if (response.status !== 'success') {
                throw new Error(`Erreur lors de la mise à jour : ${response.message}`);
            }
            toast.success(`Mise à jour de "${modified.edited.label}" réussie`);
            router.refresh();
        }

        // Si tout s'est bien passé
        onUpdate(editedDrinks);
        setIsEditing(false);
    } catch (error: any) {
        toast.error(error.message || 'Une erreur est survenue lors de la sauvegarde');
    }
};


  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">Boissons</h3>
        <Button variant="bordered" size="sm" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Annuler' : 'Modifier'}
        </Button>
      </div>
      {isEditing ? (
        <div className="space-y-2">
          {editedDrinks.map((drink, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={drink.label}
                onChange={(e) => handleEdit(index, 'label', e.target.value)}
                placeholder="Libellé"
              />
              <Input
                type="number"
                value={drink.price}
                onChange={(e) => handleEdit(index, 'price', e.target.value)}
                placeholder="Prix"
                className="w-24"
              />
              <Input
                value={drink.volume}
                onChange={(e) => handleEdit(index, 'volume', e.target.value)}
                placeholder="Volume"
                className="w-24"
              />
              <Button variant="ghost" isIconOnly size="sm" onClick={() => handleDelete(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="bordered" size="sm" onClick={handleAdd} className="mt-2">
            <Plus className="h-4 w-4 mr-2" /> Ajouter
          </Button>
          <div className="flex justify-end mt-4">
            <Button color="primary" onClick={handleSave}>Enregistrer</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {drinks.map((drink, index) => (
            <div key={index} className="flex justify-between">
              <span>{drink.label} ({drink.volume})</span>
              <span>{drink.price.toFixed(2)} XOF</span>
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
        description="Êtes-vous sûr de vouloir supprimer cette boisson ?"
      />
    </div>
  );
}

