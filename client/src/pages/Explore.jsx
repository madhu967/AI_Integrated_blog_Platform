import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogCard from '../components/BlogCard'
import { useAppContext } from '../context/AppContext'
import { blogCategories } from '../assets/assets'
import { motion } from "motion/react"

const Explore = () => {
    const [menu, setMenu] = useState("All");
    const {blogs, input} = useAppContext();

    const filterdBogs = () => {
        const blogsWithImages = blogs.filter(blog => blog.image && blog.image.trim() !== '');
        
        if(input === ''){
            return blogsWithImages;
        }
        return blogsWithImages.filter((blog) => 
            blog.title.toLowerCase().includes(input.toLowerCase()) || 
            blog.category.toLowerCase().includes(input.toLowerCase())
        );
    }

  return (
    <>
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16 min-h-[70vh]">
            <div className="mb-16 border-b border-gray-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8 mt-10">
                <div>
                    <h1 className="text-5xl text-gray-900 mb-4" style={{ fontFamily: "'Prata', serif" }}>
                        All Essays
                    </h1>
                    <p className="text-gray-500 font-light text-lg">An unfiltered look at our complete collection of narratives.</p>
                </div>
                
                <div className='flex flex-wrap gap-6 relative'>
                    {blogCategories.map((item) => (
                        <div key={item} className='relative'>
                            <button 
                                onClick={() => setMenu(item)} 
                                className={`cursor-pointer text-xs uppercase tracking-widest font-semibold transition-colors duration-300 pb-2 ${menu === item ? 'text-primary' : 'text-gray-400 hover:text-gray-900'}`}
                            >
                                {item}
                                {menu === item && (
                                    <motion.div 
                                        layoutId='explore_underline'
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        className='absolute left-0 right-0 bottom-0 h-[2px] bg-primary'
                                    />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mb-24'>
                {filterdBogs()
                    .filter((blog) => menu === "All" ? true : blog.category === menu)
                    .map((blog) => <BlogCard key={blog._id} blog={blog} />)
                }
            </div>
            
            {filterdBogs().length === 0 && (
                <div className='text-center py-20'>
                    <h3 className='text-2xl text-gray-400 font-light' style={{ fontFamily: "'Prata', serif" }}>No essays found matching your search.</h3>
                </div>
            )}
        </div>
        
        <Footer />
    </>
  )
}

export default Explore
