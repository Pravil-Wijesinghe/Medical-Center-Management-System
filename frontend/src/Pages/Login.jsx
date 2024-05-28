import React, { useState } from 'react';
import bgImage2 from '../Images/bgImage2.png';
import { Button } from '../Components/Button';
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import validateLogin from '../Validation/LoginValidation';

export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ nic: '', password: '' });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateLogin(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                console.log('Sending login request:', values);
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Login successful:', data);
                    localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
                    navigate(data.redirectUrl);
                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{backgroundImage: `url(${bgImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', fontFamily: "Montserrat, sans-serif", }}>
            <div className='flex'>
                <Button onClick={() => navigate("/home")} className='flex text-white m-4'>
                    <ChevronLeftIcon className='h-6 w-6' />
                    Home page
                </Button>
            </div>
            <div className='flex items-center justify-center'>
                <div className='bg-white flex h-[560px] rounded-3xl w-[400px] mt-4 '>
                    <form onSubmit={handleSubmit} className='p-6 mx-3 flex flex-col gap-2'>
                        <div className='text-center my-1'>
                            <h1 className='text-2xl font-bold mb-1'>Log in</h1>
                            <h2 className='text-base font-normal text-gray-600'>Welcome back! Please enter your details.</h2>
                        </div>
                        {errorMessage && <span className='text-red-500 text-xs'>{errorMessage}</span>}
                        <div>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>NIC Number</h2>
                            <input onChange={handleInput} type='text' name='nic' className='w-full rounded-md border-2 h-9 p-2' placeholder='Enter your NIC number here' />
                            {errors.nic && <span className='text-red-500 text-xs'>{errors.nic}</span>}
                        </div>
                        <div className='relative'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Password</h2>
                            <div>
                                <input onChange={handleInput} type={showPassword ? 'text' : 'password'} name='password' className='w-full rounded-md border-2 h-9 p-2' placeholder='Enter your password' />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={toggleShowPassword}>
                                    {showPassword ? <EyeSlashIcon className="h-6 w-6 text-gray-700" /> : <EyeIcon className="h-6 w-6 text-gray-700" />}
                                </div>
                                {errors.password && <span className='text-red-500 text-xs'>{errors.password}</span>}
                            </div>
                        </div>
                        <div className='flex justify-between mt-2 ml-2 mr-2'>
                            <div className='flex text-left'>
                                <label><input className='mr-0.5' type='checkbox' />Remember me</label>
                            </div>
                            <div className='text-right'>
                                <Button className='text-custom-lightGreen hover:text-custom-darkGreen'>Forgot Password?</Button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-3 mt-5'>
                            <Button type='submit' className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Log in</Button>
                            <Button type='reset' className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                        </div>
                        <div className='flex text-center justify-center gap-2 my-6'>
                            <h3 className='text-lg'>Don't have an account?</h3>
                            <Button onClick={() => navigate("/signup")} className='text-custom-lightGreen text-lg hover:text-custom-darkGreen'>Sign up</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
