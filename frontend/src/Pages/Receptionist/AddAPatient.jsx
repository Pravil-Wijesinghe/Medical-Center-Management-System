import React, { useState } from 'react';
import axios from 'axios';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import { Button } from '../../Components/Button';

function AddAPatient() {
  const initialState = {
    NIC: '',
    First_Name: '',
    Last_Name: '',
    DOB: '',
    Gender: 'Male',
    Password: '',
    Address: '',
    Weight: '',
    Height: '',
    Mobile_Number: '',
    Email: '',
    Blood_Group: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/patient/add', formData);
      if (response.status === 200) {
        setSuccessMessage('Patient added successfully');
        setFormData(initialState);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleCancel = () => {
    setFormData(initialState);
  };

  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
            <ReceptionistNavBar />
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
            <div className='flex justify-center mt-24 w-full h-fit font-bold text-4xl'>
                Add a Patient
            </div>
            {successMessage && (
              <div className='flex justify-center text-green-500'>
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className='flex justify-center px-60'>
                <div className='flex items-center justify-center rounded-full bg-white w-32 h-32 overflow-hidden'>
                  <input type='file' className='' placeholder='Add Profile Picture' />
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
                            value={formData.NIC}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Address</h2>
                        <input
                            type='text'
                            className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                            name='Address'
                            value={formData.Address}
                            onChange={handleInputChange}
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
                            value={formData.First_Name}
                            onChange={handleInputChange}
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
                                    value={formData.DOB}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col w-1/2'>
                                <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Gender</h2>
                                <select
                                    id='gender'
                                    className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                    name='Gender'
                                    value={formData.Gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
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
                            value={formData.Last_Name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Weight</h2>
                        <input
                            type='text'
                            className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                            name='Weight'
                            value={formData.Weight}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full px-60 gap-4'>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Mobile Number</h2>
                        <input
                            type='text'
                            className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                            name='Mobile_Number'
                            value={formData.Mobile_Number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Height</h2>
                        <input
                            type='text'
                            className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                            name='Height'
                            value={formData.Height}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full px-60 gap-4'>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Email</h2>
                        <input
                            type='text'
                            className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                            name='Email'
                            value={formData.Email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Blood Group</h2>
                        <input
                            type='text'
                            className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                            name='Blood_Group'
                            value={formData.Blood_Group}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full px-60 gap-4'>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Password</h2>
                        <input
                            type='password'
                            className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                            name='Password'
                            value={formData.Password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center w-full px-60 gap-4 mt-4 mb-12'>
                    <div className='w-1/3'>
                        <Button type='button' onClick={handleCancel} className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                    </div>
                    <div className='w-1/3'>
                        <Button type='submit' className="bg-custom-darkGreen border-2 border-custom-darkGreen  text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Add a Patient</Button>
                    </div>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AddAPatient;
