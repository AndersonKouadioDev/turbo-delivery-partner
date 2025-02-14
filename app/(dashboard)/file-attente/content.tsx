'use client';
import { useState } from 'react';
import { Clock, MapPin, Activity, Package, Radio } from 'lucide-react';
import { FileAttenteLivreur, TimeOfDay } from '@/types/file-attente.model';
import { title } from '@/components/primitives';
import Image from 'next/image';
import createUrlFile from '@/utils/createUrlFile';

interface Props {
    initialData: FileAttenteLivreur[];
}
export default function Content({ initialData }: Props) {
    const data = initialData;
    const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

    const formatTime = (time: TimeOfDay) => {
        return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
    };

    const activeDrivers = data.filter((l) => l.statut === 'Actif').length;
    const totalDrivers = data.length;
    const activePercentage = (activeDrivers / totalDrivers) * 100;

    return (
        <div className="w-full pb-10 flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className={title({ size: 'h3', class: 'text-primary' })}>Ma flotte de livreur</h1>
            </div>

            {/* Stats Section */}
            <div className={`mb-16 flex justify-center gap-8`}>
                {/* Active Drivers Stat */}
                <div className="relative w-48 h-48">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-100 animate-spin-slow">
                        <div className="absolute -top-1 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="absolute inset-2 bg-white rounded-full shadow-lg flex flex-col items-center justify-center">
                        <Activity className="w-8 h-8 text-primary mb-2" />
                        <span className="text-3xl font-bold text-gray-900">{activeDrivers}</span>
                        <p className="text-gray-600">Active</p>
                    </div>
                </div>

                {/* Total Stat */}
                <div className="relative w-48 h-48">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-100 animate-spin-slow">
                        <div className="absolute -top-1 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="absolute inset-2 bg-white rounded-full shadow-lg flex flex-col items-center justify-center">
                        <Package className="w-8 h-8 text-primary mb-2" />
                        <span className="text-3xl font-bold text-gray-900">{totalDrivers}</span>
                        <p className="text-gray-600">Total</p>
                    </div>
                </div>
            </div>

            {/* Livreurs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {data.map((livreur, index) => (
                    <div
                        key={livreur.id}
                        onClick={() => setSelectedDriver(livreur.id)}
                        className={`
                group relative bg-white p-8 rounded-3xl shadow-lg
                transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                animate-fade-in-up cursor-pointer
                ${selectedDriver === livreur.id ? 'ring-2 ring-primary scale-[1.02]' : ''}
              `}
                        style={{
                            animationDelay: `${index * 150}ms`,
                        }}
                    >
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Content */}
                        <div className="relative">
                            {/* Avatar */}
                            <div className="relative mb-4 flex justify-center">
                                <Image
                                    width={96}
                                    height={96}
                                    src={createUrlFile(livreur.avatar ?? '', 'delivery')}
                                    alt={livreur.nomComplet}
                                    className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                                />
                                <div
                                    className={`absolute -bottom-1 right-16 w-4 h-4 rounded-full 
                    ${livreur.statut === 'Actif' ? 'bg-green-400' : 'bg-red-400'}
                    ring-2 ring-white`}
                                />
                            </div>

                            {/* Info */}
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-gray-900 mb-1">{livreur.nomComplet}</h2>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${livreur.statut === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                >
                                    {livreur.statut}
                                </span>

                                <div className="mt-4 space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center justify-center">
                                        <MapPin className="w-4 h-4 mr-1 text-primary" />
                                        <span>Position #{livreur.position}</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Clock className="w-4 h-4 mr-1 text-primary" />
                                        <span>{formatTime(livreur.heureJour)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
