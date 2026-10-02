import React from 'react'
import { footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 sm:px-16 lg:px-24 xl:px-32 bg-gray-900 text-gray-400'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-16 py-20 border-b border-gray-800'>
            
            <div className='max-w-sm'>
                {/* Text Logo for Footer */}
                <span className='text-3xl font-bold tracking-tighter text-white mb-6 inline-block' style={{ fontFamily: "'Prata', serif" }}>
                    OAK<span className='text-primary'>&</span>IRON
                </span>
                <p className='font-light leading-relaxed mt-4 text-gray-500'>
                    A modern editorial space dedicated to the intersection of technology, culture, and profound human narratives. Crafted with absolute elegance.
                </p>
            </div>

            <div className='flex flex-wrap justify-between w-full md:w-1/2 gap-10 lg:gap-5'>
                {footer_data.map((section, index)=>(
                   <div key={index}>
                      <h3 className='font-semibold text-xs uppercase tracking-widest text-white mb-6'>{section.title}</h3>
                      <ul className='text-sm space-y-4 font-light'>
                        {section.links.map((link, i)=>(
                          <li key={i}>
                            <a href="#" className='hover:text-primary transition-colors duration-300'>{link}</a>
                          </li>
                        ))}
                      </ul>
                   </div>
                ))}
            </div>
        </div>
        
        <div className='py-8 flex flex-col md:flex-row justify-between items-center text-xs font-light tracking-wide text-gray-600'>
            <p>Copyright 2026 © OAK & IRON - All Rights Reserved</p>
            <div className='mt-4 md:mt-0 flex gap-6'>
                <a href="#" className='hover:text-white transition-colors'>Privacy Policy</a>
                <a href="#" className='hover:text-white transition-colors'>Terms of Service</a>
            </div>
        </div>
    </div>
  )
}

export default Footer