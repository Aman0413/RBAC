import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { handleAxiosError } from '@/utils/handleAxiosError'
import Loader from '@/utils/Loader'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL;
interface LoginProps {
  email: string,
  password: string
}
function Login() {
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState<LoginProps>({
    email: '',
    password: ''
  })

  const login = async () => {
    if (loginData.email === '' || loginData.password === '') {
      toast.error('Please fill all the fields')
    }
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/auth/v1/login`, loginData, {
        withCredentials: true
      })
      console.log(res.data);
      if (res.data.success) {
        toast.success('Login success')
        setLoading(false)

      }
      // Save token to local storage
      localStorage.setItem('token', res.data.token)
      // Redirect to home page
      window.location.href = '/'

    } catch (error) {
      handleAxiosError(error);

    } finally {
      setLoading(false)
    }
  }
  return (
    <div className=' flex justify-center items-center h-screen '>
      <div className='p-5 rounded-md shadow-lg '>
        <h2 className='my-3 font-bold'>Login</h2>
        <form className='flex flex-col space-y-4 ' onSubmit={(e) => {
          e.preventDefault()
          login()

        }}>

          <Input type='text' placeholder='Email' onChange={(e) => {
            setLoginData({
              ...loginData,
              email: e.target.value
            })
          }} />
          <Input type='text' placeholder='Password' onChange={(e) => {
            setLoginData({
              ...loginData,
              password: e.target.value
            })
          }} />
          <span className='text-xs'>
            <Link to={'/register'}>

              Do not have an account? Register
            </Link></span>
          <Button disabled={loading}>

            {
              loading ? <Loader /> : ' Login'
            }


          </Button>

        </form>
      </div>
    </div>
  )
}

export default Login