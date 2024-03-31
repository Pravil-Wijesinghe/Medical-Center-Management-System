import React from 'react'
import bgImage2 from '../Images/bgImage2.png'
import { Button } from '../Components/Button'
import { ChevronLeftIcon } from '@heroicons/react/outline';

export default function Signup() {
  return (
    //background image
    <div style={{backgroundImage: `url(${bgImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div className='flex'>
                <Button className='flex text-white m-4'> 
                    <ChevronLeftIcon className='h-6 w-6'/>
                    Home page
                </Button>
            </div>
            <div className='flex items-center justify-center'>
            {/* login rectangle */}
                <div style={{fontFamily: "Montserrat, sans-serif",}} className='bg-white flex h-850 rounded-3xl w-600 '>
                    {/* Login form */}
                    
                </div>
            </div>
        </div>
  )
}
