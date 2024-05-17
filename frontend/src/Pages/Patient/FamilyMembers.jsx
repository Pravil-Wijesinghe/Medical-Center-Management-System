import React from 'react'
import Background from '../../Components/Background'
import PatientNavBar from '../../Components/PatientNavBar'

function FamilyMembers() {
  return (
    <div className='relative text-white font-montserrat'>
      <Background/>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <PatientNavBar/>
      </div>
      <div className='flex items-center justify-center'>
        <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
            <div className='absolute bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-semibold text-white'>Family Members</h2>
            </div>
        </div>
      </div>
    </div>
  )
}

export default FamilyMembers
