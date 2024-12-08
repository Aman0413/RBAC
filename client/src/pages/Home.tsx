import { approveTask, changeRole, deleteUserAdmin, fetchAllTasksFunc, getAllTasks, getAllUsers, getUserProfile, logoutUser } from '@/apis/apiservices';
import AllUser from '@/components/admin/AllUser';
import GetAllTask from '@/components/admin/GetAllTask';
import { Button } from '@/components/ui/button';
import TaskCard from '@/components/user/TaskCard';
import { UserDataContext } from '@/context/UserContext';
import { Task, User } from '@/types/types';
import { handleAxiosError } from '@/utils/handleAxiosError';
import Loader from '@/utils/Loader';

import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Home() {
  const { user, setUser } = useContext(UserDataContext) || { user: null };
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'edit' | 'delete'>('edit'); // Track modal type


  const [updateStatusModal, setUpdateStatusModal] = useState(false);

  const handleUpdateStatusModal = () => {
    setUpdateStatusModal(true);

  }

  const getAllUserTasks = async () => {
    try {

      setLoading(true);
      const res = await fetchAllTasksFunc(localStorage.getItem('token') as string);
      setUserTasks(res.tasks);
      console.log("User Tasks:", res.tasks);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenModal = (type: string) => {
    if (type === 'edit') {

      setModalType(type);
    } else if (type === 'delete') {
      setModalType(type);
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

  };

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await getUserProfile(localStorage.getItem('token') as string);
      console.log("User:", res.user);
      setUser(res.user);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const res = await logoutUser(localStorage.getItem('token') as string);
      if (res.success) {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
      }
    } catch (error) {
      handleAxiosError(error);

    } finally {
      setLoading(false);
    }
  };

  const getAllUserFunc = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers(localStorage.getItem('token') as string);
      setAllUsers(res.users);

    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const getTasks = async () => {
    try {
      setLoading(true);
      const res = await getAllTasks(localStorage.getItem('token') as string);
      console.log('Tasks:', res.tasks);
      if (res.success) {
        setTasks(res.tasks);
      }

    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string) => {
    try {
      setLoading(true);
      const res = await changeRole(localStorage.getItem('token') as string, userId,);
      if (res.success) {
        toast.success('Role changed successfully');
        getAllUserFunc();
      }

    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOperation = async (userId: string) => {
    try {
      setLoading(true);
      const res = await deleteUserAdmin(localStorage.getItem('token') as string, userId,);
      if (res.success) {
        toast.success('User deleted successfully');
        getAllUserFunc();

      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const approveorRejectTask = async (taskId: string, status: string) => {
    try {

      setLoading(true);
      const res = await approveTask(localStorage.getItem('token') as string, taskId, status);
      if (res.success) {
        toast.success('Task updated successfully');
        getTasks();

        setUpdateStatusModal(false);
      }

    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    getUser();
    getAllUserFunc();
    getTasks();
    getAllUserTasks()
  }, []);





  return (
    <div className='p-4'>

      <Button onClick={logout}>Logout</Button>
      {
        loading && <Loader />
      }
      {
        user && user.role === 'admin' ? <>
          <div className='flex flex-col space-x-4 w-full space-y-6'>
            <div className='bg-red-100 w-full rounded-2xl p-3 shadow-sm'>
              <div className='mt-5 bg-white p-4 rounded-md font-bold'>
                <h2>Tasks</h2>
                {tasks &&
                  tasks.map((task: Task,) => (

                    <GetAllTask
                      key={task._id}
                      task={task.title}
                      assignedTo={task.assignedTo?.name}
                      status={task.status}
                      // email={task.email}
                      date={task.createdAt}
                      isOpen={updateStatusModal}
                      onCancel={() => setUpdateStatusModal(false)}
                      handleUpdateStatusModal={handleUpdateStatusModal}
                      onApprove={() => {
                        approveorRejectTask(task._id, 'Approved')
                      }}
                      onReject={() => approveorRejectTask(task._id, 'Rejected')}

                    />

                  ))}
              </div>
              <div className='mt-5 bg-white p-4 rounded-md font-bold'>
                <h2>All Users</h2>
                {allusers &&
                  allusers.map((user: User, index: number) => (
                    <AllUser
                      key={index}
                      name={user.name}
                      role={user.role}
                      id={user._id}
                      email={user.email}
                      edit={() => handleOpenModal('edit')}
                      delete={() => handleOpenModal('delete')}
                      isModalOpen={isModalOpen}
                      onClose={handleCloseModal}
                      option={modalType}
                      handleRoleChange={() => handleRoleChange(user._id)}
                      deleteOperation={() => deleteOperation(user._id)}
                      addTask={() => user._id}
                    />
                  ))}
              </div>
            </div>
          </div></> : <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              userTasks && userTasks.map((task: Task, index: number) => (
                <TaskCard key={index} taskid={task._id} title={task.title} description={task.description} status={task.status} />
              ))
            }
          </div>
        </>
      }

    </div>
  );
}

export default Home;
