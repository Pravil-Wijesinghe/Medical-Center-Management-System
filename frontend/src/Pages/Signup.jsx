import React from 'react'
import bgImage2 from '../Images/bgImage2.png'
import { Button } from '../Components/Button'
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
  return (
    //background image
    <div style={{backgroundImage: `url(${bgImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', fontFamily: "Montserrat, sans-serif" }}>
            <div className='flex'>
                <Button onClick={()=>navigate("/home")} className='flex text-white m-4'> 
                    <ChevronLeftIcon className='h-6 w-6'/>
                    Home page
                </Button>
            </div>
            <div className='flex items-center justify-center h-850'>
            {/* signup rectangle */}
                <div className='bg-white flex w-[400px] h-[550px] rounded-3xl mt-4 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
                    {/* signup form */}
                    <div  className='p-5 mx-auto flex flex-col gap-3'>
                        <div className='text-center my-1'>
                            <h1 className='text-2xl font-bold mb-1'>Sign up</h1>
                            <h2 className='text-base font-normal text-gray-600'>Create an account to continue</h2>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>First Name</h2>
                            <input type='text' className='rounded-md border-2 h-9 w-[340px] p-2' placeholder='Enter your first name'/>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Last Name</h2>
                            <input type='text' className='rounded-md border-2 h-9 w-[340px] p-2' placeholder='Enter your last name'/>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>NIC Number</h2>
                            <input type='text' className='rounded-md border-2 h-9 w-[340px] p-2' placeholder='Enter your NIC number'/>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Mobile Number</h2>
                            <input type='text' className='rounded-md border-2 h-9 w-[340px] p-2' placeholder='Enter your mobile number'/>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Email(Optional)</h2>
                            <input type='text' className='rounded-md border-2 h-9 w-[340px] p-2' placeholder='Enter your email'/>
                        </div>
                        <div className='mt-3'>
                            <div className='flex gap-20'>
                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Date of Birth</h2>
                                <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Gender</h2>
                            </div>
                            <div className='flex gap-5'>
                                <input type='date' className='rounded-md border-2 h-9 w-[175px] p-2'/>
                                <select id='gender' className='rounded-md border-2 h-9 w-[140px] p-2'>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Password</h2>
                            <div>
                                <input type='password' className='w-full rounded-md border-2 h-9 p-2' placeholder='Enter your password'/>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Re-enter Password</h2>
                            <div>
                                <input type='password' className='w-full rounded-md border-2 h-9 p-2' placeholder='Re-enter your password'/>
                            </div>
                        </div>
                        <div className='flex text-left text-sm justify-center my-1'>
                            <label>
                                <input className='mr-0.5' type='checkbox'/>I agree to the processign of personal data
                            </label>
                        </div>
                        <div className='flex flex-col gap-y-3 pb-11'>
                            <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Sign up</Button>
                            <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
