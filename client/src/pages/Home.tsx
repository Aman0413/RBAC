import { getAllUsers, getUserProfile, logoutUser } from '@/apis/apiservices';
import AllUser from '@/components/AllUser';
import GetAllTask from '@/components/GetAllTask';
import { Button } from '@/components/ui/button'
import { UserDataContext } from '@/context/UserContext';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'


function Home() {
  const { user, setUser } = useContext(UserDataContext);
  const [allusers, setAllUsers] = useState([]);
  console.log("USER", user);


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


  useEffect(() => {
    getUser();
    getAllUserFunc();
  }, [])



  return (
    <div className='p-4'>
      <Button onClick={logout}>
        Logout
      </Button>


      <div className='flex flex-col  space-x-4 w-full space-y-6'>
        <div className='bg-red-100 w-full rounded-2xl p-3 shadow-sm '>
          <h3 className='my-3 text-gray-500'>All Users</h3>

          <div className='flex flex-col justify-center items-center space-y-4'>
            {
              allusers && allusers.map((user: any, index: number) => {
                return <AllUser
                  key={index}
                  name={user.name}
                  role={user.role}
                  id={user._id}
                  email={user.email}
                />
              })
            }
          </div>

          <div className='mt-5 bg-white p-4 rounded-md font-bold'>

            <h2>Tasks</h2>
            <GetAllTask />
          </div >

        </div>

      </div>
    </div>
  )
}



export default Home