'use client';

import { RefreshCcw } from 'lucide-react';
import { Button } from "@heroui/react";
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ActivationPending() {
    const router = useRouter();
    useEffect(() => {
        const interval = setInterval(() => {
            router.push('/');
        }, 10 * 1000); // 2 minutes en millisecondes

        // Nettoyage lors du démontage du composant
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white p-6">
            {/* Header */}
            <header className="flex items-center gap-4 mb-8">
                <h1 className="text-primary font-medium">Demande d&apos;activation</h1>
            </header>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center gap-8 px-4">
                <h2 className="text-2xl font-bold text-center">Votre demande d&apos;activation est en cours</h2>

                {/* Animated Hourglass */}
                <div className="w-20 h-20 relative animate-pulse">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" fill="#E9D5FF" />
                        <path d="M12 22c3.87 0 7-3.13 7-7 0-2.38-1.19-4.47-3-5.74V7c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v2.26C6.19 10.53 5 12.62 5 15c0 3.87 3.13 7 7 7z" fill="#7E22CE" />
                    </svg>
                </div>

                {/* Status Message */}
                <div className="w-full max-w-md bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                    <RefreshCcw className="w-5 h-5 text-primary animate-spin" />
                    <p className="text-sm">La demande d&apos;activation est entrain d&apos;être examinée</p>
                </div>

                {/* Details Button */}
                <Button as={Link} href="/activation-pending/detail" color="primary" className="w-full max-w-md mt-aut">
                    Voir les détails de ta demande
                </Button>
            </div>
        </div>
    );
}
