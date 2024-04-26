/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import bgImage2 from '../Images/bgImage2.png'
import { Button } from '../Components/Button'
import { ChevronLeftIcon } from '@heroicons/react/outline';

export default function Login() {
    return (
        //background image
        <div style={{backgroundImage: `url(${bgImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div className='flex'>
                <Button className='flex text-white m-4'> 
                    <ChevronLeftIcon className='h-6 w-6'/>
                    Home page
                </Button>
            </div>
            <div className='flex items-center justify-center'>
            {/* login rectangle */}
                <div style={{fontFamily: "Montserrat, sans-serif",}} className='bg-white flex h-850 rounded-3xl w-600 '>
                    {/* Login form */}
                    <div className='p-6 mx-3 flex flex-col gap-3'> 
                        {/* Title */}
                        <div className='text-center my-1'>
                            <h1 className='text-3xl font-bold mb-1'>Log in</h1>
                            <h2 className='text-lg font-normal text-gray-600'>Welcome back! Please enter your details.</h2>
                        </div>
                        {/* NIC Number */}
                        <div className='mt-1.5'>
                            <h2 className='text-lg font-semibold mb-0.5'>NIC Number</h2>
                            <input type='text' className='w-full rounded-md border-2 h-9' placeholder='Enter your NIC number here'/>
                        </div>
                        {/* Password */}
                        <div>
                            <h2 className='text-lg font-semibold mb-0.5'>Password</h2>
                            <input type='password' className='w-full rounded-md border-2 h-9' placeholder='Enter your password'/>
                        </div>
                        {/* Remember me and Forgot password */}
                        <div className='flex justify-between mt-2'>
                            <div className='flex text-left'>
                                <label><input className='mr-0.5' type='checkbox'/>Remember me</label>
                            </div>
                            <div className='text-right'>
                                <Button className='text-custom-lightGreen'>Forgot Password?</Button>
                            </div>
                        </div>
                        {/* Login and Cancel Button */}
                        <div className='flex flex-col gap-y-3 mt-5'>
                            <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full">Log in</Button>
                            <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                        </div>
                        {/* Don't have an account */}
                        <div className='flex text-center justify-center gap-2 my-6'>
                            <h3 className='text-lg'>Don't have an account?</h3>
                            <Button className='text-custom-lightGreen text-lg'>Sign up</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
