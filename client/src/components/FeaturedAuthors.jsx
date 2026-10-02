import React from 'react'

const FeaturedAuthors = () => {
    const authors = [
        { name: 'Elena Rostova', role: 'Culture Editor', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
        { name: 'Julian Hayes', role: 'Tech Correspondent', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' },
        { name: 'Sophia Chen', role: 'Design Analyst', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
        { name: 'Marcus Cole', role: 'Philosophy Contributor', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' }
    ];

  return (
    <div className='py-24 px-6 sm:px-12 lg:px-16 bg-gray-50 border-b border-gray-200'>
        <div className='max-w-7xl mx-auto'>
            <div className='flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-6'>
                <div>
                    <h2 className='text-3xl md:text-4xl text-gray-900 mb-2' style={{ fontFamily: "'Prata', serif" }}>Featured Voices</h2>
                    <p className='text-gray-500 font-light'>The brilliant minds shaping our narratives.</p>
                </div>
                <button className='mt-6 md:mt-0 uppercase tracking-widest text-xs font-bold text-gray-900 hover:text-primary transition-colors'>
                    View All Authors →
                </button>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
                {authors.map((author, index) => (
                    <div key={index} className='flex flex-col items-center text-center group cursor-pointer'>
                        <div className='w-32 h-32 rounded-full overflow-hidden mb-6 border border-gray-200 group-hover:border-primary transition-colors duration-500'>
                            <img 
                                src={author.image} 
                                alt={author.name} 
                                className='w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out'
                            />
                        </div>
                        <h3 className='text-xl text-gray-900 mb-1 transition-colors group-hover:text-primary' style={{ fontFamily: "'Prata', serif" }}>{author.name}</h3>
                        <p className='uppercase tracking-widest text-[10px] font-bold text-gray-400'>{author.role}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default FeaturedAuthors
