import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus } from 'lucide-react';
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Button } from '@nextui-org/react';
interface Drink {
  label: string;
  price: number;
  volume: string;
}

interface DrinksSectionProps {
  drinks: Drink[];
  onUpdate: (drinks: Drink[]) => void;
}

export function DrinksSection({ drinks, onUpdate }: DrinksSectionProps) {
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
    setEditedDrinks([...editedDrinks, { label: '', price: 0, volume: '' }]);
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

  const handleSave = () => {
    onUpdate(editedDrinks);
    setIsEditing(false);
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
              <span>{drink.price.toFixed(2)} €</span>
            </div>
          ))}
        </div>
      )}
      <Separator className="mt-4" />
      <ConfirmationModal
        isOpen={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        onConfirm={confirmDelete}
        title="Confirmer la suppression"
        description="Êtes-vous sûr de vouloir supprimer cette boisson ?"
      />
    </div>
  );
}

