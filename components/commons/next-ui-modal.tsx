"use client"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import React, { ReactNode } from "react";

interface NextUIModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    annaluer?: () => void;
    envoyer?: () => void;
    libAnnaler?: string;
    libEnvoyer?: string;
    size?: string;
}

export function NextUIModal({ children, isOpen, onClose, title, annaluer, envoyer, libAnnaler, libEnvoyer, }: NextUIModalProps) {
    const anullerLib = libAnnaler ? libAnnaler : "Annuler";
    const envoyerLib = libEnvoyer ? libEnvoyer : "Envoyer";
    return (
        <>
            <Modal isOpen={isOpen} size={"lg"} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary text-center font-bold">{title}</ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={annaluer}>
                            {anullerLib}
                        </Button>
                        <Button color="primary" onPress={envoyer}>
                            {envoyerLib}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

