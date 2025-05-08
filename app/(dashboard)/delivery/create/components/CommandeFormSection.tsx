import { TrashIcon } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button, Switch, Select, SelectItem } from '@heroui/react';
import { AddressFields } from './AddressFields';
import { InputPhone } from '@/components/ui/form-ui/input-phone';
import 'react-phone-number-input/style.css';
import { Restaurant } from '@/types/models';
import { DeliveryFee } from '@/types/restaurant';

// Ajout de l'enum pour le mode de paiement
const modePaiementOptions = [
    {
        label: 'Espèce',
        value: 'ESPECE',
    },
    {
        label: 'Wave',
        value: 'WAVE',
    },
];

interface CommandeFormSectionProps {
    index: number;
    form: any;
    remove: (index: number) => void;
    handleAddressSelect: (index: number, type: 'lieuRecuperation' | 'lieuLivraison') => void;
    restaurant: Restaurant;
    fraisLivraisons: DeliveryFee[];
}

export const CommandeFormSection = ({ index, form, remove, handleAddressSelect, restaurant, fraisLivraisons }: CommandeFormSectionProps) => {

    return (
        <Card className="p-3 space-y-3 bg-background border-l-4 border-l-primary">
            <div className="flex justify-between items-center bg-muted/50 dark:bg-muted p-2 rounded-lg">
                <h3 className="text-base font-semibold text-primary">Commande {index + 1}</h3>
                {index > 0 && (
                    <Button type="button" variant="bordered" color="danger" size="sm" onClick={() => remove(index)} className="hover:bg-destructive/10 dark:hover:bg-destructive/20 h-6 min-h-0">
                        <TrashIcon className="h-3 w-3" />
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2 space-y-3">
                    {/* Section Libellé et Date/Heure */}
                    <FormField
                        control={form.control}
                        name={`commandes.${index}.libelle`}
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel className="text-sm">Libellé</FormLabel>
                                <FormControl>
                                    <Input {...field} className="h-8" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="bg-card p-2 rounded-lg shadow-sm border border-border grid grid-cols-1 md:grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name={`commandes.${index}.prix`}
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm">Prix</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" min="0" step="0.01" onChange={(e) => field.onChange(parseFloat(e.target.value))} className="h-8" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`commandes.${index}.numero`}
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm">Numéro de commande</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="h-8" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Rest of the Destinataire section remains the same */}
                    <div className="bg-card p-2 rounded-lg shadow-sm border border-border space-y-2">
                        <h4 className="font-semibold text-green-600 dark:text-green-400">Destinataire</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name={`commandes.${index}.destinataire.nomComplet`}
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-sm">Nom complet</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="h-8" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`commandes.${index}.destinataire.contact`}
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-sm">Contact</FormLabel>
                                        <FormControl>
                                            <InputPhone
                                                value={field.value ?? ''}
                                                setValue={(value: any) => {
                                                    field.onChange(value);
                                                }}
                                                variant="bordered"
                                                isInvalid={!!form.formState.errors?.commandes?.[index]?.destinataire?.contact}
                                                errorMessage={form.formState.errors?.commandes?.[index]?.destinataire?.contact?.message}
                                                className="min-h-8"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="bg-green-50/50 dark:bg-green-950/30 p-2 rounded-lg shadow-sm border border-green-100 dark:border-green-900">
                            <AddressFields index={index} type="lieuLivraison" label="Lieu de livraison" form={form} handleAddressSelect={handleAddressSelect} />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* Expéditeur section remains the same */}
                    <div className="bg-card p-2 rounded-lg shadow-sm border border-border space-y-2">
                        <div className="bg-primary/5 dark:bg-primary/10 p-2 rounded-lg">
                            <AddressFields index={index} type="lieuRecuperation" label="Lieu de récupération" form={form} handleAddressSelect={handleAddressSelect} />
                        </div>
                        <FormField
                            control={form.control}
                            name={`commandes.${index}.zoneId`}
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm">Zone de livraison</FormLabel>
                                    <Select value={field.value} onChange={(e) => field.onChange(e.target.value)} variant="bordered" size="sm" className="h-8">
                                        {fraisLivraisons.map((mode) => (
                                            <SelectItem key={mode.id}>{mode.name}</SelectItem>
                                        ))}
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Updated Autres informations section with Mode de paiement */}
                    <div className="bg-card p-2 rounded-lg shadow-sm border border-border space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Autres informations</h4>
                        <div className="grid grid-cols-1 gap-2">
                            <FormField
                                control={form.control}
                                name={`commandes.${index}.modePaiement`}
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-sm">Mode de paiement</FormLabel>
                                        <Select value={field.value} onChange={(e) => field.onChange(e.target.value)} variant="bordered" size="sm" className="h-8">
                                            {modePaiementOptions.map((mode) => (
                                                <SelectItem key={mode.value}>{mode.label}</SelectItem>
                                            ))}
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`commandes.${index}.livraisonPaye`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-2 shadow-sm bg-muted/50 dark:bg-muted">
                                        <div>
                                            <FormLabel className="text-sm">Livraison payée</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onValueChange={field.onChange} className="scale-75" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CommandeFormSection;
