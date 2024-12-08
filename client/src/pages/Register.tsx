import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { handleAxiosError } from '@/utils/handleAxiosError'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

interface RegisterProps {
    name: string,
    email: string,
    password: string
}

function Register() {

    const [loading, setLoading] = useState(false)
    const [registerData, setRegisterData] = useState<RegisterProps>({
        name: '',
        email: '',
        password: ''
    })

    const register = async () => {
        if (registerData.name === '' || registerData.email === '' || registerData.password === '') {
            toast.error('Please fill all the fields')
        }

        try {
            setLoading(true)
            const res = await axios.post('http://localhost:4000/api/auth/v1/register', registerData)
            if (res.data.success) {
                toast.success('Register success')
            }
            setLoading(false)
        } catch (error) {
            handleAxiosError(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className=' flex justify-center items-center h-screen '>
            <div className='p-5 rounded-md shadow-lg '>
                <h2 className='my-3 font-bold'>Register</h2>
                <form className='flex flex-col space-y-4 ' onSubmit={(e) => {
                    e.preventDefault()
                    register()
                }}>
                    <Input type='text' placeholder='Name' onChange={(e) => {
                        setRegisterData({
                            ...registerData,
                            name: e.target.value
                        })
                    }} />
                    <Input type='text' placeholder='Email' onChange={(e) => {
                        setRegisterData({
                            ...registerData,
                            email: e.target.value
                        })
                    }} />
                    <Input type='text' placeholder='Password' onChange={(e) => {
                        setRegisterData({
                            ...registerData,
                            password: e.target.value
                        })
                    }} />
                    <span className='text-xs'>
                        <Link to={'/login'}>

                            Already have an account? Login
                        </Link></span>
                    <Button>
                        {loading ? 'Loading...' : 'Register'}
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default Register