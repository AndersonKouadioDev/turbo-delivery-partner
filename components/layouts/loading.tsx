'use client';

import React from 'react';

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-muted">
            <div className="text-center space-y-8 px-4">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
                    <div className="relative">
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="w-24 h-24 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent mx-auto"
                        />
                    </div>
                    <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl font-semibold text-foreground mt-8">
                        Chargement...
                    </motion.h2>
                </motion.div>

                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-muted-foreground max-w-sm mx-auto">
                    Veuillez patienter pendant que nous préparons votre contenu
                </motion.p>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        delay: 0.6,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 1,
                    }}
                    className="w-full max-w-xs mx-auto h-1 bg-muted rounded-full overflow-hidden"
                >
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: 'linear',
                        }}
                        className="h-full w-1/2 bg-gradient-to-r from-primary to-primary/50 rounded-full"
                    />
                </motion.div>
            </div>
        </div>
    );
}
