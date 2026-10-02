import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');
  const {axios} = useAppContext()

  const fetchComments = async () => {
    try {
      const role = localStorage.getItem('role') || 'admin';
      const endpoint = role === 'user' ? '/api/user/comments' : '/api/admin/comments';
      const {data} = await axios.get(endpoint)
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className='flex-1 lg:px-10 lg:py-6'>
      <div className='flex flex-col sm:flex-row justify-between sm:items-end mb-8 border-b border-gray-900 pb-4 gap-4'>
        <h2 className="text-3xl text-gray-900" style={{ fontFamily: "'Prata', serif" }}>Discussions</h2>
        <div className='flex gap-4'>
           <button 
              onClick={() => setFilter('Approved')} 
              className={`uppercase tracking-widest text-[10px] font-bold px-4 py-2 border transition-colors cursor-pointer ${filter === 'Approved' ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}
           >
              Approved
           </button>
           <button 
              onClick={() => setFilter('Not Approved')} 
              className={`uppercase tracking-widest text-[10px] font-bold px-4 py-2 border transition-colors cursor-pointer ${filter === 'Not Approved' ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}
           >
              Pending
           </button>
        </div>
      </div>
       
       <div className='overflow-x-auto bg-white border border-gray-200'>
         <table className='w-full text-sm text-left text-gray-600'>
          <thead className='text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-200 bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-4 font-semibold'>Essay & Comment</th>
              <th scope='col' className='px-6 py-4 max-sm:hidden font-semibold'>Date</th>
              <th scope='col' className='px-6 py-4 font-semibold text-right'>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment) => {
                if(filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
            }).map((comment, index) => (
                <CommentTableItem key={comment._id} comment={comment} index={index+1} fetchComments={fetchComments} />
            ))}
          </tbody>
         </table>
       </div>
    </div>
  )
}

export default Comments