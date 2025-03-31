'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@heroui/react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-muted">
            <div className="text-center space-y-8 px-4">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
                    <div className="relative">
                        <h1 className="text-9xl font-bold tracking-tighter bg-gradient-to-r from-destructive to-primary text-transparent bg-clip-text">500</h1>
                       
                    </div>
                    <h2 className="text-4xl font-semibold text-foreground">Erreur Serveur</h2>
                </motion.div>

                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-muted-foreground max-w-sm mx-auto">
                    Désolé, une erreur inattendue s&apos;est produite sur nos serveurs. Notre équipe technique a été notifiée et travaille à résoudre le problème.
                </motion.p>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button color="primary" onClick={() => reset()} className="space-x-2">
                        <RefreshCcw className="w-4 h-4" />
                        <span>Réessayer</span>
                    </Button>
                    <Button onClick={() => router.push('/')} className="space-x-2">
                        <Home className="w-4 h-4" />
                        <span>Accueil</span>
                    </Button>
                </motion.div>

                {error.digest && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-sm text-muted-foreground">
                        Code erreur: {error.digest}
                    </motion.p>
                )}
            </div>
        </div>
    );
}
