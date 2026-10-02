import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment, fetchComments}) => {
    const {blog, createdAt, _id} = comment;
    const BlogDate = new Date(createdAt);
    const {axios} = useAppContext()

    const approveComment = async () => {
      try {
        const role = localStorage.getItem('role') || 'admin';
        const endpoint = role === 'user' ? '/api/user/approve-comment' : '/api/admin/approve-comment';
        const {data} = await axios.post(endpoint, {id:_id})
        if(data.success){
          toast.success(data.message)
          fetchComments()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const deleteComment = async () => {
      try {
        const confirm = window.confirm('Are you sure you want to delete this comment?');
        if(!confirm) return;

        const role = localStorage.getItem('role') || 'admin';
        const endpoint = role === 'user' ? '/api/user/delete-comment' : '/api/admin/delete-comment';
        const {data} = await axios.post(endpoint, {id:_id})
        if(data.success){
          toast.success(data.message)
          fetchComments()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <tr className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
      <td className='px-6 py-5'>
        <p className='text-gray-900 font-medium mb-1' style={{ fontFamily: "'Prata', serif" }}>{blog.title}</p>
        <div className='bg-white border border-gray-200 p-4 mt-3'>
            <p className='uppercase tracking-widest text-[10px] font-bold text-gray-400 mb-2'>
                By {comment.name}
            </p>
            <p className='text-sm text-gray-700 font-light leading-relaxed italic'>
                "{comment.content}"
            </p>
        </div>
      </td>
      <td className='px-6 py-5 max-sm:hidden text-gray-500 text-sm align-top pt-8'>
        {BlogDate.toLocaleDateString()}
      </td>
      <td className='px-6 py-5 align-top pt-8'>
        <div className='flex items-center justify-end gap-4'>
            {!comment.isApproved ? (
               <button onClick={approveComment} className='uppercase tracking-widest text-[10px] font-bold px-3 py-1 bg-green-50 text-green-700 hover:bg-green-100 transition-colors cursor-pointer border border-green-200'>
                   Approve
               </button>
            ) : (
              <span className='uppercase tracking-widest text-[10px] font-bold text-gray-400'>
                  Approved
              </span>
            )}
            <button onClick={deleteComment} className='text-gray-400 hover:text-primary transition-colors cursor-pointer' title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem