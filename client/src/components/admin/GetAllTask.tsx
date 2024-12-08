import formatMongoDate from '@/utils/covertDate'
import UpdateStatusModal from './UpdateStatusModal';


type TaskProps = {
    task: string;
    assignedTo?: { name: string, email: string };
    status: string;
    email?: string;
    date?: string;
    isOpen: boolean;
    onCancel: () => void;
    handleUpdateStatusModal: () => void;
    onApprove?: () => void;
    onReject?: () => void;

};


function GetAllTask({ task, status, email, date, isOpen, onCancel, handleUpdateStatusModal, onApprove, onReject, }: TaskProps) {



    return (
        <div>

            <UpdateStatusModal isOpen={isOpen} onCancel={onCancel} title={task} onApprove={onApprove} onReject={onReject} />

            <div className="p-6 overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Tasks <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                </svg>
                                </p>
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Assigned To <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                </svg>
                                </p>
                            </th>

                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Status <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
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
                                    <div className="flex flex-col">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{task}</p>
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70"> {date ? formatMongoDate(date) : 'No Date Available'}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg" alt="John Michael" className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md" />
                                    <div className="flex flex-col">
                                        {/* <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{assignedTo.name}</p> */}
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">{email}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="w-max">
                                    <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md" style={{ opacity: 1 }}>
                                        <span className="">{status}</span>
                                    </div>
                                </div>
                            </td>

                            <td className="p-4 border-b border-blue-gray-50">
                                <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" onClick={handleUpdateStatusModal} >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                                        </svg>
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

export default GetAllTask