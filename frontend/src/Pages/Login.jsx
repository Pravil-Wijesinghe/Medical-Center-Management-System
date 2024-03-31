/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import bgImage2 from '../Images/bgImage2.png'
import { Button } from '../Components/Button'

export default function Login() {
    return (
        <div className='flex items-center justify-center' style={{backgroundImage: `url(${bgImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div style={{fontFamily: "Montserrat, sans-serif",}} className='bg-white flex h-850 rounded-lg '>
                <div className='p-6 flex flex-col gap-3'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-semibold'>Log in</h1>
                        <h2 className='text-lg font-normal text-gray-600'>Welcome back! Please enter your details.</h2>
                    </div>
                    <div>
                        <h2 className='text-xl font-medium'>NIC Number</h2>
                        <input type='text' className='w-full rounded-md border-2 h-9' placeholder='Enter your NIC number here'/>
                    </div>
                    <div>
                        <h2 className='text-xl font-medium'>Password</h2>
                        <input type='password' className='w-full rounded-md border-2 h-9' placeholder='Enter your password'/>
                    </div>
                    <div className='flex justify-between'>
                        <div className='text-left'>
                            <input type='checkbox'/>
                            <label>Remember me</label>
                        </div>
                        <div className='text-right'>
                            <Button className='text-custom-lightGreen'>Forgot Password?</Button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full">Log in</Button>
                        <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                    </div>
                    <div className='flex text-center justify-center gap-2'>
                        <h3 className='text-lg'>Don't have an account?</h3>
                        <Button className='text-custom-lightGreen text-lg'>Sign up</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
