import React from 'react';
import Background from '../../Components/Background';
import DoctorNavBar from '../../Components/DoctorNavBar';
import {TimePickerComponent} from '@syncfusion/ej2-react-calendars';
import {Button} from '../../Components/Button';

function Availability() {
  
  return (
    <div className='relative text-white font-montserrat'>
      <Background/>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <DoctorNavBar/>
      </div>
      <div className='flex items-center justify-center'>
        <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
            <div className='relative bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-semibold text-white'>Doctor Availability</h2>
            </div>
            <div className='relative flex flex-col items-center gap-4 mt-[60px] pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
              <h3 className='text-xl font-semibold text-black'>Request Available Time</h3>
              <div className='flex flex-row items-center gap-4'>
                <h3 className='text-lg w-32'>Date :</h3>
                <input type='date' className='rounded-md border-2 h-9 w-60 p-2 outline-none' />
              </div>
              <div className='flex flex-row items-center gap-4'>
                <h3 className='text-lg w-32'>Availability :</h3>
                <div className='flex flex-row gap-2 w-60'>
                  <input
                    type='checkbox'
                    name='forFamilyMembers'
                    id='forFamilyMembers'
                  />
                  <h2 className='text-base font-semibold mb-0.5'>Not Available</h2>
              </div>
              </div>
              <div className='flex flex-row items-center justify-center gap-4 w-full'>
                <h3 className='text-lg w-32'>Start Time :</h3>
                <div className='flex items-center justify-center rounded-md border-2 h-9 w-60 p-2 outline-none'>
                  <TimePickerComponent placeholder='Select a time'></TimePickerComponent>
                </div>
              </div>
              <div className='flex flex-row items-center justify-center gap-4 w-full'>
                <h3 className='text-lg w-32'>Close Time :</h3>
                <div className='flex items-center justify-center rounded-md border-2 h-9 w-60 p-2 outline-none'>
                  <TimePickerComponent placeholder='Select a time'></TimePickerComponent>
                </div>
              </div>
              <div className='flex flex-row justify-center gap-4 w-full'>
                <h3 className='text-lg w-32'>Note :</h3>
                <textarea className='w-60 h-20 rounded-md border-2 p-2 outline-none'></textarea>
              </div>
              <div className='flex flex-row justify-center gap-4 w-full'>
                <Button className='w-32 outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md'>Cancel</Button>
                <Button className='w-32 bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md hover:bg-custom-blackGreen'>Send</Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Availability
