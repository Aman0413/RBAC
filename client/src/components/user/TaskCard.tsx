
import { Button } from '../ui/button'
import toast from 'react-hot-toast';
import { markCompleted } from '@/apis/apiservices';
import { handleAxiosError } from '@/utils/handleAxiosError';
import Loader from '@/utils/Loader';
import { useState } from 'react';




// Renamed type to TaskStatusType
// const taskStatusColors = {
//     Pending: `bg-green-500/20 text-green-600`,
//     Completed: "bg-blue-500/20 text-blue-600",
//     Approved: "bg-green-500/20 text-green-600",
//     Rejected: "bg-red-500/20 text-red-600"
// };

interface TaskCardProps {
    taskid: string;
    title: string;
    description: string;
    status: string
}
function TaskCard({ taskid, title, description, status }: TaskCardProps) {
    const [loading, setLoading] = useState(false);

    const handleMarkAsCompleted = async (taskId: string) => {
        try {
            setLoading(true);
            const res = await markCompleted(localStorage.getItem('token') as string, taskId);
            if (res.success) {
                toast.success(res.message);
            }
        } catch (error) {
            handleAxiosError(error);

        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='bg-gray-100 p-2 rounded-md shadow-md
        '>
            <div className='flex flex-col space-y-1'>
                <h2 className='font-bold'>{title}</h2>
                <p className='text-gray-500'>{description}</p>
                <div className='flex justify-between space-x-16'>

                    <div className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none 

                   bg-green-500/20 text-green-600
                        py-1 px-2 text-xs rounded-md`} style={{ opacity: 1 }}>
                        <span className="">{status}</span>
                    </div>

                    <Button className='text-sm' onClick={() => {
                        handleMarkAsCompleted(taskid)
                    }}>
                        {
                            loading ? <Loader /> : 'Mark as Completed'
                        }
                    </Button>
                </div>
                <div className='text-xs text-gray-500'>Assigned By : Aman</div>
            </div>
        </div>
    )
}

export default TaskCard