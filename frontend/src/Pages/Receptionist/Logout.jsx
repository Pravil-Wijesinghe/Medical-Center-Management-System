import React from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../../Components/Background';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Button } from '../../Components/Button';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';

function Logout() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/PatientProfile');
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');

    // Redirect to home page
    navigate('/home');
  };

  return (
    <div className='relative text-white font-montserrat'>
      <Background/>
      <div className='fixed -mt-[300px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <ReceptionistNavBar/>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='absolute top-[27%] bg-white text-black flex flex-col w-[68%] h-fit rounded-3xl'>
            <div className='relative bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-semibold text-white'>Logout</h2>
            </div>
            <div className='relative flex flex-col items-center mt-[60px] pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <ArrowRightOnRectangleIcon className='w-16 h-16'/>
                    <p>Are you sure, you want to log out?</p>
                </div>
                <div className='flex flex-row items-center justify-center px-60 w-full gap-4 mt-8'>
                  <div className='w-1/2'>
                    <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full" onClick={handleCancel}>Cancel</Button>
                  </div>
                  <div className='w-1/2'>
                    <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen" onClick={handleLogout}>Logout</Button>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Logout;
