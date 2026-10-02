import React, { useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import blog_pic_1 from '../assets/blog_pic_1.png'

const Header = () => {
  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <header className="relative bg-white w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex">
              <span className="uppercase tracking-widest text-[10px] font-bold text-primary border-b-2 border-primary pb-1">
                The Premier AI-Enhanced Editorial
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 leading-tight mb-8" style={{ fontFamily: "'Prata', serif" }}>
              Write boldly. <br />
              Publish <span className="font-bold text-primary italic">brilliantly.</span>
            </h1>
            
            <p className="text-lg text-gray-500 max-w-lg mb-10 leading-relaxed font-light">
              Oak & Iron is a sanctuary for modern storytellers. Leverage our cutting-edge AI assistant to seamlessly draft, refine, and perfect your essays before sharing them with the world.
            </p>
            
            <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <div className="relative flex-grow">
                <input 
                  ref={inputRef} 
                  className="w-full pb-3 text-lg bg-transparent border-b border-gray-300 outline-none focus:border-primary transition-colors text-gray-800 placeholder-gray-400" 
                  type="text" 
                  placeholder="Discover essays & insights..." 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="bg-gray-900 hover:bg-primary text-white px-8 py-3 uppercase tracking-widest text-xs font-bold transition-colors duration-300"
              >
                Explore
              </button>
            </form>
            
            {input && (
              <div className="mt-4">
                <button 
                  onClick={onClear} 
                  className="text-xs text-gray-400 hover:text-gray-800 uppercase tracking-widest underline transition-colors"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Premium Imagery */}
          <div className="hidden lg:block relative h-[600px] w-full group overflow-hidden">
            <div className="absolute inset-0 bg-gray-100 transform -skew-x-3 translate-x-4"></div>
            <img 
              src={blog_pic_1} 
              alt="Elegant writing desk" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header