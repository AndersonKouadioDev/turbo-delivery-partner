'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { IconAlertCircle, IconCheck, IconInfoCircle, IconX } from '@tabler/icons-react';

// Types de retour possibles pour le feedback
type FeedBackType = 'success' | 'error' | 'warning' | 'info';

// Propriétés du composant FeedBack
interface FeedBackProps {
    type: FeedBackType; // Type de feedback
    title: string; // Titre du message
    detail: string; // Détails du message
    confirmButtonText?: string; // Texte du bouton de confirmation
    confirmButtonAction?: () => void; // Action à exécuter lors du clic sur le bouton de confirmation
    cancelButtonText?: string; // Texte du bouton d'annulation
    cancelButtonAction?: () => void; // Action à exécuter lors du clic sur le bouton d'annulation
}

// Mappage des icônes en fonction du type de feedback
const iconMap = {
    success: <IconCheck className="text-green-500 dark:text-green-400" size={80} />,
    error: <IconX className="text-red-500 dark:text-red-400" size={80} />,
    warning: <IconAlertCircle className="text-yellow-500 dark:text-yellow-400" size={80} />,
    info: <IconInfoCircle className="text-blue-500 dark:text-blue-400" size={80} />,
};

/**
 * Composant FeedBack
 * @param {FeedBackProps} param0
 * @returns {JSX.Element}
 */
const FeedBack: React.FC<FeedBackProps> = ({ type, title, detail, confirmButtonText, confirmButtonAction, cancelButtonText, cancelButtonAction }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <motion.div animate={{ scale: 1 }} className="mb-6" initial={{ scale: 0 }} transition={{ duration: 0.5 }}>
                {iconMap[type]} {/* Affiche l'icône correspondante au type de feedback */}
            </motion.div>

            <motion.h1 animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center" initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.2 }}>
                {title} {/* Affiche le titre du feedback */}
            </motion.h1>

            <motion.p animate={{ opacity: 1, y: 0 }} className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md" initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.4 }}>
                {detail} {/* Affiche les détails du feedback */}
            </motion.p>

            <motion.div animate={{ opacity: 1, y: 0 }} className="flex space-x-4" initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.6 }}>
                {cancelButtonText && (
                    <Button size="sm" onClick={cancelButtonAction ? cancelButtonAction : () => router.back()}>
                        {cancelButtonText} {/* Affiche le bouton d'annulation */}
                    </Button>
                )}

                {confirmButtonText && (
                    <Button color="primary" size="sm" onClick={confirmButtonAction}>
                        {confirmButtonText} {/* Affiche le bouton de confirmation */}
                    </Button>
                )}
            </motion.div>
        </div>
    );
};

export default FeedBack;

/*
Comment utiliser le composant FeedBack :

<FeedBack
  type="success" // ou "error", "warning", "info"
  title="Opération réussie"
  detail="Votre action a été effectuée avec succès."
  confirmButtonText="OK"
  confirmButtonAction={() => console.log("Confirmé")}
  cancelButtonText="Annuler"
  cancelButtonAction={() => console.log("Annulé")}
/>
*/
