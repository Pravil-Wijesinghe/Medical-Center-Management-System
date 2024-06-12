import React, { useState } from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import SearchBar from '../../Components/SearchBar';
import { Button } from '../../Components/Button';
import { XMarkIcon } from '@heroicons/react/20/solid';

function ViewDoctors() {
  const [doctors] = useState([
    { name: 'Vijitha', nic: 'Room 01', specialization: 'Cardiology', mobile: 'available', email: 'Edit', address: 'Edit' },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const openDoctorPopup = (doctor) => {
    setSelectedDoctor(doctor);
    setShowPaymentPopup(false);
  };

  const openPaymentPopup = (doctor) => {
    setSelectedDoctor(doctor);
    setShowPaymentPopup(true);
  };

  const closePopup = () => {
    setSelectedDoctor(null);
    setShowPaymentPopup(false);
  };

  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
          <ReceptionistNavBar />
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
          <div className='flex justify-center mt-24 w-full h-fit font-bold text-4xl'>
            Doctors
          </div>
          <div className='px-20'>
            <div className='px-5 py-4'>
              <SearchBar />
            </div>
            <div className='flex justify-center bg-custom-black w-full rounded-3xl p-6'>
              <table className='table-auto border-separate border-spacing-y-2 border-spacing-x-6'>
                <thead>
                  <tr className='gap-4 '>
                    <th>Name</th>
                    <th>NIC Number</th>
                    <th>Specialization</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor, index) => (
                    <tr key={index} className='text-sm '>
                      <td>{doctor.name}</td>
                      <td>{doctor.nic}</td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.mobile}</td>
                      <td>{doctor.email}</td>
                      <td>{doctor.address}</td>
                      <td>
                        <Button
                          className='text-white bg-custom-darkGreen text-sm font-medium px-4 py-[4px] rounded-md w-fit'
                          onClick={() => openDoctorPopup(doctor)}
                        >
                          More
                        </Button>
                      </td>
                      <td>
                        <Button
                          className='text-white bg-custom-darkGreen text-sm font-medium px-4 py-[4px] rounded-md w-fit'
                          onClick={() => openPaymentPopup(doctor)}
                        >
                          Payment
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {selectedDoctor && !showPaymentPopup && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
            <div className='bg-custom-black p-5 rounded-lg'>
              <div className='flex items-center justify-center'>
                  <div className='absolute bg-custom-black text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
              <div className='relative flex flex-col items-center text-white pt-5 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
                <h2 className='text-2xl p-6 font-semibold'>{selectedDoctor.name}</h2>
                <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                  <h3 className='text-lg font-medium w-[35%]'>NIC Number</h3>
                  <input type='text' defaultValue={selectedDoctor.nic} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                </div>
                <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                  <h3 className='text-lg font-medium w-[35%]'>Name</h3>
                  <input type='text' defaultValue={selectedDoctor.name} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                </div>
                <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                  <h3 className='text-lg font-medium w-[35%]'>Specialization</h3>
                  <input type='text' defaultValue={selectedDoctor.specialization} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                </div>
                <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                  <h3 className='text-lg font-medium w-[35%]'>Mobile Number</h3>
                  <input type='text' defaultValue={selectedDoctor.mobile} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                </div>
                <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                  <h3 className='text-lg font-medium w-[35%]'>Email</h3>
                  <input type='text' defaultValue={selectedDoctor.email} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                </div>
                <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                  <h3 className='text-lg font-medium w-[35%]'>Address</h3>
                  <input type='text' defaultValue={selectedDoctor.address} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                </div>
                <div className='flex flex-row items-center w-[60%] px-8 gap-4 mt-10'>
                  <div className='w-1/3'>
                    <Button className="bg-custom-red hover:opacity-80 text-white text-base font-medium px-4 py-2 rounded-md w-full">Delete</Button>
                  </div>
                  <div className='w-1/3'>
                    <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Save</Button>
                  </div>
                  <div className='w-1/3'>
                    <Button onClick={closePopup} className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:outline-custom-red">Cancel</Button>
                  </div>
                </div>
              </div>
              <Button className='fixed top-5 right-4' onClick={closePopup}>
                <XMarkIcon className='w-8 h-8 text-white' />
              </Button>
            </div>
            </div>
            </div>
          </div>
        )}
        {showPaymentPopup && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
            <div className='bg-custom-black p-5 rounded-lg'>
              <div className='flex items-center justify-center'>
                <div className='absolute bg-custom-black text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
                  <div className='relative flex flex-col items-center text-white pt-5 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
                    <h2 className='text-2xl p-6 font-semibold'>Payment for {selectedDoctor.name}</h2>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[50%]'>Patient that are checked:</h3>
                      <h3 className='text-lg font-medium w-[50%]'>36</h3>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[50%]'>Doctor fee</h3>
                      <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[50%]'/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[50%]'>Payment (LKR):</h3>
                      <h3 className='text-lg font-medium w-[50%]'>10000</h3>
                    </div>
                    <div className='flex flex-row items-center w-[60%] px-8 gap-4 mt-10'>
                    <div className='w-1/2'>
                        <Button onClick={closePopup} className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:outline-custom-red">Cancel</Button>
                      </div>
                      <div className='w-1/2'>
                        <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Complete Payment</Button>
                      </div>
                    </div>
                  </div>
                  <Button className='fixed top-5 right-4' onClick={closePopup}>
                    <XMarkIcon className='w-8 h-8 text-white' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewDoctors;
