import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const {axios, setToken, navigate} = useAppContext()
  
  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization']=null;
    setToken(null);
    navigate('/');
  }

  return (
    <div className='bg-gray-50 min-h-screen font-light'>
      <div className='flex items-center justify-between py-4 h-[80px] px-6 sm:px-12 border-b border-gray-200 bg-white shadow-sm'>
        
        {/* Updated Admin Text Logo */}
        <span 
          onClick={() => navigate('/')} 
          className='text-2xl font-bold tracking-tighter text-gray-900 cursor-pointer' 
          style={{ fontFamily: "'Prata', serif" }}
        >
            OAK<span className='text-primary'>&</span>IRON <span className='text-xs uppercase tracking-widest text-gray-400 font-sans ml-2'>Admin</span>
        </span>

        <button 
          onClick={logout} 
          className='text-xs uppercase tracking-widest font-bold border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 px-8 py-2'
        >
          Logout
        </button>
      </div>

      <div className='flex h-[calc(100vh-80px)]'>
        <Sidebar></Sidebar>
        <div className='flex-1 overflow-y-auto p-6 lg:p-10 bg-gray-50'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default Layout