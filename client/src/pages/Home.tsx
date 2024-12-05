import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function Home() {
  const [user, setUser] = useState(null)

  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/user/v1/getmyprofile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log("USER", res.data);
      if (res.data.success) {
        setUser(res.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/v1/logout', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        localStorage.removeItem('token')
        setUser(null)
        window.location.href = '/login'

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser();
  }, [])



  return (
    <div>
      Home Page
      <Button onClick={logout}>
        Logout
      </Button>
    </div>
  )
}



export default Home