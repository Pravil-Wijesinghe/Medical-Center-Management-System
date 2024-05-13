import React from 'react'
import Background from '../../Components/Background.jsx';
import PatientNavBar from '../../Components/PatientNavBar.jsx';

function Profile() {
  return (
    <div className='relative'>
      <Background/>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
            <PatientNavBar/>
      </div>
    </div>
  )
}

export default Profile
