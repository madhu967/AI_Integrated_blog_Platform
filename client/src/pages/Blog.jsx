import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment'
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
  const {id} = useParams();
  const {axios} = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async () => {
    try {
      const {data} = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const {data} = await axios.post('/api/blog/comments', {blogId: id})
      if(data.success){
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/blog/add-comment', {blog: id, name, content});
      if(data.success){
        toast.success(data.message);
        setName('')
        setContent('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
      fetchBlogData();
      fetchComments();
  }, [])

  return data ? (
    <div className='relative bg-white'>
      <Navbar />

      <div className='text-center mt-24 mb-16 px-6'>
         <p className='uppercase tracking-widest text-[10px] font-bold text-gray-500 mb-6'>
            Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
         </p>
         <h1 className='text-4xl md:text-6xl text-gray-900 max-w-4xl mx-auto leading-tight mb-8' style={{ fontFamily: "'Prata', serif" }}>
            {data.title}
         </h1>
         <h2 className='text-xl md:text-2xl font-light text-gray-500 max-w-3xl mx-auto mb-10'>
            {data.subTitle}
         </h2>
         <div className='flex items-center justify-center gap-4'>
            <div className='w-10 h-1 bg-primary'></div>
            <p className='uppercase tracking-widest text-xs font-bold text-gray-900'>Michael Brown</p>
         </div>
      </div>

      <div className='max-w-5xl mx-auto px-6 mb-24'>
          <div className='w-full overflow-hidden mb-16 bg-gray-100'>
              <img src={data.image} className='w-full aspect-video object-cover filter grayscale-[10%]' alt={data.title} />
          </div>
          
          <div className='rich-text max-w-3xl mx-auto text-lg leading-loose text-gray-800' style={{ fontFamily: "'Prata', serif" }} dangerouslySetInnerHTML={{__html: data.description}}></div>

          <div className='max-w-3xl mx-auto mt-24 pt-12 border-t border-gray-200'>
            <h3 className='text-2xl text-gray-900 mb-10' style={{ fontFamily: "'Prata', serif" }}>Discussions ({comments.length})</h3>
            
            <div className='flex flex-col gap-8 mb-16'>
              {comments.map((item, index) => (
                <div key={index} className='bg-gray-50 p-6 border border-gray-200 text-gray-800 relative'>
                  <div className='flex justify-between items-start mb-4 border-b border-gray-200 pb-4'>
                    <p className='uppercase tracking-widest text-xs font-bold text-gray-900'>{item.name}</p>
                    <span className='text-[10px] text-gray-400 uppercase tracking-widest'>{Moment(item.createdAt).fromNow()}</span>
                  </div>
                  <p className='text-sm leading-relaxed font-light italic'>"{item.content}"</p>
                </div>
              ))}
            </div>
            
            <div className='bg-white border border-gray-200 p-8'>
                <h4 className='uppercase tracking-widest text-xs font-bold text-gray-900 mb-8'>Leave a Reply</h4>
                
                {localStorage.getItem('token') ? (
                  <form onSubmit={addComment} className='flex flex-col gap-6'>
                    <div>
                      <input 
                          onChange={(e) => setName(e.target.value)} 
                          value={name} 
                          type="text" 
                          placeholder='Your Name' 
                          required  
                          className='w-full pb-3 border-b border-gray-300 outline-none focus:border-gray-900 transition-colors placeholder-gray-400 font-light text-gray-900'
                      />
                    </div>
                    <div>
                      <textarea 
                          onChange={(e) => setContent(e.target.value)} 
                          value={content} 
                          placeholder='Join the discussion...' 
                          className='w-full p-4 border border-gray-300 outline-none focus:border-gray-900 transition-colors h-32 placeholder-gray-400 font-light text-gray-900' 
                          required
                      ></textarea>
                    </div>
                    <button type='submit' className='uppercase tracking-widest text-xs font-bold bg-gray-900 text-white py-4 px-8 hover:bg-primary transition-colors duration-300 w-full sm:w-auto self-start cursor-pointer'>
                        Submit Reply
                    </button>
                  </form>
                ) : (
                  <div className='text-center py-8 bg-gray-50 border border-gray-100'>
                     <p className='text-gray-500 font-light mb-4'>You must be a registered member to join the discussion.</p>
                     <button onClick={() => window.location.href='/admin'} className='uppercase tracking-widest text-xs font-bold text-gray-900 border-b border-gray-900 pb-1 hover:text-primary hover:border-primary transition-colors'>Sign in or Register here</button>
                  </div>
                )}
            </div>
          </div>

          <div className='max-w-3xl mx-auto my-24 border-t border-gray-200 pt-12 flex flex-col items-center'>
            <p className='uppercase tracking-widest text-[10px] font-bold text-gray-500 mb-6'>Share this essay</p>
            <div className='flex gap-4'>
              <img src={assets.facebook_icon} className="w-10 hover:opacity-70 transition-opacity cursor-pointer" alt="Facebook" />
              <img src={assets.twitter_icon} className="w-10 hover:opacity-70 transition-opacity cursor-pointer" alt="Twitter" />
              <img src={assets.googleplus_icon} className="w-10 hover:opacity-70 transition-opacity cursor-pointer" alt="Google" />
            </div>
          </div>
      </div>
      <Footer />
    </div>
  ) : <Loader />
}

export default Blog