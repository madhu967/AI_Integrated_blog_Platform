import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  const basePath = localStorage.getItem('role') === 'user' ? '/user-dashboard' : '/admin';

  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full w-20 md:w-64 bg-white py-8'>
        
        <NavLink end={true} to={`${basePath}`} className={({isActive}) => `group flex items-center gap-4 py-4 px-6 mb-2 cursor-pointer transition-all border-r-4 ${isActive ? "border-primary bg-gray-50" : "border-transparent hover:bg-gray-50"}`}>
            {({isActive}) => (
                <>
                    <img src={assets.home_icon} className={`w-5 transition-transform group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-60'}`} alt="Dashboard" />
                    <p className={`hidden md:block uppercase tracking-widest text-xs font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>Dashboard</p>
                </>
            )}
        </NavLink>
        
        <NavLink end={true} to={`${basePath}/addBlog`} className={({isActive}) => `group flex items-center gap-4 py-4 px-6 mb-2 cursor-pointer transition-all border-r-4 ${isActive ? "border-primary bg-gray-50" : "border-transparent hover:bg-gray-50"}`}>
            {({isActive}) => (
                <>
                    <img src={assets.add_icon} className={`w-5 transition-transform group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-60'}`} alt="Add Blog" />
                    <p className={`hidden md:block uppercase tracking-widest text-xs font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>Add Essays</p>
                </>
            )}
        </NavLink>
        
        <NavLink end={true} to={`${basePath}/listBlog`} className={({isActive}) => `group flex items-center gap-4 py-4 px-6 mb-2 cursor-pointer transition-all border-r-4 ${isActive ? "border-primary bg-gray-50" : "border-transparent hover:bg-gray-50"}`}>
            {({isActive}) => (
                <>
                    <img src={assets.list_icon} className={`w-5 transition-transform group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-60'}`} alt="List Blogs" />
                    <p className={`hidden md:block uppercase tracking-widest text-xs font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>Manage</p>
                </>
            )}
        </NavLink>
        
        <NavLink end={true} to={`${basePath}/comments`} className={({isActive}) => `group flex items-center gap-4 py-4 px-6 mb-2 cursor-pointer transition-all border-r-4 ${isActive ? "border-primary bg-gray-50" : "border-transparent hover:bg-gray-50"}`}>
            {({isActive}) => (
                <>
                    <img src={assets.comment_icon} className={`w-5 transition-transform group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-60'}`} alt="Comments" />
                    <p className={`hidden md:block uppercase tracking-widest text-xs font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>Discussions</p>
                </>
            )}
        </NavLink>

        {localStorage.getItem('role') !== 'user' && (
            <NavLink end={true} to={`${basePath}/users`} className={({isActive}) => `group flex items-center gap-4 py-4 px-6 mb-2 cursor-pointer transition-all border-r-4 ${isActive ? "border-primary bg-gray-50" : "border-transparent hover:bg-gray-50"}`}>
                {({isActive}) => (
                    <>
                        <img src={assets.user_icon} className={`w-5 transition-transform group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-60'}`} alt="Users" />
                        <p className={`hidden md:block uppercase tracking-widest text-xs font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>Members</p>
                    </>
                )}
            </NavLink>
        )}

    </div>
  )
}

export default Sidebar