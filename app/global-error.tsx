'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { Button } from "@heroui/react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-muted">
                    <div className="text-center space-y-8 px-4">
                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
                            <div className="relative">
                                <h1 className="text-9xl font-bold tracking-tighter bg-gradient-to-r from-destructive to-primary text-transparent bg-clip-text">500</h1>
                                <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute -top-8 -right-8">
                                    <div className="w-16 h-16 rounded-full border-4 border-t-destructive border-r-destructive border-b-transparent border-l-transparent" />
                                </motion.div>
                            </div>
                            <h2 className="text-4xl font-semibold text-foreground">Erreur Critique</h2>
                        </motion.div>

                        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-muted-foreground max-w-sm mx-auto">
                            Une erreur critique s&apos;est produite. Veuillez réessayer ou contacter le support si le problème persiste.
                        </motion.p>

                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center">
                            <Button startContent={<RefreshCcw className="w-4 h-4" />} color="primary" onClick={() => reset()} className="space-x-2">
                                Réessayer
                            </Button>
                        </motion.div>

                        {error.digest && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-sm text-muted-foreground">
                                Code erreur: {error.digest}
                            </motion.p>
                        )}
                    </div>
                </div>
            </body>
        </html>
    );
}
