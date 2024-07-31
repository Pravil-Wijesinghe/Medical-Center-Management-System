import React, { useState } from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import { Button } from '../../Components/Button';
import axios from 'axios';

function AddADoctor() {
  // State to manage form data and messages
  const [formData, setFormData] = useState({
    NIC: '',
    First_Name: '',
    Last_Name: '',
    Specialization: '',
    Mobile_Number: '',
    Email: '',
    Address: '',
    Password: '',
    Doctor_Fee: '',
    Room: 'Room 01'
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle adding a new doctor
  const handleAddDoctor = async () => {
    try {
      const response = await axios.post('http://localhost:3000/addDoctor', formData);
      if (response.status === 201) {
        setSuccessMessage('Doctor added successfully');
        setErrorMessage('');
        // Clear the form after successful addition
        setFormData({
          NIC: '',
          First_Name: '',
          Last_Name: '',
          Specialization: '',
          Mobile_Number: '',
          Email: '',
          Address: '',
          Password: '',
          Doctor_Fee: '',
          Room: 'Room 01'
        });
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      const errorMsg = error.response?.data?.message || 'Unknown error occurred';
      setErrorMessage(`Failed to add doctor: ${errorMsg}`);
      setSuccessMessage('');
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setFormData({
      NIC: '',
      First_Name: '',
      Last_Name: '',
      Specialization: '',
      Mobile_Number: '',
      Email: '',
      Address: '',
      Password: '',
      Doctor_Fee: '',
      Room: 'Room 01'
    });
  };

  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
          <ReceptionistNavBar />
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
          <div className='flex justify-center mt-24 w-full h-fit font-bold text-4xl'>
            Add a Doctor
          </div>
          {successMessage && (
            <div className='flex justify-center'>
              <div className='text-green-500'>{successMessage}</div>
            </div>
          )}
          {errorMessage && (
            <div className='flex justify-center'>
              <div className='text-red-500'>{errorMessage}</div>
            </div>
          )}
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
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Specialization</h2>
                <input
                  type='text'
                  className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                  name='Specialization'
                  value={formData.Specialization}
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
            <div className='flex flex-row items-center w-full px-60 gap-4'>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Doctor Fee</h2>
                <input
                  type='text'
                  className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                  name='Doctor_Fee'
                  value={formData.Doctor_Fee}
                  onChange={handleInputChange}
                />
              </div>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Room</h2>
                <select
                  id='room'
                  className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                  name='Room'
                  value={formData.Room}
                  onChange={handleInputChange}
                >
                  <option value='Room 01'>Room 01</option>
                  <option value='Room 02'>Room 02</option>
                </select>
              </div>
            </div>
            <div className='flex flex-row items-center justify-center w-full px-60 gap-4 mt-4 mb-12'>
              <div className='w-1/3'>
                <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-base font-medium px-4 py-2 rounded-md w-full" onClick={handleCancel}>Cancel</Button>
              </div>
              <div className='w-1/3'>
                <Button className="bg-custom-darkGreen border-2 border-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen" onClick={handleAddDoctor}>Add a Doctor</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddADoctor;
