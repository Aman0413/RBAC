import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { approveTask } from "@/apis/apiservices";
import toast from "react-hot-toast";


interface ChangeStatusModalProps {
    isOpen: boolean;
    onCancel: () => void;
    addTask: () => string;
}

interface Task {
    title: string;
    description: string;
    assignedTo: string;
}

function ChangeStatusModal({ isOpen, onCancel, addTask }: ChangeStatusModalProps) {


    const [task, setTask] = useState<Task>({
        title: "",
        description: "",
        assignedTo: "",
    });


    const handleAddTask = async () => {


        try {
            const userId = addTask();
            const taskData = {
                title: task.title,
                description: task.description,
                assignedTo: userId,
            };

            const res = await approveTask(localStorage.getItem("token") as string, taskData.title, taskData.description, taskData.assignedTo);
            console.log("Task added successfully:", res);
            if (res.success) {
                toast.success("Task added successfully");
                onCancel();
            }

        } catch (error) {
            console.log("Error adding task:", error);
        }
    }


    return (
        <div>
            <Dialog open={isOpen} onOpenChange={onCancel}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Accept the Task?
                        </DialogTitle>
                        <DialogDescription> Are you sure
                            you want to continue?
                            <div className="w-full my-4">
                                <div className="flex flex-col justify-center space-y-5 my-2 ">
                                    <Input placeholder="Title of the task" className="text-sm" onChange={(e) => {
                                        setTask({ ...task, title: e.target.value })
                                    }} />
                                    <Input placeholder="Description" className="text-sm" onChange={(e) => {
                                        setTask({ ...task, description: e.target.value })
                                    }} />
                                    <Button onClick={handleAddTask}>
                                        Assign Task
                                    </Button>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ChangeStatusModal