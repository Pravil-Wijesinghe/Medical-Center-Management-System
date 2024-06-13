// frontend/src/Pages/Doctor/Profile.jsx
import React, { useEffect, useState } from 'react';
import Background from '../../Components/Background';
import DoctorNavBar from '../../Components/DoctorNavBar';
import { Button } from '../../Components/Button';

function Profile() {
  const [doctor, setDoctor] = useState({
    First_Name: '',
    Last_Name: '',
    NIC: '',
    Specialization: '',
    Address: '',
    Mobile_Number: '',
    Email: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.NIC) {
        try {
          const response = await fetch(`http://localhost:3000/doctor/${storedUser.NIC}`);
          if (response.ok) {
            const data = await response.json();
            setDoctor(data);
          } else {
            console.error('Failed to fetch doctor profile');
          }
        } catch (error) {
          console.error('Error fetching doctor profile:', error);
        }
      }
    };
    fetchDoctorProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.NIC) {
      try {
        const response = await fetch(`http://localhost:3000/doctor/${storedUser.NIC}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(doctor),
        });

        if (response.ok) {
          const result = await response.json();
          setMessage(result.message);
        } else {
          setMessage('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setMessage('Error updating profile');
      }
    }
  };

  return (
    <div className='relative text-white font-montserrat'>
      <Background />
      <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
        <DoctorNavBar />
      </div>
      <div className='flex items-center justify-center'>
        <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
          <div className='relative bg-custom-blackGreen h-24 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-semibold text-white'>Profile</h2>
          </div>
          <div className='relative flex flex-col mt-8 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
            <div className='flex flex-row items-center gap-6 ml-8 mb-4'>
              <div className='flex items-center justify-center border-2 w-20 h-20 overflow-hidden border-black rounded-full'>
                <input type='file' />
              </div>
              <div className='font-medium text-lg'>
                {doctor.First_Name} {doctor.Last_Name}
              </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <div className='flex flex-row items-center w-full px-8 gap-4'>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>First Name</h2>
                  <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' name='First_Name' value={doctor.First_Name} onChange={handleChange} />
                </div>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>Address</h2>
                  <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' name='Address' value={doctor.Address} onChange={handleChange} />
                </div>
              </div>
              <div className='flex flex-row items-center w-full px-8 gap-4'>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>Last Name</h2>
                  <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' name='Last_Name' value={doctor.Last_Name} onChange={handleChange} />
                </div>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>Specialization</h2>
                  <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' name='Specialization' value={doctor.Specialization} onChange={handleChange} />
                </div>
              </div>
              <div className='flex flex-row items-center w-full px-8 gap-4'>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>NIC Number</h2>
                  <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' name='NIC' value={doctor.NIC} onChange={handleChange} />
                </div>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>Mobile Number</h2>
                  <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' name='Mobile_Number' value={doctor.Mobile_Number} onChange={handleChange} />
                </div>
              </div>
              <div className='flex flex-row items-center w-full px-8 gap-4'>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>Email</h2>
                  <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' name='Email' value={doctor.Email} onChange={handleChange} />
                </div>
              </div>
              <div className='flex flex-row items-center w-full px-8 gap-4 mt-8'>
                <div className='w-1/2'>
                  <Button type="button" className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                </div>
                <div className='w-1/2'>
                  <Button type="submit" className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Save</Button>
                </div>
              </div>
              {message && <p className="text-center mt-4 text-green-500">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
