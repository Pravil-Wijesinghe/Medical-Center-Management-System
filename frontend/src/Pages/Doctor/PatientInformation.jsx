import React from 'react';
import DoctorNavBar from '../../Components/DoctorNavBar';
import Background from '../../Components/Background';
import { Button } from '../../Components/Button';
import {FunnelIcon} from '@heroicons/react/20/solid';

function PatientInformation() {
  return (
    <div className='relative text-white font-montserrat'>
      <Background/>  
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <DoctorNavBar/>
      </div>
      <div className='flex items-center justify-center'>
        <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
            <div className='relative bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-semibold text-white'>Patient Information</h2>
            </div>
            <div className='relative flex flex-col mt-[60px] pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
              <div className='flex flex-row items-center w-full px-10 gap-10'>
                <h3 className='font-medium w-[250px]'>Select Date:</h3>
                <div>
                  <input type='date' className='rounded-md border-2 h-9 w-60 p-2 outline-none' name='DOB'/>
                </div>
                <Button className='flex flex-row items-center justify-center gap-1 bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md h-9 w-full hover:bg-custom-blackGreen'>
                  <FunnelIcon className='h-[18px]'/>
                  Filter
                </Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PatientInformation
