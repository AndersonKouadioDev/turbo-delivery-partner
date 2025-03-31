"use client"
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from "@heroui/react";
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Error 404',
};

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-muted">
            <div className="text-center space-y-8 px-4">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
                    <h1 className="text-9xl font-bold tracking-tighter bg-gradient-to-r from-primary to-yellow-600 text-transparent bg-clip-text">404</h1>
                    <h2 className="text-4xl font-semibold text-foreground">Page non trouvée</h2>
                </motion.div>

                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-muted-foreground max-w-sm mx-auto">
                    Désolé, la page que vous recherchez semble avoir disparu dans l&apos;espace. Peut-être a-t-elle été déplacée ou supprimée.
                </motion.p>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button color='primary' as={Link} href={'/'} className="space-x-2">
                        <Home className="w-4 h-4" />
                        <span>Accueil</span>
                    </Button>
                    <Button variant="light" onClick={() => router.back()} className="space-x-2">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Retour</span>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
