import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {
    const {title, description, category, image, _id} = blog;
    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);

    // If there is no image provided, or the image fails to load, remove this blog card entirely
    if (!image || hasError) return null;

  return (
    <div 
      onClick={() => navigate(`/blog/${_id}`)} 
      className='w-full group cursor-pointer flex flex-col h-full'
    >
        <div className='overflow-hidden mb-5 bg-gray-100'>
            <img 
                src={image} 
                onError={() => setHasError(true)}
                className='aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0' 
                alt={title} 
            />
        </div>
        
        <div className='flex flex-col flex-grow'>
            <span className='mb-3 uppercase tracking-widest text-[10px] font-bold text-primary'>
                {category}
            </span>
            
            <h5 className='mb-3 text-2xl text-gray-900 leading-snug transition-colors duration-300 group-hover:text-primary' style={{ fontFamily: "'Prata', serif" }}>
                {title}
            </h5>
            
            <p 
                className='text-sm text-gray-500 leading-relaxed font-light line-clamp-3 mb-4' 
                dangerouslySetInnerHTML={{"__html": description ? description.slice(0, 120) + "..." : ""}}
            ></p>
            
            <div className='mt-auto pt-4 border-t border-gray-100'>
                <span className='text-xs uppercase tracking-wider text-gray-400 font-semibold group-hover:text-gray-900 transition-colors'>
                    Read Article →
                </span>
            </div>
        </div>
    </div>
  )
}

export default BlogCard