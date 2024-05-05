import React from 'react'
import bgImage1 from '../Images/bgImage1.png'
import bgImage2 from '../Images/bgImage2.png'
import NavBar from '../Components/NavBar'


function Home() {
  return (
    <div style={{fontFamily: "Montserrat, sans-serif",}} className='bg-gradient-to-r from-custom-darkGreen to-custom-blackGreen w-full h-full relative opacity-95'>
      {/* <img src={bgImage1} alt='BackgroundImage' className='w-full h-screen object-cover' /> */}
      <div style={{ backgroundImage: `url(${bgImage1})` }} className='w-full h-screen bg-top bg-cover bg-no-repeat relative'>
          <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
            <NavBar/>
          </div>
          <div className='pl-[350px] pt-[200px]'>
            <h2 className='text-6xl font-400 pb-1'>Welcome to</h2>
            <h2 className='text-6xl font-semibold pb-5'>Med Connect</h2>
            <p className='text-lg font-medium w-[420px] text-justify'>
            Welcome to Med Connect! We are excited to introduce our state-of-the-art Medical Center Management System, designed to 
            streamline your healthcare experience. Whether you are a patient seeking efficient appointment scheduling or a healthcare 
            professional aiming to enhance your practice, our system is here to meet your needs.
            </p>
          </div>
      </div>
      <div>
        {/* <img src={bgImage2} alt='BackgroundImage' className='w-full h-[2000px] object-cover mix-blend-overlay'/> */}
        <div style={{ backgroundImage: `URL(${bgImage2})`}} className='w-full h-[2000px] bg-center bg-cover bg-no-repeat mix-blend-overlay'>
        </div>
      </div>
    </div>
  )
}

export default Home
