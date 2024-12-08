import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
    userId: string;
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    operation: () => void | Promise<void>;


}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    description,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    operation
}) => {



    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}

                        <div className="w-full my-4">
                            <div className="flex flex-col justify-center space-y-1 my-2">
                                <span>Aman Verma</span>
                                <span>Current Role:</span>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={operation}
                    >
                        {confirmText}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
