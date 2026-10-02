import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const {axios} = useAppContext();

  const fetchUsers = async () => {
     try {
      // Assuming this is the backend endpoint for fetching users
      const {data} = await axios.get('/api/admin/users')
      if(data.success){
        setUsers(data.users)
      } else {
        toast.error(data.message);
      }
     } catch (error) {
       toast.error(error.message || "Endpoint not found");
     }
  }

  useEffect(() => {
     fetchUsers()
  }, [])

  return (
    <div className='flex-1 lg:px-10 lg:py-6'>
      <div className='flex justify-between items-end mb-8 border-b border-gray-900 pb-4'>
          <h2 className="text-3xl text-gray-900" style={{ fontFamily: "'Prata', serif" }}>Registered Members</h2>
          <span className='text-xs uppercase tracking-widest text-gray-500 font-bold'>{users.length} Total</span>
      </div>

       <div className='overflow-x-auto bg-white border border-gray-200'>
                <table className='w-full text-sm text-left text-gray-600'>
                    <thead className='text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-200 bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-4 font-semibold'>#</th>
                            <th scope='col' className='px-6 py-4 font-semibold'>Name</th>
                            <th scope='col' className='px-6 py-4 font-semibold'>Email</th>
                            <th scope='col' className='px-6 py-4 font-semibold'>Joined Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                           <tr key={user._id || index} className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                                <th className='px-6 py-5 font-normal text-gray-500'>{index + 1}</th>
                                <td className='px-6 py-5 text-gray-900 font-medium' style={{ fontFamily: "'Prata', serif" }}>{user.name}</td>
                                <td className='px-6 py-5 text-gray-500 text-sm'>{user.email}</td>
                                <td className='px-6 py-5 text-gray-500 text-sm'>{new Date(user.createdAt || Date.now()).toDateString()}</td>
                           </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-gray-400 font-light italic">
                                    No members found or backend API not yet implemented.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default ListUsers
