import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const { axios } = useAppContext()

    const fetchDashboard = async () => {
        try {
            const role = localStorage.getItem('role') || 'admin';
            const endpoint = role === 'user' ? '/api/user/dashboard' : '/api/admin/dashboard';
            const { data } = await axios.get(endpoint);
            data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
      fetchDashboard()
    }, [])
    
  return (
    <div className='flex-1 lg:px-10 lg:py-6'>
         <h2 className="text-3xl text-gray-900 mb-8" style={{ fontFamily: "'Prata', serif" }}>Overview</h2>
         
         <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12'>
           <div className='bg-white p-8 border border-gray-200 cursor-pointer hover:border-gray-900 transition-colors duration-300'>
                <div className='flex items-center gap-4 mb-4'>
                    <img src={assets.dashboard_icon_1} className="w-5 opacity-60" alt="" />
                    <p className='uppercase tracking-widest text-xs font-semibold text-gray-400'>Total Essays</p>
                </div>
                <p className='text-4xl font-light text-gray-900' style={{ fontFamily: "'Prata', serif" }}>{dashboardData.blogs}</p>
           </div>
           
           <div className='bg-white p-8 border border-gray-200 cursor-pointer hover:border-gray-900 transition-colors duration-300'>
                <div className='flex items-center gap-4 mb-4'>
                    <img src={assets.dashboard_icon_2} className="w-5 opacity-60" alt="" />
                    <p className='uppercase tracking-widest text-xs font-semibold text-gray-400'>Discussions</p>
                </div>
                <p className='text-4xl font-light text-gray-900' style={{ fontFamily: "'Prata', serif" }}>{dashboardData.comments}</p>
           </div>
           
           <div className='bg-white p-8 border border-gray-200 cursor-pointer hover:border-gray-900 transition-colors duration-300'>
                <div className='flex items-center gap-4 mb-4'>
                    <img src={assets.dashboard_icon_3} className="w-5 opacity-60" alt="" />
                    <p className='uppercase tracking-widest text-xs font-semibold text-gray-400'>Drafts</p>
                </div>
                <p className='text-4xl font-light text-gray-900' style={{ fontFamily: "'Prata', serif" }}>{dashboardData.drafts}</p>
           </div>
         </div>
         
         <div>
            <div className='flex justify-between items-end mb-6 border-b border-gray-900 pb-4'>
                <h3 className="text-2xl text-gray-900" style={{ fontFamily: "'Prata', serif" }}>Recent Publications</h3>
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
                        {dashboardData.recentBlogs.map((blog, index) => (
                           <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index+1} />
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
    </div>
  )
}

export default Dashboard