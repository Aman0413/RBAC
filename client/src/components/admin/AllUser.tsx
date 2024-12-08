
import Delete from '@/icons/Delete';
import Edit from '@/icons/Edit';
import { useState } from 'react'
import Modal from './Modal';

import Plus from '@/icons/Plus';
import ChangeStatusModal from './ChangeStatusModal';


interface AllUserProps {
    name: string;
    role: string;
    id: string;
    email: string;
    edit: () => void;
    delete: () => void;
    isModalOpen: boolean;
    onClose: () => void;
    option: string | null;
    operation?: () => void | Promise<void>;
    handleRoleChange: (userId: string) => void;
    deleteOperation: (id: string) => void;
    addTask: () => string;

}

function AllUser({ name, role, id, email, edit, delete: deleteUser, isModalOpen, onClose, option, handleRoleChange, deleteOperation, addTask }: AllUserProps) {

    const [isChangeStatusModalOpen, setChangeStatusModalOpen] = useState(false);

    const toggleChangeStatusModal = () => {
        setChangeStatusModalOpen(!isChangeStatusModalOpen);
    };

   
    return (
        <div>
            <Modal
                userId={id}
                isOpen={isModalOpen}
                title={option === 'edit' ? 'Edit User' : 'Delete User'}
                description={option === 'edit' ? 'Edit user details.' : 'Are you sure you want to delete this user?'}
                onConfirm={option === 'edit' ? edit : deleteUser}
                onCancel={onClose}
                confirmText={option === 'edit' ? (role === 'user' ? 'Make Admin' : 'Make User') : 'Confirm'}
                cancelText="Cancel"
                operation={option === 'edit'
                    ? () => handleRoleChange(id)
                    : () => deleteOperation(id)}
                role={role}
            />

            <ChangeStatusModal
                isOpen={isChangeStatusModalOpen}
                onCancel={toggleChangeStatusModal}
                addTask={addTask}

            />
            <div className="p-6 overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>

                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Name<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                </svg>
                                </p>
                            </th>

                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Role <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                </svg>
                                </p>
                            </th>

                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Actions</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg" alt="John Michael" className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md" />
                                    <div className="flex flex-col">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{name}</p>
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">{email}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="w-max">
                                    <div className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none ${role == 'admin' ? " bg-green-500/20 text-green-600" : " bg-blue-500/20 text-blue-600"} py-1 px-2 text-xs rounded-md`} style={{ opacity: 1 }}>
                                        <span className="">{role}</span>
                                    </div>
                                </div>
                            </td>

                            <td className="p-4 border-b border-blue-gray-50">
                                <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex space-x-5 justify-center items-center">
                                        <span className='bg-blue-500/20 text-blue-600 p-2 rounded-xl' onClick={edit}>
                                            <Edit
                                            />
                                        </span>
                                        <span className='bg-blue-500/20 text-blue-600 p-2 rounded-xl' onClick={toggleChangeStatusModal}>
                                            <Plus

                                            />
                                        </span>
                                        <span className='bg-red-500/20 text-red-600 p-2 rounded-xl' onClick={deleteUser}>
                                            <Delete />
                                        </span>
                                    </span>
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AllUser