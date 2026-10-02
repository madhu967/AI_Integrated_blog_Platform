import React from 'react'

const QuoteSection = () => {
  return (
    <div className='py-24 px-6 bg-white border-b border-gray-200'>
        <div className='max-w-4xl mx-auto text-center'>
            <p className='text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-8'>Daily Insight</p>
            <h2 className='text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-8 italic' style={{ fontFamily: "'Prata', serif" }}>
                "The finest writing is not that which merely informs, but that which forces us to pause and reflect on the very nature of our existence."
            </h2>
            <div className='w-16 h-px bg-primary mx-auto mb-6'></div>
            <p className='uppercase tracking-widest text-xs font-bold text-gray-900'>— The Editors</p>
        </div>
    </div>
  )
}

export default QuoteSection
