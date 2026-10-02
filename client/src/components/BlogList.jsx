import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import { motion } from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const {blogs, input} = useAppContext()

    const filterdBogs = () => {
        const blogsWithImages = blogs.filter(blog => blog.image && blog.image.trim() !== '');
        
        if(input === ''){
            return blogsWithImages 
        }
        return blogsWithImages.filter((blog) => 
            blog.title.toLowerCase().includes(input.toLowerCase()) || 
            blog.category.toLowerCase().includes(input.toLowerCase())
        )
    }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16">
        
        <div className="mb-16 border-b border-gray-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
                <h2 className="text-4xl text-gray-900 mb-2" style={{ fontFamily: "'Prata', serif" }}>
                    Selected Writings
                </h2>
                <p className="text-gray-500 font-light">Explore our latest essays, thoughts, and perspectives.</p>
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
                                    layoutId='underline'
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    className='absolute left-0 right-0 bottom-0 h-[2px] bg-primary'
                                />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mb-16'>
            {filterdBogs()
                .slice(0, 6)
                .filter((blog) => menu === "All" ? true : blog.category === menu)
                .map((blog) => <BlogCard key={blog._id} blog={blog} />)
            }
        </div>
        
        <div className="flex justify-center mb-24">
            <button 
                onClick={() => window.location.href = '/explore'} 
                className="uppercase tracking-widest text-xs font-bold px-10 py-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
                View More Essays
            </button>
        </div>
    </div>
  )
}

export default BlogList