import React from 'react'

const NewsLetter = () => {
  return (
    <div className='bg-gray-50 border-t border-b border-gray-200'>
      <div className='max-w-4xl mx-auto flex flex-col items-center justify-center text-center py-24 px-6'>
          <span className='uppercase tracking-[0.2em] text-xs font-bold text-primary mb-4'>
            Stay Updated
          </span>
          <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-6' style={{ fontFamily: "'Prata', serif" }}>
            The latest essays, <br className="hidden md:block"/> delivered directly.
          </h1>
          <p className='md:text-lg text-gray-500 font-light mb-10 max-w-lg leading-relaxed'>
            Subscribe to our weekly dispatch of ideas, narratives, and insights on modern technology and lifestyle.
          </p>
          <form className='flex flex-col sm:flex-row items-center w-full max-w-lg border-b border-gray-900'>
              <input 
                className='w-full bg-transparent outline-none px-2 py-4 text-gray-900 placeholder-gray-400 font-light' 
                type="email" 
                placeholder='Enter your email address' 
                required 
              />
              <button 
                type='submit' 
                className='w-full sm:w-auto mt-4 sm:mt-0 text-gray-900 uppercase tracking-widest text-xs font-bold hover:text-primary transition-colors px-4 py-4 cursor-pointer'
              >
                Subscribe
              </button>
          </form>
      </div>
    </div>
  )
}

export default NewsLetter