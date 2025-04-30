import { useState, useCallback } from "react";


const useConfirm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);
  const [message, setMessage] = useState<any>("")

  const openConfirmDialog = useCallback((callback: () => void) => {
    setOnConfirm(() => callback);
    setTimeout(() => setIsOpen(true), 0);
  }, []);

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return { openConfirmDialog, message, isOpen, handleConfirm, handleCancel, setMessage };
};

export default useConfirm;

