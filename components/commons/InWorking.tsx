import React from 'react';
import { Hammer, Clock, CalendarClock, Wrench } from 'lucide-react';

interface EnTravauxProps {
    titre?: string;
    message?: string;
    datePrevue?: string;
    showDate?: boolean;
    className?: string;
}

export function InWorking({ titre = 'Page En Construction', message = 'Cette page est actuellement en cours de développement', datePrevue, showDate = false, className = '' }: EnTravauxProps) {
    return (
        <div className={`h-full w-full flex items-center justify-center bg-gradient-to-br from-yellow-50 to-red-50 ${className}`}>
            <div className="relative w-full max-w-4xl mx-auto p-12">
                {/* Éléments décoratifs */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                    <Wrench className="w-24 h-24 text-red-100 rotate-45" />
                </div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
                    <Hammer className="w-24 h-24 text-red-100 -rotate-12" />
                </div>

                {/* Contenu principal */}
                <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-red-50 p-8 md:p-12">
                    <div className="grid gap-8 md:grid-cols-2 items-center">
                        {/* Côté gauche - Texte */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">{titre}</h1>

                            <div className="flex items-start space-x-3 text-gray-600">
                                <Clock className="w-6 h-6 mt-1 text-red-500" />
                                <p className="text-lg leading-relaxed">{message}</p>
                            </div>

                            {showDate && datePrevue && (
                                <div className="flex items-center space-x-3 text-red-600">
                                    <CalendarClock className="w-5 h-5" />
                                    <p className="font-medium">Mise en ligne prévue : {datePrevue}</p>
                                </div>
                            )}

                            {/* Barre de progression stylisée */}
                            <div className="relative h-2 bg-red-100 rounded-full overflow-hidden">
                                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-yellow-500 w-2/3 rounded-full">
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* Côté droit - Illustration */}
                        <div className="relative aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-full animate-pulse-slow" />
                            <div className="absolute inset-4 bg-gradient-to-br from-red-500/30 to-yellow-500/30 rounded-full animate-pulse-slower" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Hammer className="w-24 h-24 text-red-600 animate-bounce-gentle" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
