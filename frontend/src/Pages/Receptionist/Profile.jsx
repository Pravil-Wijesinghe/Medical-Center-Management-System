import React, { useEffect, useState } from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import Background from '../../Components/Background';
import { Button } from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  // State to store receptionist data
  const [receptionist, setReceptionist] = useState({});
  // State to store form data
  const [formData, setFormData] = useState({});
  // Navigation hook
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      // Set receptionist state with user data
      setReceptionist(userData);
      // Set form data state with user data
      setFormData(userData);
    }
  }, []);

  const handleInputChange = (e) => {
    // Get input name and value
    const { name, value } = e.target;
    // Update form data state with new value
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      // Send updated data to server
      const response = await axios.put('http://localhost:3000/receptionist/update', {
        nic: formData.NIC,
        firstName: formData.First_Name,
        lastName: formData.Last_Name,
        address: formData.Address,
        email: formData.Email,
        contactNumber: formData.Contact_Number,
      });
      if (response.status === 200) {
        // Update the local storage with the new data
        localStorage.setItem('user', JSON.stringify(formData));
        alert('Profile updated successfully');
      }
    } catch (error) {
      // Show error message
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile. Please try again.');
    }
  };

  // Navigate to receptionist dashboard on cancel
  const handleCancel = () => {
    navigate('/ReceptionistDashboard');
  };

  return (
    <div className='relative text-white font-montserrat'>
        <Background/>
        <div className='fixed -mt-[300px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
            <ReceptionistNavBar />
        </div>
        <div className='flex items-center justify-center'>
          <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
            <div className='relative bg-custom-blackGreen h-24 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
              <h2 className='text-2xl font-semibold text-white'>Profile</h2>
            </div>
            <div className='relative flex flex-col mt-8 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
              <div className='flex flex-row items-center gap-6 ml-8 mb-4'>
                  <div className='flex items-center justify-center border-2 w-20 h-20 overflow-hidden border-black rounded-full'>
                      <input type='file'/>
                  </div>
                  <div className='font-medium text-lg'>
                      {receptionist.First_Name} {receptionist.Last_Name}
                  </div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-row items-center w-full px-8 gap-4'>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>First Name</h2>
                        <input 
                          type='text' 
                          className='rounded-md border-2 h-9 w-full p-2 outline-none' 
                          name='First_Name' 
                          value={formData.First_Name || ''} 
                          onChange={handleInputChange} 
                        />
                    </div>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Address</h2>
                        <input 
                          type='text' 
                          className='rounded-md border-2 h-9 w-full p-2 outline-none' 
                          name='Address' 
                          value={formData.Address || ''} 
                          onChange={handleInputChange} 
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full px-8 gap-4'>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Last Name</h2>
                        <input 
                          type='text' 
                          className='rounded-md border-2 h-9 w-full p-2 outline-none' 
                          name='Last_Name' 
                          value={formData.Last_Name || ''} 
                          onChange={handleInputChange} 
                        />
                    </div>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Email</h2>
                        <input 
                          type='text' 
                          className='rounded-md border-2 h-9 w-full p-2 outline-none' 
                          name='Email' 
                          value={formData.Email || ''} 
                          onChange={handleInputChange} 
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full px-8 gap-4'>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>NIC Number</h2>
                        <input 
                          type='text' 
                          className='rounded-md border-2 h-9 w-full p-2 outline-none' 
                          name='NIC' 
                          value={formData.NIC || ''} 
                          readOnly 
                        />
                    </div>
                    <div className='w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Mobile Number</h2>
                        <input 
                          type='text' 
                          className='rounded-md border-2 h-9 w-full p-2 outline-none' 
                          name='Contact_Number' 
                          value={formData.Contact_Number || ''} 
                          onChange={handleInputChange} 
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full px-8 gap-4 mt-8'>
                    <div className='w-1/2'>
                        <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full" onClick={handleCancel}>Cancel</Button>
                    </div>
                    <div className='w-1/2'>
                        <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen" onClick={handleSave}>Save</Button>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
