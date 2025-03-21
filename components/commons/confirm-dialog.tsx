import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogHeader,
    AlertDialogFooter
} from "@/components/ui/alert-dialog";


interface Props {
    isOpen?: boolean,
    message?: string,
    handleConfirm?: () => void,
    handleCancel: () => void,
    setIsOpen?: (isOpen: boolean) => void,

}

export const ConfirmDialog = (props: Props) => (
    <AlertDialog open={props.isOpen} onOpenChange={() => props.setIsOpen && props.setIsOpen(!props.isOpen)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Confirmation ?</AlertDialogTitle>
                <AlertDialogDescription>
                    {
                        props.message ? props.message : "Etes-vous sûr de vouloir faire cette action ?"
                    }
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={props.handleCancel}>Non</AlertDialogCancel>
                <AlertDialogAction onClick={props.handleConfirm}>Oui</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)