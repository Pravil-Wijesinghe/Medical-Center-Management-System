// frontend/src/Components/MakeAnAppointment.jsx
//component to Make an appointment
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { generateDate, months } from './calender';
import cn from './cn';
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import axios from 'axios';

function MakeAnAppointment({ closeMakeAppointment }) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [isForFamily, setIsForFamily] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [diseaseReport, setDiseaseReport] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [relationship, setRelationship] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/doctors')
        .then(response => {
            console.log('Fetched doctors:', response.data);
            setDoctors(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the doctors!', error);
        });
}, []);
  

  const handleCancel = () => {
    setShowConfirm(true);
  };

  const cancelRemove = () => {
    setShowConfirm(false);
  };

  const confirmRemove = () => {
    // Clear all fields
    setToday(currentDate);
    setSelectDate(currentDate);
    setIsForFamily(false);
    setSelectedDoctor('');
    setDiseaseReport('');
    setSelectedTime('');
    setRelationship('');
    setShowConfirm(false);
    if (typeof closeMakeAppointment === 'function') {
      closeMakeAppointment();
    }
  };

  const handleMakeAppointment = async () => {
    const patientNIC = JSON.parse(localStorage.getItem('user')).NIC;
    const appointmentData = {
      date: selectDate.format('YYYY-MM-DD'),
      time: selectedTime,
      diseaseReport,
      patientNIC,
      relationship: isForFamily ? relationship : null,
      doctorNIC: selectedDoctor,
    };

    try {
      const response = await fetch('http://localhost:3000/appointment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Appointment created successfully');
        confirmRemove(); // Clear form and close appointment form
      } else {
        console.error('Error response:', result);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error during appointment creation:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className='flex items-center justify-center text-white font-montserrat'>
      <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl'>
        <div className='absolute bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
          <h2 className='text-2xl font-semibold text-white'>Make an Appointment</h2>
        </div>
        <div className='relative flex flex-col mt-[60px] pt-8 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
          <div className='flex flex-row'>
            <div className='ml-12 w-1/2'>
              <div className='flex gap-10 justify-center h-screen flex-col'>
                <div className='w-96 h-96'>
                  <div className='flex justify-between items-center'>
                    <h1 className='select-none font-semibold'>
                      {months[today.month()]}, {today.year()}
                    </h1>
                    <div className='flex gap-10 items-center '>
                      <ArrowLeftIcon
                        className='w-5 h-5 cursor-pointer hover:scale-105 transition-all'
                        onClick={() => setToday(today.month(today.month() - 1))}
                      />
                      <h1
                        className=' cursor-pointer hover:scale-105 transition-all'
                        onClick={() => setToday(currentDate)}
                      >
                        Today
                      </h1>
                      <ArrowRightIcon
                        className='w-5 h-5 cursor-pointer hover:scale-105 transition-all'
                        onClick={() => setToday(today.month(today.month() + 1))}
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-7 '>
                    {days.map((day, index) => (
                      <h1
                        key={index}
                        className='text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none'
                      >
                        {day}
                      </h1>
                    ))}
                  </div>
                  <div className='grid grid-cols-7'>
                    {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
                      <div
                        key={index}
                        className='p-2 text-center h-14 grid place-content-center text-sm border-t'
                      >
                        <h1
                          className={cn(
                            currentMonth ? '' : 'text-gray-400',
                            today ? 'bg-red-600 text-white' : '',
                            selectDate.toDate().toDateString() === date.toDate().toDateString()
                              ? 'bg-black text-white'
                              : '',
                            'h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none'
                          )}
                          onClick={() => setSelectDate(date)}
                        >
                          {date.date()}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='h-96 w-96'>
                  <h1 className=' font-semibold'>
                    You selected {selectDate.toDate().toDateString()}
                  </h1>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-1/2 mr-12 gap-4'>
              <div>
                <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Select your doctor</h2>
                <select
                  id='doctor'
                  className='rounded-md border-2 h-9 w-full p-2 outline-none'
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  <option value=''>Select a doctor</option>
                  {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <option key={doctor.NIC} value={doctor.NIC}>
                        {doctor.First_Name} {doctor.Last_Name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading doctors...</option>
                  )}
                </select>
              </div>
              <div>
                <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Disease/Report</h2>
                <textarea
                  className='rounded-md border-2 w-full p-2 outline-none'
                  rows='6'
                  placeholder='Enter details'
                  value={diseaseReport}
                  onChange={(e) => setDiseaseReport(e.target.value)}
                />
              </div>
              <div className='flex flex-row gap-5 ml-[10px]'>
                <h2 className='text-base font-semibold mb-0.5'>Select your time :</h2>
                <div className='flex gap-1'>
                  <input
                    type='radio'
                    name='time'
                    id='morning'
                    checked={selectedTime === 'morning'}
                    onChange={() => setSelectedTime('morning')}
                  />
                  <label htmlFor='morning'>Morning</label>
                </div>
                <div className='flex gap-1'>
                  <input
                    type='radio'
                    name='time'
                    id='evening'
                    checked={selectedTime === 'evening'}
                    onChange={() => setSelectedTime('evening')}
                  />
                  <label htmlFor='evening'>Evening</label>
                </div>
              </div>
              <div className='flex flex-row gap-2 ml-[10px]'>
                <input
                  type='checkbox'
                  name='forFamilyMembers'
                  id='forFamilyMembers'
                  checked={isForFamily}
                  onChange={() => setIsForFamily(!isForFamily)}
                />
                <h2 className='text-base font-semibold mb-0.5'>For Family Members</h2>
              </div>
              <div>
                <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Relationship</h2>
                <select
                  id='relationship'
                  className='rounded-md border-2 h-9 w-full p-2 outline-none'
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  disabled={!isForFamily}
                >
                  <option value=''>Select relationship</option>
                  <option value='Mother'>Mother</option>
                  <option value='Father'>Father</option>
                  <option value='Wife'>Wife</option>
                  <option value='Son'>Son</option>
                  <option value='Daughter'>Daughter</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center w-full px-8 gap-4 -mt-28'>
            <div className='w-1/2'>
              <Button
                className='outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full'
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
            <div className='w-1/2'>
              <Button
                className='bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen'
                onClick={handleMakeAppointment}
              >
                Make an Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col items-center bg-white p-6 rounded-lg text-black'>
            <TrashIcon className='w-16 h-16 text-red-600 mb-2' />
            <h2 className='text-xl font-bold'>Confirm</h2>
            <p className='mt-4'>Are you sure you want to cancel this?</p>
            <div className='mt-6 flex justify-end'>
              <Button
                className='w-24 outline outline-2 outline-offset-0 outline-custom-darkGreen text-black text-sm font-medium px-4 py-2 rounded-md mr-2'
                onClick={cancelRemove}
              >
                No
              </Button>
              <Button
                className='w-24 outline outline-2 outline-offset-0 outline-red-600 bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md'
                onClick={confirmRemove}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MakeAnAppointment;
