import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog, fetchBlogs, index}) => {
    const {title, createdAt} = blog;
    const BlogDate = new Date(createdAt)
    const {axios} = useAppContext();

    const deleteBlog = async () => {
      const confirm = window.confirm('Are you sure want to delete this essay?');
      if(!confirm) return;
      try {
        const {data} = await axios.post('/api/blog/delete',{id:blog._id})
        if(data.success){
          toast.success(data.message)
          await fetchBlogs()
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const togglePublish = async () => {
      try {
        const {data} = await axios.post('/api/blog/toggle-publish',{id:blog._id})
        if(data.success){
          toast.success(data.message)
          await fetchBlogs()
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    
    const updateStatus = async (status) => {
      try {
        const {data} = await axios.post('/api/blog/update-status',{id:blog._id, status})
        if(data.success){
          toast.success(data.message)
          await fetchBlogs()
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    
    const role = localStorage.getItem('role') || 'admin';
    const isPending = (blog.status || 'Approved') === 'Pending';

  return (
    <tr className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
        <th className='px-6 py-5 font-normal text-gray-500'>{index}</th>
        <td className='px-6 py-5 text-gray-900 font-medium' style={{ fontFamily: "'Prata', serif" }}>{title}</td>
        <td className='px-6 py-5 max-sm:hidden text-gray-500 text-sm'>{BlogDate.toDateString()}</td>
        <td className='px-6 py-5 font-semibold text-xs'>
            {blog.status === 'Pending' ? <span className='text-yellow-600 bg-yellow-50 px-2 py-1 uppercase tracking-widest'>Pending Review</span> : 
             blog.status === 'Rejected' ? <span className='text-red-600 bg-red-50 px-2 py-1 uppercase tracking-widest'>Rejected</span> : 
             <span className='text-green-700 bg-green-50 px-2 py-1 uppercase tracking-widest'>Approved</span>}
        </td>
        <td className='px-6 py-5 max-sm:hidden'>
            <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 ${blog.isPublished ? "text-green-700 bg-green-50" : "text-gray-500 bg-gray-100"}`}>
                {blog.isPublished ? 'Live' : 'Draft'}
            </span>
        </td>
        <td className='px-6 py-5 flex items-center justify-end gap-4'>
            {role === 'admin' && isPending && (
                <>
                  <button onClick={() => updateStatus('Approved')} className='text-[10px] uppercase tracking-widest font-bold text-green-700 hover:text-green-900 transition-colors cursor-pointer'>Approve</button>
                  <button onClick={() => updateStatus('Rejected')} className='text-[10px] uppercase tracking-widest font-bold text-red-600 hover:text-red-800 transition-colors cursor-pointer'>Reject</button>
                </>
            )}
            {(!isPending || role === 'admin') && (
                <button 
                    onClick={togglePublish} 
                    className='text-[10px] uppercase tracking-widest font-bold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer'
                >
                    {blog.isPublished ? 'Unpublish' : 'Publish'}
                </button>
            )}
            <button onClick={deleteBlog} className='text-gray-400 hover:text-primary transition-colors cursor-pointer' title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </td>
    </tr>
  )
}

export default BlogTableItem