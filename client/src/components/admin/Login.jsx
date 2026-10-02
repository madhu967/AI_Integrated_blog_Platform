import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
    const {axios, setToken} = useAppContext();
    const [mode, setMode] = useState('User Login'); // 'User Login', 'User Register', 'Admin Login'
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let endpoint = '';
            let payload = { email, password };
            
            if (mode === 'Admin Login') {
                endpoint = '/api/admin/login';
            } else if (mode === 'User Login') {
                endpoint = '/api/user/login';
            } else if (mode === 'User Register') {
                endpoint = '/api/user/register';
                payload = { name, email, password };
            }

            const {data} = await axios.post(endpoint, payload);

            if(data.success){
                setToken(data.token)
                localStorage.setItem('token', data.token)
                
                const role = mode === 'Admin Login' ? 'admin' : 'user';
                localStorage.setItem('role', role);

                if (data.user && data.user.name) {
                   localStorage.setItem('userName', data.user.name);
                }
                axios.defaults.headers.common['Authorization'] = data.token;
                toast.success('Successfully authenticated!');
                
                // Redirect based on role
                window.location.href = role === 'admin' ? '/admin' : '/user-dashboard';
            } else {
                toast.error(data.message || 'Authentication failed.');
            }
        } catch (error) {
            toast.error(error.message || 'API endpoint not found. Please implement backend.');
        }
    }
    
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
        <div className='w-full max-w-md p-10 bg-white border border-gray-200'>
            <div className='flex flex-col items-center justify-center text-center'>
                 <div className='w-full mb-10'>
                    <span className='text-3xl font-bold tracking-tighter text-gray-900 inline-block mb-4' style={{ fontFamily: "'Prata', serif" }}>
                        OAK<span className='text-primary'>&</span>IRON
                    </span>
                    <h1 className='text-xs uppercase tracking-widest font-semibold text-gray-400 mb-2'>Portal Access</h1>
                 </div>
                 
                 <div className='flex gap-4 mb-10 w-full justify-center border-b border-gray-200 pb-2'>
                    {['User Login', 'Admin Login'].map(tab => (
                        <button 
                            key={tab}
                            type="button"
                            onClick={() => setMode(tab)}
                            className={`uppercase tracking-widest text-[9px] font-bold pb-2 border-b-2 transition-colors duration-300 ${(mode === tab || (mode === 'User Register' && tab === 'User Login')) ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-900'}`}
                        >
                            {tab === 'User Login' ? 'User' : 'Admin'}
                        </button>
                    ))}
                 </div>
                 
                 <form onSubmit={handleSubmit} className='w-full text-left'>
                    {mode === 'User Register' && (
                        <div className='flex flex-col mb-8'>
                            <label className='uppercase tracking-widest text-[10px] font-bold text-gray-500 mb-2'>Full Name</label>
                            <input 
                                onChange={e => setName(e.target.value)} 
                                value={name} 
                                type="text" 
                                required 
                                placeholder='John Doe' 
                                className='border-b border-gray-300 py-2 outline-none text-gray-900 font-light focus:border-gray-900 transition-colors placeholder-gray-300'
                            />
                        </div>
                    )}
                    
                    <div className='flex flex-col mb-8'>
                        <label className='uppercase tracking-widest text-[10px] font-bold text-gray-500 mb-2'>Email Address</label>
                        <input 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                            type="email" 
                            required 
                            placeholder='name@example.com' 
                            className='border-b border-gray-300 py-2 outline-none text-gray-900 font-light focus:border-gray-900 transition-colors placeholder-gray-300'
                        />
                    </div>
                    
                    <div className='flex flex-col mb-10'>
                        <label className='uppercase tracking-widest text-[10px] font-bold text-gray-500 mb-2'>Password</label>
                        <input 
                            onChange={e => setPassword(e.target.value)} 
                            value={password} 
                            type="password" 
                            required 
                            placeholder='••••••••' 
                            className='border-b border-gray-300 py-2 outline-none text-gray-900 font-light focus:border-gray-900 transition-colors placeholder-gray-300'
                        />
                    </div>
                    
                    <button 
                        type='submit' 
                        className='w-full py-4 uppercase tracking-widest text-xs font-bold bg-gray-900 text-white cursor-pointer hover:bg-primary transition-colors duration-300 mb-6'
                    >
                        {mode === 'User Register' ? 'Create Account' : 'Sign In'}
                    </button>

                    {(mode === 'User Login' || mode === 'User Register') && (
                        <div className='text-center'>
                            {mode === 'User Login' ? (
                                <p className='text-xs text-gray-500 font-light'>
                                    Don't have an account?{' '}
                                    <span onClick={() => setMode('User Register')} className='font-bold text-gray-900 cursor-pointer hover:underline'>Sign up</span>
                                </p>
                            ) : (
                                <p className='text-xs text-gray-500 font-light'>
                                    Already have an account?{' '}
                                    <span onClick={() => setMode('User Login')} className='font-bold text-gray-900 cursor-pointer hover:underline'>Login</span>
                                </p>
                            )}
                        </div>
                    )}
                 </form>
            </div>
        </div>
    </div>
  )
}

export default Login