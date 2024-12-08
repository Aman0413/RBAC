import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";


interface UpdateStatusModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onApprove?: () => void;
    onReject?: () => void;
    title: string;
    description?: string;
}


function UpdateStatusModal({ isOpen, onCancel, onApprove, onReject, title, }: UpdateStatusModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Approve or Reject Task</DialogTitle>
                    <DialogDescription>
                        <div className="my-4">
                            <p><strong>Task Title:</strong> {title}</p>
                            <p><strong>Description:</strong> {"Task"}</p>
                        </div>
                        Are you sure you want to approve or reject this task?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                        onClick={onReject}
                    >
                        Reject
                    </Button>
                    <Button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={onApprove}
                    >
                        Approve
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateStatusModal