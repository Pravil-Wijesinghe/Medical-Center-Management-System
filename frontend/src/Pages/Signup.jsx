import React, { useState } from 'react';
import bgImage2 from '../Images/bgImage2.png';
import { Button } from '../Components/Button';
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nicNumber: '',
        mobileNumber: '',
        email: '',
        dateOfBirth: '',
        gender: 'Male',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Sign-up successful');
                navigate('/login');
            } else {
                const errorData = await response.json();
                alert(`Sign-up failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{backgroundImage: `url(${bgImage2})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', fontFamily: "Montserrat, sans-serif" }}>
            <div className='flex'>
                <Button onClick={()=>navigate("/home")} className='flex text-white m-4'>
                    <ChevronLeftIcon className='h-6 w-6'/>
                    Home page
                </Button>
            </div>
            <div className='flex items-center justify-center h-850'>
                <div className='bg-white flex w-[400px] h-[550px] rounded-3xl mt-4 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
                    <form className='p-5 mx-auto flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className='text-center my-1'>
                            <h1 className='text-2xl font-bold mb-1'>Sign up</h1>
                            <h2 className='text-base font-normal text-gray-600'>Create an account to continue</h2>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>First Name</h2>
                            <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} className='rounded-md border-2 h-9 w-[340px] p-2 outline-none' placeholder='Enter your first name' required/>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Last Name</h2>
                            <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} className='rounded-md border-2 h-9 w-[340px] p-2 outline-none' placeholder='Enter your last name' required/>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>NIC Number</h2>
                            <input type='text' name='nicNumber' value={formData.nicNumber} onChange={handleChange} className='rounded-md border-2 h-9 w-[340px] p-2 outline-none' placeholder='Enter your NIC number' required/>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Mobile Number</h2>
                            <input type='text' name='mobileNumber' value={formData.mobileNumber} onChange={handleChange} className='rounded-md border-2 h-9 w-[340px] p-2 outline-none' placeholder='Enter your mobile number'/>
                        </div>
                        <div className='mt-3'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Email</h2>
                            <input type='text' name='email' value={formData.email} onChange={handleChange} className='rounded-md border-2 h-9 w-[340px] p-2 outline-none' placeholder='Enter your email'/>
                        </div>
                        <div className='mt-3'>
                            <div className='flex gap-20'>
                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Date of Birth</h2>
                                <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Gender</h2>
                            </div>
                            <div className='flex gap-5'>
                                <input type='date' name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange} className='rounded-md border-2 h-9 w-[175px] p-2 outline-none' required/>
                                <select id='gender' name='gender' value={formData.gender} onChange={handleChange} className='rounded-md border-2 h-9 w-[140px] p-2 outline-none' required>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-3 relative'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Password</h2>
                            <input type={showPassword ? 'text' : 'password'} name='password' value={formData.password} onChange={handleChange} className='w-full rounded-md border-2 h-9 p-2 outline-none' placeholder='Enter your password' required/>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 cursor-pointer" onClick={toggleShowPassword}>
                                {showPassword ? <EyeSlashIcon className="h-6 w-6 text-gray-700" /> : <EyeIcon className="h-6 w-6 text-gray-700" />}
                            </div>
                        </div>
                        <div className='mt-3 relative'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Re-enter Password</h2>
                            <input type={showPassword ? 'text' : 'password'} name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} className='w-full rounded-md border-2 h-9 p-2 outline-none' placeholder='Re-enter your password' required/>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 cursor-pointer" onClick={toggleShowPassword}>
                                {showPassword ? <EyeSlashIcon className="h-6 w-6 text-gray-700" /> : <EyeIcon className="h-6 w-6 text-gray-700" />}
                            </div>
                        </div>
                        <div className='flex text-left text-sm justify-center my-1'>
                            <label>
                                <input className='mr-0.5' type='checkbox' required/>I agree to the processing of personal data
                            </label>
                        </div>
                        <div className='flex flex-col gap-y-3 pb-11'>
                            <Button type="submit" className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Sign up</Button>
                            <Button type="button" onClick={() => navigate('/home')} className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
