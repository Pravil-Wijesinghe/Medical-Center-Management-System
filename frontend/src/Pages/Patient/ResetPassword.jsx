import React from 'react'
import Background from '../../Components/Background'
import PatientNavBar from '../../Components/PatientNavBar'

export default function ResetPassword() {
  return (
    <div className='relative text-white font-montserrat'>
      <Background/>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <PatientNavBar/>
      </div>
    </div>
  )
}
