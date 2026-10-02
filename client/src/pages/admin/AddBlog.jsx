import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked'

const AddBlog = () => {
  const {axios} = useAppContext()
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false);
  const [title, setTilte] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
       e.preventDefault();
       setIsAdding(true);

       const blog = {
        title, subTitle, description: quillRef.current.root.innerHTML,
        category, isPublished
       }

       const formData = new FormData();
       formData.append('blog', JSON.stringify(blog))
       formData.append('image', image);
     
       const {data} = await axios.post('/api/blog/add', formData);

       if(data.success){
        toast.success(data.message);
        setImage(false)
        setTilte('');
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
       } else {
        toast.error(data.message);
       }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  }

  const generateContent = async () => {
    if(!title) return toast.error('Please enter a title');
    try {
      setLoading(true);
      const {data} = await axios.post('/api/blog/generate', {prompt: title})
      if(data.success){
        quillRef.current.root.innerHTML = parse(data.content)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
       if(!quillRef.current && editorRef.current){
        quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
       }
  }, [])
  
  return (
    <form onSubmit={onSubmitHandler} className='flex-1 lg:px-10 lg:py-6 h-full overflow-y-auto' >
      <div className='flex justify-between items-end mb-8 border-b border-gray-900 pb-4'>
          <h2 className="text-3xl text-gray-900" style={{ fontFamily: "'Prata', serif" }}>Compose Essay</h2>
      </div>

      <div className='bg-white w-full max-w-4xl p-8 border border-gray-200'>
        <label className='uppercase tracking-widest text-[10px] font-bold text-gray-500 block mb-2'>Cover Image</label>
        <label htmlFor="image" className='block mb-8'>
          <div className='w-48 h-32 border border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-gray-900 transition-colors'>
             <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className={!image ? 'w-10 opacity-40' : 'w-full h-full object-cover'} alt="" />
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>
        
        <div className='grid grid-cols-1 gap-8 mb-8'>
          <div>
            <label className='uppercase tracking-widest text-[10px] font-bold text-gray-500 block mb-2'>Title</label>
            <input type="text" placeholder='Enter the main headline...' required className='w-full text-2xl font-light text-gray-900 placeholder-gray-300 border-b border-gray-300 outline-none pb-2 focus:border-gray-900 transition-colors' style={{ fontFamily: "'Prata', serif" }} onChange={e => setTilte(e.target.value)} value={title} />
          </div>
          <div>
            <label className='uppercase tracking-widest text-[10px] font-bold text-gray-500 block mb-2'>Subtitle</label>
            <input type="text" placeholder='Add a brief supporting description...' required className='w-full font-light text-gray-600 placeholder-gray-300 border-b border-gray-300 outline-none pb-2 focus:border-gray-900 transition-colors' onChange={e => setSubTitle(e.target.value)} value={subTitle} />
          </div>
        </div>

        <div className='mb-12'>
          <div className='flex justify-between items-center mb-2'>
             <label className='uppercase tracking-widest text-[10px] font-bold text-gray-500 block'>Body Content</label>
             <button disabled={loading} className='uppercase tracking-widest text-[10px] font-bold px-3 py-1 bg-gray-900 text-white hover:bg-primary transition-colors cursor-pointer flex items-center gap-2' type='button' onClick={generateContent}>
                {loading ? 'Generating...' : '✨ Generate with AI'}
             </button>
          </div>
          <div className='relative border border-gray-300'>
            <div ref={editorRef} className='min-h-[300px] text-gray-800 font-light'></div>
            {loading && (
              <div className='absolute inset-0 flex items-center justify-center bg-white/80 z-10'>
                <div className='w-8 h-8 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin'></div>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-wrap gap-8 items-center border-t border-gray-200 pt-8'>
            <div>
                <label className='uppercase tracking-widest text-[10px] font-bold text-gray-500 block mb-2'>Category</label>
                <select onChange={e => setCategory(e.target.value)} name="category" className='px-4 py-2 border text-gray-600 border-gray-300 outline-none text-sm uppercase tracking-wider font-light bg-transparent focus:border-gray-900 cursor-pointer'>
                  <option value="">Select category</option>
                  {blogCategories.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
            </div>

            <div className='flex items-center gap-3'>
              <label className='uppercase tracking-widest text-[10px] font-bold text-gray-500 cursor-pointer'>Publish Immediately</label>
              <input type="checkbox" checked={isPublished} className='w-4 h-4 cursor-pointer accent-gray-900' onChange={e => setIsPublished(e.target.checked)}/>
            </div>
        </div>

        <div className='mt-10'>
           <button disabled={isAdding} className='uppercase tracking-widest text-xs font-bold px-8 py-4 bg-primary hover:bg-gray-900 text-white transition-colors cursor-pointer w-full sm:w-auto' type='submit'>
             {isAdding ? 'Saving...' : 'Publish Essay'}
           </button>
        </div>
      </div>
    </form>
  )
}

export default AddBlog