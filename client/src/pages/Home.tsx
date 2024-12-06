import { getUserProfile, logoutUser, getAllUsers } from '@/apis/apiservices';
import { Button } from '@/components/ui/button'
import { UserDataContext } from '@/context/UserContext';
import axios from 'axios'
import React, { useContext, useEffect } from 'react'


function Home() {
  const { user, setUser } = useContext(UserDataContext);
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
      console.log("ALL USERS", res);

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

      <div className='flex justify-center space-x-4'>
        <div className='bg-red-100 w-1/3 rounded-2xl p-3 shadow-sm'>
          <h3>All Users</h3>


        </div>
        <div className='bg-red-100 w-1/3 rounded-2xl p-3 shadow-sm' >
          aman
        </div>
        <div className='bg-yellow-50 w-1/3 rounded-2xl p-3 shadow-sm'>
          <h1>Home</h1>
          <h1>{user && user.name}</h1>
          <h1>{user && user.email}</h1>
          <h1>{user && user.role}</h1>
        </div>
      </div>
    </div>
  )
}



export default Home