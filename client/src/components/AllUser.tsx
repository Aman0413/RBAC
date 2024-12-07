import { getAllUsers } from '@/apis/apiservices';
import User from '@/icons/User';
import { useEffect, useState } from 'react'


function AllUser({ name, role, id, email }: { name: string, role: string, id: string, email: string }) {

    console.log("ALL USERS Com", {
        name,
        role,
        id,
        email
    });

    return (
        <div className='w-full'>
            <table className="w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <div className='bg-blue-100 p-2 rounded-full'>
                                        <User />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {email}
                                    </div>
                                </div>
                            </div>
                        </td>


                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${role == 'admin' ? ' bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {role}
                            </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                            <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AllUser