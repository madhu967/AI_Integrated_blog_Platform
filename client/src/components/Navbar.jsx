import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const {navigate, token} = useAppContext()

  return (
    <div className='flex justify-between items-center py-6 mx-6 sm:mx-16 xl:mx-24 cursor-pointer bg-white'>
        <div onClick={() => navigate('/')} className='flex items-center gap-2'>
            {/* Replaced blue logo image with high-end text logo */}
            <span className='text-3xl font-bold tracking-tighter text-gray-900' style={{ fontFamily: "'Prata', serif" }}>
                OAK<span className='text-primary'>&</span>IRON
            </span>
        </div>
        
        <button 
            onClick={() => navigate('/admin')} 
            className='flex items-center gap-2 text-xs uppercase tracking-widest font-bold border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 px-8 py-3'
        >
            {token ? 'Dashboard' : 'Login'}
        </button>
    </div>
  )
}

export default Navbar