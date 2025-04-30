'use client';

import { useState } from 'react';
import { Switch, Button } from '@heroui/react';
import { DayOfWeek, WeekSchedule } from '@/types';
import { toast } from 'react-toastify';
import { addHoraire } from '@/src/actions/restaurant.actions';

export default function HorairesForm() {
    const [pending, setPending] = useState(false);
    const [schedule, setSchedule] = useState<WeekSchedule>({
        LUNDI: { enabled: true, openingTime: '05:00', closingTime: '01:00' },
        MARDI: { enabled: true, openingTime: '05:00', closingTime: '01:00' },
        MERCREDI: { enabled: true, openingTime: '05:00', closingTime: '01:00' },
        JEUDI: { enabled: true, openingTime: '05:00', closingTime: '01:00' },
        VENDREDI: { enabled: true, openingTime: '05:00', closingTime: '01:00' },
        SAMEDI: { enabled: true, openingTime: '05:00', closingTime: '01:00' },
        DIMANCHE: { enabled: false, openingTime: '05:00', closingTime: '01:00' },
    });

    const dayNames: Record<DayOfWeek, string> = {
        LUNDI: 'Lundi',
        MARDI: 'Mardi',
        MERCREDI: 'Mercredi',
        JEUDI: 'Jeudi',
        VENDREDI: 'Vendredi',
        SAMEDI: 'Samedi',
        DIMANCHE: 'Dimanche',
    };

    const handleTimeChange = (day: DayOfWeek, type: 'openingTime' | 'closingTime', value: string) => {
        setSchedule((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [type]: value,
            },
        }));
    };

    const handleToggle = (day: DayOfWeek) => {
        setSchedule((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                enabled: !prev[day].enabled,
            },
        }));
    };

    const handleSubmit = async () => {
        setPending(true);
        const enabledDays = Object.entries(schedule).filter(([_, value]) => value.enabled);

        if (!enabledDays.length) {
            toast.error('Veuillez activer au moins un jour.');
            return;
        }

        try {
            await Promise.all(
                enabledDays.map(async ([day, times]) => {
                    const formData = new FormData();
                    formData.append('dayOfWeek', day);
                    formData.append('openingTime', times.openingTime);
                    formData.append('closingTime', times.closingTime);

                    await addHoraire(formData);
                }),
            );

            toast.success('Horaires enregistrés avec succès.');
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de l’enregistrement des horaires :', error);
            toast.error('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            <h1 className="text-xl font-semibold text-center text-primary">Définir les horaires d&apos;ouverture</h1>

            <div className="space-y-4">
                {(Object.keys(schedule) as DayOfWeek[]).map((day) => (
                    <div key={day} className="flex items-center space-x-4">
                        <div className="w-24">
                            <span className="text-sm">{dayNames[day]}</span>
                        </div>

                        <Switch
                            isSelected={schedule[day].enabled}
                            onValueChange={() => handleToggle(day)}
                            classNames={{
                                wrapper: 'group-data-[selected=true]:bg-primary',
                            }}
                        />

                        <div className="flex items-center space-x-2 flex-1">
                            {schedule[day].enabled ? (
                                <>
                                    <input
                                        type="time"
                                        value={schedule[day].openingTime}
                                        onChange={(e) => handleTimeChange(day, 'openingTime', e.target.value)}
                                        className="flex-1 p-2 rounded-lg border border-gray-200 text-sm"
                                    />
                                    <span className="text-sm">à</span>
                                    <input
                                        type="time"
                                        value={schedule[day].closingTime}
                                        onChange={(e) => handleTimeChange(day, 'closingTime', e.target.value)}
                                        className="flex-1 p-2 rounded-lg border border-gray-200 text-sm"
                                    />
                                </>
                            ) : (
                                <div className="flex-1 text-center text-sm text-gray-400">Fermé</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Button className="w-full bg-primary text-white" onPress={handleSubmit} disabled={pending} isLoading={pending}>
                Enregister
            </Button>
        </div>
    );
}
