/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import bgImage2 from '../Images/bgImage2.png'
import { Button } from '../Components/Button'
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import validation from '../Validation/LoginValidation'

export default function Login() {
    const navigate = useNavigate();

    const [values, setvalues] = useState({
        nic: '',
        password: '',
    });

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        const { name, value } = event.target;
        setvalues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }       

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
    }

    return (
        //background image
        <div style={{backgroundImage: `url(${bgImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', fontFamily: "Montserrat, sans-serif", }}>
            <div className='flex'>
                <Button onClick={()=> navigate("/home")} className='flex text-white m-4'> 
                    <ChevronLeftIcon className='h-6 w-6'/>
                    Home page
                </Button>
            </div>
            <div className='flex items-center justify-center'>
            {/* login rectangle */}
                <div className='bg-white flex h-[560px] rounded-3xl w-[400px] mt-4 '>
                    {/* Login form */}
                    <form onSubmit={handleSubmit} className='p-6 mx-3 flex flex-col gap-2'> 
                        {/* Title */}
                        <div className='text-center my-1'>
                            <h1 className='text-2xl font-bold mb-1'>Log in</h1>
                            <h2 className='text-base font-normal text-gray-600'>Welcome back! Please enter your details.</h2>
                        </div>
                        {/* NIC Number */}
                        <div>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>NIC Number</h2>
                            <input onChange={handleInput} type='text' name='nic' className='w-full rounded-md border-2 h-9 p-2' placeholder='Enter your NIC number here'/>
                            {errors.nic && <span className='text-red-500 text-xs'>{errors.nic}</span>}
                        </div>
                        {/* Password */}
                        <div>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Password</h2>
                            <div>
                                <input onChange={handleInput} type='password' name='password' className='w-full rounded-md border-2 h-9 p-2' placeholder='Enter your password'/>
                                {errors.password && <span className='text-red-500 text-xs'>{errors.password}</span>}
                            </div>
                        </div>
                        {/* Remember me and Forgot password */}
                        <div className='flex justify-between mt-2 ml-2 mr-2'>
                            <div className='flex text-left'>
                                <label><input className='mr-0.5' type='checkbox'/>Remember me</label>
                            </div>
                            <div className='text-right'>
                                <Button className='text-custom-lightGreen hover:text-custom-darkGreen'>Forgot Password?</Button>
                            </div>
                        </div>
                        {/* Login and Cancel Button */}
                        <div className='flex flex-col gap-y-3 mt-5'>
                            <Button type='submit' className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Log in</Button>
                            <Button type='reset' className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                        </div>
                        {/* Don't have an account */}
                        <div className='flex text-center justify-center gap-2 my-6'>
                            <h3 className='text-lg'>Don't have an account?</h3>
                            <Button onClick={()=>navigate("/signup")} className='text-custom-lightGreen text-lg hover:text-custom-darkGreen'>Sign up</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
