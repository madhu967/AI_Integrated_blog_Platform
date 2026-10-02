import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem';
import {useAppContext} from '../../context/AppContext'
import toast from 'react-hot-toast';

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const {axios} = useAppContext()

  const fetchBlogs = async () => {
     try {
      const role = localStorage.getItem('role') || 'admin';
      const endpoint = role === 'user' ? '/api/user/blogs' : '/api/admin/blogs';
      const {data} = await axios.get(endpoint)
      if(data.success){
        setBlogs(data.blogs)
      } else {
        toast.error(data.message);
      }
     } catch (error) {
       toast.error(error.message);
     }
  }

  useEffect(() => {
     fetchBlogs()
  }, [])

  return (
    <div className='flex-1 lg:px-10 lg:py-6'>
      <div className='flex justify-between items-end mb-8 border-b border-gray-900 pb-4'>
          <h2 className="text-3xl text-gray-900" style={{ fontFamily: "'Prata', serif" }}>Manage Essays</h2>
          <span className='text-xs uppercase tracking-widest text-gray-500 font-bold'>{blogs.length} Total</span>
      </div>

       <div className='overflow-x-auto bg-white border border-gray-200'>
                <table className='w-full text-sm text-left text-gray-600'>
                    <thead className='text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-200 bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-4 font-semibold'>#</th>
                            <th scope='col' className='px-6 py-4 font-semibold'>Title</th>
                            <th scope='col' className='px-6 py-4 max-sm:hidden font-semibold'>Date</th>
                            <th scope='col' className='px-6 py-4 max-sm:hidden font-semibold'>Status</th>
                            <th scope='col' className='px-6 py-4 font-semibold text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => {
                           return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1} />
                        })}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default ListBlog