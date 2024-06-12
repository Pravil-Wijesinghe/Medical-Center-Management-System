import React from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import {Button} from '../../Components/Button';

function AddAPatient() {
  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
            <ReceptionistNavBar/>
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
            <div className='flex justify-center mt-24 w-full h-fit font-bold text-4xl'>
                Add a Patient
            </div>
            <div className='flex justify-center px-60'>
              <div className='flex items-center justify-center rounded-full bg-white w-32 h-32 overflow-hidden'>
                <input type='file' className='' placeholder='Add Profile Picture'/>
              </div>
            </div>
            <div className='flex flex-col justify-center gap-4'>
              <div className='flex flex-row items-center w-full px-60 gap-4'>
                  <div className='w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>NIC Number</h2>
                      <input
                          type='text'
                          className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                          name='NIC'
                      />
                  </div>
                  <div className='w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>Address</h2>
                      <input
                          type='text'
                          className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                          name='Address'
                      />
                  </div>
              </div>
              <div className='flex flex-row items-center w-full px-60 gap-4'>
                  <div className='w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>First Name</h2>
                      <input
                          type='text'
                          className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                          name='First_Name'
                      />
                  </div>
                  <div className='flex flex-col w-1/2'>
                      <div className='flex gap-5'>
                          <div className='flex flex-col w-1/2'>
                              <h2 className='text-base  font-semibold mb-0.5 ml-2'>Date of Birth</h2>
                              <input
                                  type='date'
                                  className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                  name='DOB'
                              />
                          </div>
                          <div className='flex flex-col w-1/2'>
                              <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Gender</h2>
                              <select
                                  id='gender'
                                  className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                  name='Gender'
                              >
                                  <option>Male</option>
                                  <option>Female</option>
                              </select>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='flex flex-row items-center w-full px-60 gap-4'>
                  <div className='w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>Last Name</h2>
                      <input
                          type='text'
                          className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                          name='Last_Name'
                      />
                  </div>
                  <div className='w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>Weight</h2>
                      <input
                          type='text'
                          className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                      />
                  </div>
              </div>
              <div className='flex flex-row items-center w-full px-60 gap-4'>
                  <div className='w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>Mobile Number</h2>
                      <input
                          type='text'
                          className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                      />
                  </div>
                  <div className='w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>Height</h2>
                      <input
                          type='text'
                          className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                      />
                  </div>
              </div>
              <div className='flex flex-row items-center w-full px-60 gap-4'>
                  <div className='w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>Email</h2>
                      <input
                          type='text'
                          className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                      />
                  </div>
                  <div className='w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>Blood Group</h2>
                      <input
                          type='text'
                          className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                      />
                  </div>
              </div>
              <div className='flex flex-row items-center w-full px-60 gap-4'>
                  <div className='w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>Password</h2>
                      <input
                          type='password'
                          className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                      />
                  </div>
              </div>
              <div className='flex flex-row items-center justify-center w-full px-60 gap-4 mt-4 mb-12'>
                  <div className='w-1/3'>
                      <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                  </div>
                  <div className='w-1/3'>
                      <Button className="bg-custom-darkGreen border-2 border-custom-darkGreen  text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Add a Patient</Button>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddAPatient
