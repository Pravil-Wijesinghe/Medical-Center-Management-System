import React from 'react'
import Background from '../../Components/Background';
import DoctorNavBar from '../../Components/DoctorNavBar';

function Profile() {
  return (
    <div className='relative text-white font-montserrat'>
      <Background/>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <DoctorNavBar/>
      </div>
    </div>
  )
}

export default Profile;
