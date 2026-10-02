import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem';
import {useAppContext} from '../../context/AppContext'
import toast from 'react-hot-toast';

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('All');
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

  const filteredBlogs = blogs.filter(blog => {
      if (filter === 'All') return true;
      const blogStatus = blog.status || 'Approved'; // fallback for old blogs
      return blogStatus === filter;
  });

  return (
    <div className='flex-1 lg:px-10 lg:py-6'>
      <div className='flex flex-col sm:flex-row justify-between sm:items-end mb-8 border-b border-gray-900 pb-4 gap-4'>
          <h2 className="text-3xl text-gray-900" style={{ fontFamily: "'Prata', serif" }}>Manage Essays</h2>
          <div className='flex gap-4'>
             <button onClick={() => setFilter('All')} className={`uppercase tracking-widest text-[10px] font-bold px-4 py-2 border transition-colors cursor-pointer ${filter === 'All' ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}>All</button>
             <button onClick={() => setFilter('Pending')} className={`uppercase tracking-widest text-[10px] font-bold px-4 py-2 border transition-colors cursor-pointer ${filter === 'Pending' ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}>Pending</button>
             <button onClick={() => setFilter('Approved')} className={`uppercase tracking-widest text-[10px] font-bold px-4 py-2 border transition-colors cursor-pointer ${filter === 'Approved' ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}>Approved</button>
             <button onClick={() => setFilter('Rejected')} className={`uppercase tracking-widest text-[10px] font-bold px-4 py-2 border transition-colors cursor-pointer ${filter === 'Rejected' ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}>Rejected</button>
          </div>
      </div>

       <div className='overflow-x-auto bg-white border border-gray-200'>
                <table className='w-full text-sm text-left text-gray-600'>
                    <thead className='text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-200 bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-4 font-semibold'>#</th>
                            <th scope='col' className='px-6 py-4 font-semibold'>Title</th>
                            <th scope='col' className='px-6 py-4 max-sm:hidden font-semibold'>Date</th>
                            <th scope='col' className='px-6 py-4 font-semibold'>Review Status</th>
                            <th scope='col' className='px-6 py-4 max-sm:hidden font-semibold'>Publish Status</th>
                            <th scope='col' className='px-6 py-4 font-semibold text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBlogs.map((blog, index) => {
                           return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1} />
                        })}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default ListBlog