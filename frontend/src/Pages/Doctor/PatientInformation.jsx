import React, { useState } from 'react';
import DoctorNavBar from '../../Components/DoctorNavBar';
import Background from '../../Components/Background';
import { Button } from '../../Components/Button';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

function PatientInformation() {
  const [patients] = useState([
    { name: 'Jayasiri', mobile: '0713280964', date: '01/02/2024', time: 'Morning' },
    { name: 'Jayasiri', mobile: '0713280964', date: '01/02/2024', time: 'Morning' },
    { name: 'Jayasiri', mobile: '0713280964', date: '01/02/2024', time: 'Morning' },
    { name: 'Jayasiri', mobile: '0713280964', date: '01/02/2024', time: 'Morning' },
    { name: 'Jayasiri', mobile: '0713280964', date: '01/02/2024', time: 'Morning' },
    { name: 'Jayasiri', mobile: '0713280964', date: '01/02/2024', time: 'Morning' },
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const openPopup = (patient) => {
    setSelectedPatient(patient);
  };

  const closePopup = () => {
    setSelectedPatient(null);
  };

  return (
    <div className='relative text-white font-montserrat'>
      <Background />
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <DoctorNavBar />
      </div>
      <div className='flex items-center justify-center'>
        <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
          <div className='relative bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-semibold text-white'>Patient Information</h2>
          </div>
          <div className='relative flex flex-col mt-8 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
            <h2 className='flex items-center justify-center text-xl font-semibold mb-6'>Appointments</h2>
            <div className='flex flex-row items-center justify-center w-full px-10 gap-5 '>
              <h3 className='font-semibold w-fit'>Select Date:</h3>
              <div>
                <input type='date' className='rounded-md border-2 h-9 w-48 p-2 outline-none' />
              </div>
              <h3 className='font-semibold w-fit'>Select Time:</h3>
              <select className='rounded-md border-2 h-9 w-48 outline-none'>
                <option value='Morning'>Morning</option>
                <option value='Evening'>Evening</option>
              </select>
              <Button className='flex flex-row items-center justify-center gap-1 bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md h-9 w-32 hover:bg-custom-blackGreen'>
                <FunnelIcon className='h-[18px]' />
                Filter
              </Button>
            </div>
            <div className='flex flex-col items-center mt-5'>
              <table className='table-auto border-separate border-spacing-y-2'>
                <thead>
                  <tr className='text-lg bg-white shadow-xl'>
                    <th className='py-2 px-8 rounded-l-lg'>
                      <input type='checkbox' />
                    </th>
                    <th className='font-semibold py-2'>Name</th>
                    <th className='font-semibold py-2'>Mobile Number</th>
                    <th className='font-semibold py-2'>Date</th>
                    <th className='font-semibold py-2'>Time</th>
                    <th className='py-2 rounded-r-lg'></th>
                  </tr>
                </thead>
                <tbody className='text-sm'>
                  {patients.map((patient, index) => (
                    <tr key={index} className='bg-white shadow-xl py-2 px-28 mt-5 rounded-lg'>
                      <td className='px-8 py-3 rounded-l-lg'>
                        <input type='checkbox' />
                      </td>
                      <td className='px-10 py-3'>{patient.name}</td>
                      <td className='px-12 py-3'>{patient.mobile}</td>
                      <td className='px-12 py-3'>{patient.date}</td>
                      <td className='px-12 py-3'>{patient.time}</td>
                      <td className='px-12 py-3 rounded-r-lg'>
                        <div className='flex flex-col items-center'>
                          <Button
                            className="text-white bg-custom-darkGreen text-sm font-medium px-3 py-[6px] rounded-md w-20"
                            onClick={() => openPopup(patient)}
                          >
                            More
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {selectedPatient && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
          <div className='bg-white p-5 rounded-lg'>
            <div className='flex items-center justify-center'>
                <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
                    <div className='relative bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
                        <h2 className='text-2xl font-semibold text-white'>{selectedPatient.name}</h2>
                    </div>
                    <div className='relative flex flex-col items-center pt-5 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
                        <div className='flex flex-col gap-2 w-full px-8'>
                            <h3 className='text-lg font-medium'>Disease/Report</h3>
                            <textarea className='w-full h-20 rounded-md border-2 p-2 outline-none'></textarea>
                        </div>
                        <div className='flex flex-col w-full gap-4 mt-5'>
                            <div className='flex flex-col gap-2 w-full px-8'>
                                <h3 className='text-lg font-medium'>Diagnosis</h3>
                                <textarea className='w-full h-20 rounded-md border-2 p-2 outline-none'></textarea>
                            </div>
                            <div className='flex flex-col gap-2 w-full px-8'>
                                <h3 className='text-lg font-medium'>Treatment Plan</h3>
                                <textarea className='w-full h-20 rounded-md border-2 p-2 outline-none'></textarea>
                            </div>
                            <div className='flex flex-row items-center w-full px-8 gap-4 mt-6'>
                                <div className='w-1/2'>
                                    <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                                </div>
                                <div className='w-1/2'>
                                    <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Save</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Button className='fixed top-5 right-4' onClick={closePopup}>
                    <XMarkIcon className='w-8 h-8 text-white' />
                </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientInformation;
