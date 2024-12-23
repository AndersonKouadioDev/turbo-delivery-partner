import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus } from 'lucide-react';
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Button } from '@nextui-org/react';

interface Accompaniment {
  label: string;
  price: number;
}

interface AccompanimentsSectionProps {
  accompaniments: Accompaniment[];
  onUpdate: (accompaniments: Accompaniment[]) => void;
}

export function AccompanimentsSection({ accompaniments, onUpdate }: AccompanimentsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAccompaniments, setEditedAccompaniments] = useState(accompaniments);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleEdit = (index: number, field: keyof Accompaniment, value: string) => {
    const updated = editedAccompaniments.map((item, i) => 
      i === index ? { ...item, [field]: field === 'price' ? parseFloat(value) : value } : item
    );
    setEditedAccompaniments(updated);
  };

  const handleAdd = () => {
    setEditedAccompaniments([...editedAccompaniments, { label: '', price: 0 }]);
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

  const handleSave = () => {
    onUpdate(editedAccompaniments);
    setIsEditing(false);
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
              <Input
                value={accompaniment.label}
                onChange={(e) => handleEdit(index, 'label', e.target.value)}
                placeholder="Libellé"
              />
              <Input
                type="number"
                value={accompaniment.price}
                onChange={(e) => handleEdit(index, 'price', e.target.value)}
                placeholder="Prix"
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
          {accompaniments.map((accompaniment, index) => (
            <div key={index} className="flex justify-between">
              <span>{accompaniment.label}</span>
              <span>{accompaniment.price.toFixed(2)} €</span>
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
        description="Êtes-vous sûr de vouloir supprimer cet accompagnement ?"
      />
    </div>
  );
}

