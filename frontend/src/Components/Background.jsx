import React from 'react'
import bgImage2 from '../Images/bgImage2.png';

function Background() {
  return (
    <div className='relative'>
      <img src={bgImage2} alt='' className='absolute object-cover top-0 left-0 w-full h-screen opacity-90 mix-blend-soft-light'/>
      <div className='w-full h-screen bg-gradient-to-r from-custom-darkGreen to-custom-blackGreen'></div>
    </div>
  )
}

export default Background
