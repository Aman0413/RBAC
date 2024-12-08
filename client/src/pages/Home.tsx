import { approveTask, changeRole, deleteUserAdmin, fetchAllTasksFunc, getAllTasks, getAllUsers, getUserProfile, logoutUser } from '@/apis/apiservices';
import AllUser from '@/components/admin/AllUser';
import GetAllTask from '@/components/admin/GetAllTask';
import { Button } from '@/components/ui/button';
import TaskCard from '@/components/user/TaskCard';
import { UserDataContext } from '@/context/UserContext';
import { get } from 'node_modules/axios/index.d.cts';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Home() {
  const { user, setUser } = useContext(UserDataContext);
  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'edit' | 'delete'>('edit'); // Track modal type
  const [selectedUser, setSelectedUser] = useState(null); // Track the user being edited/deleted

  const [updateStatusModal, setUpdateStatusModal] = useState(false);

  const handleUpdateStatusModal = () => {
    setUpdateStatusModal(true);

  }

  const getAllUserTasks = async () => {
    try {

      const res = await fetchAllTasksFunc(localStorage.getItem('token') as string);
      setUserTasks(res.tasks);
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
  }

  const handleOpenModal = (type: 'edit' | 'delete', user: any) => {
    setModalType(type);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const getUser = async () => {
    try {
      const res = await getUserProfile(localStorage.getItem('token') as string);
      console.log("User:", res.user);
      setUser(res.user);
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await logoutUser(localStorage.getItem('token') as string);
      if (res.success) {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUserFunc = async () => {
    try {
      const res = await getAllUsers(localStorage.getItem('token') as string);
      setAllUsers(res.users);
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const res = await getAllTasks(localStorage.getItem('token') as string);
      console.log('Tasks:', res.tasks);
      if (res.success) {
        setTasks(res.tasks);
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
  };

  const handleRoleChange = async (userId: string) => {
    try {
      const res = await changeRole(localStorage.getItem('token') as string, userId,);
      if (res.success) {
        toast.success('Role changed successfully');
        getAllUserFunc();
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
  };

  const deleteOperation = async (userId: string) => {
    try {
      const res = await deleteUserAdmin(localStorage.getItem('token') as string, userId,);
      if (res.success) {
        toast.success('User deleted successfully');
        getAllUserFunc();

      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
  };

  const approveorRejectTask = async (taskId: string, status: string) => {
    try {

      const res = await approveTask(localStorage.getItem('token') as string, taskId, status);
      if (res.success) {
        toast.success('Task updated successfully');
        getTasks();

        setUpdateStatusModal(false);
      }
    } catch (error) {
      console.log("Error approving or rejecting task:", error);
      toast.error(error.response?.data.message);
    }
  }

  useEffect(() => {

    getUser();
    getAllUserFunc();
    getTasks();
    getAllUserTasks()
  }, []);



  // useEffect(() => {

  //   getAllUserTasks();
  // }, [userTasks]);

  return (
    <div className='p-4'>
      <Button onClick={logout}>Logout</Button>

      {
        user && user.role === 'admin' ? <>
          <div className='flex flex-col space-x-4 w-full space-y-6'>
            <div className='bg-red-100 w-full rounded-2xl p-3 shadow-sm'>
              <div className='mt-5 bg-white p-4 rounded-md font-bold'>
                <h2>Tasks</h2>
                {tasks &&
                  tasks.map((task: any, index: number) => (

                    <GetAllTask
                      key={task._id}
                      task={task.title}
                      assignedTo={task.assignedTo?.name}
                      status={task.status}
                      email={task.email}
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
                  allusers.map((user: any, index: number) => (
                    <AllUser
                      key={index}
                      name={user.name}
                      role={user.role}
                      id={user._id}
                      email={user.email}
                      edit={() => handleOpenModal('edit', user)}
                      delete={() => handleOpenModal('delete', user)}
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
              userTasks && userTasks.map((task: any, index: number) => (
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
