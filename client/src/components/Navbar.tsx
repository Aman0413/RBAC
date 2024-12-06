import { UserDataContext } from '@/context/UserContext';
import User from '@/icons/User';
import React, { useContext } from 'react'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Navbar() {
    const { user } = useContext(UserDataContext);



    return (
        <div className=' p-4 shadow-md flex justify-between'>
            <h2 className='font-bold text-xl'>RBAC</h2>

            <div className=' flex justify-center items-center'>
                <div>

                    {
                        user && user ? <div className='flex justify-center items-center space-x-2 cursor-pointer'>
                            <div className='bg-blue-100 p-2 rounded-full'>
                                <User />
                            </div>
                            <div>
                                <span>{user && user.name}</span>
                            </div>
                        </div> : <Button>
                            <Link to='/login'>
                                Login
                            </Link>
                        </Button>
                    }
                </div>
            </div>

        </div>
    )
}

export default Navbar