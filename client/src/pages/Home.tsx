import { changeRole, deleteUserAdmin, getAllTasks, getAllUsers, getUserProfile, logoutUser } from '@/apis/apiservices';
import AddTask from '@/components/AddTask';
import AllUser from '@/components/AllUser';
import GetAllTask from '@/components/GetAllTask';
import { Button } from '@/components/ui/button'
import { UserDataContext } from '@/context/UserContext';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


function Home() {
  const { user, setUser } = useContext(UserDataContext);
  const [tasks, setTasks] = useState([]);
  const [allusers, setAllUsers] = useState([]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'edit' | 'delete'>('edit'); // Track modal type
  const [selectedUser, setSelectedUser] = useState(null); // Track the user being edited/deleted

  const handleOpenModal = (type: 'edit' | 'delete', user: any) => {
    setModalType(type);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const handleRoleChange = async (userId: string) => {
    try {
      console.log(localStorage.getItem('token'));
      const res = await changeRole(localStorage.getItem('token') as string, userId);
      console.log("role change", res);
      if (res.success) {
        toast.success(res.message);
        getAllUserFunc();

      }
    } catch (error) {
      console.log('Error changing role:', error);
    }
  }

  const deleteOperation = async (id: string) => {
    try {
      const res = await deleteUserAdmin(localStorage.getItem('token') as string, id);

      if (res.success) {
        toast.success(res.message);
        getAllUserFunc();

      }
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  }


  const getUser = async () => {
    try {
      const res = await getUserProfile(localStorage.getItem('token') as string);
      setUser(res.user);
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      const res = await logoutUser(localStorage.getItem('token') as string);
      if (res.success) {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllUserFunc = async () => {
    try {
      const res = await getAllUsers(localStorage.getItem('token') as string);
      setAllUsers(res.users)

    } catch (error) {
      console.log(error);
    }
  }

  const getTasks = async () => {
    try {
      const res = await getAllTasks(localStorage.getItem('token') as string);
      console.log("TAKS", res.tasks);
      if (res.success) {
        setTasks(res.tasks)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser();
    getAllUserFunc();
    getTasks()
  }, [])



  return (
    <div className='p-4'>
      <Button onClick={logout}>
        Logout
      </Button>


      <div className='flex flex-col  space-x-4 w-full space-y-6'>
        <div className='bg-red-100 w-full rounded-2xl p-3 shadow-sm '>

          <div className='mt-5 bg-white p-4 rounded-md font-bold'>


            <h2>Tasks</h2>
            {
              tasks && tasks.map((task: any, index: number) => {
                return <GetAllTask
                  key={index}
                  task={task.title}
                  assignedTo={task.assignedTo?.name}
                  status={task.status}
                  email={task.email}
                  date={task.createdAt}
                />
              })
            }
          </div >
          <div className='mt-5 bg-white p-4 rounded-md font-bold'>


            <h2>All Users</h2>

            {
              allusers && allusers.map((user: any, index: number) => {
                return <AllUser

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
                  handleRoleChange={() => {
                    handleRoleChange(user._id)
                  }}
                  deleteOperation={() => {
                    deleteOperation(user._id)
                  }}

                />
              })
            }
          </div >



        </div>

      </div>
    </div>
  )
}



export default Home