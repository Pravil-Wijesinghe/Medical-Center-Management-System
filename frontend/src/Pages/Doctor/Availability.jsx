import React, { useState } from 'react';
import Background from '../../Components/Background';
import DoctorNavBar from '../../Components/DoctorNavBar';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Button } from '../../Components/Button';

// Days of the week array
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Initial state for form data
function Availability() {
  const initialFormData = {
    availability: 'Available',
    start_time: '',
    close_time: '',
    note: ''
  };

  // State hooks for form data, selected days, and message
  const [formData, setFormData] = useState(initialFormData);
  const [selectedDays, setSelectedDays] = useState([]);
  const [message, setMessage] = useState('');

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Toggle day selection
  const handleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  // Handle time change and format it
  const handleTimeChange = (name, value) => {
    const formattedTime = new Date(value).toLocaleTimeString('en-US', { hour12: false });
    setFormData({
      ...formData,
      [name]: formattedTime
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.NIC) {
      const data = {
        Doctor_NIC: storedUser.NIC,
        date: selectedDays.join(', '),
        ...formData
      };

      try {
        const response = await fetch('http://localhost:3000/availability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          setMessage('Successfully Sent');
          console.log(result.message);
        } else {
          const errorData = await response.json();
          setMessage('Error: ' + errorData.message);
          console.error('Error:', errorData.message);
        }
      } catch (error) {
        setMessage('Error: ' + error.message);
        console.error('Error:', error);
      }
    }
  };

  // Handle form Cancel
  const handleCancel = () => {
    setFormData(initialFormData);
    setSelectedDays([]);
    setMessage('');
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
            <h2 className='text-2xl font-semibold text-white'>Doctor Availability</h2>
          </div>
          <div className='relative flex flex-col items-center gap-4 mt-[60px] pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
            <h3 className='text-xl font-semibold text-black'>Request Available Time</h3>
            <div className='flex flex-row items-center gap-4'>
              <h3 className='text-lg w-32'>Date :</h3>
              <div className='flex flex-wrap gap-2'>
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    className={`px-3 py-1 rounded-md border-2 ${selectedDays.includes(day) ? 'bg-custom-darkGreen text-white' : 'bg-white text-black'}`}
                    onClick={() => handleDaySelection(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div className='flex flex-row items-center gap-4'>
              <h3 className='text-lg w-32'>Availability :</h3>
              <div className='flex flex-row gap-2 w-60'>
                <select name="availability" value={formData.availability} onChange={handleChange} className='w-full p-2 rounded-md border-2'>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>
            <div className='flex flex-row items-center justify-center gap-4 w-full'>
              <h3 className='text-lg w-32'>Start Time :</h3>
              <div className='flex items-center justify-center rounded-md border-2 h-9 w-60 p-2 outline-none'>
                <TimePickerComponent name="start_time" placeholder='Select a time' onChange={(e) => handleTimeChange('start_time', e.target.value)}></TimePickerComponent>
              </div>
            </div>
            <div className='flex flex-row items-center justify-center gap-4 w-full'>
              <h3 className='text-lg w-32'>Close Time :</h3>
              <div className='flex items-center justify-center rounded-md border-2 h-9 w-60 p-2 outline-none'>
                <TimePickerComponent name="close_time" placeholder='Select a time' onChange={(e) => handleTimeChange('close_time', e.target.value)}></TimePickerComponent>
              </div>
            </div>
            <div className='flex flex-row justify-center gap-4 w-full'>
              <h3 className='text-lg w-32'>Note :</h3>
              <textarea name="note" value={formData.note} onChange={handleChange} className='w-60 h-20 rounded-md border-2 p-2 outline-none'></textarea>
            </div>
            <div className='flex flex-row justify-center gap-4 w-full'>
              <Button className='w-32 outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md' onClick={handleCancel}>Cancel</Button>
              <Button className='w-32 bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md hover:bg-custom-blackGreen' onClick={handleSubmit}>Send</Button>
            </div>
            {message && <p className='text-center text-lg mt-4'>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Availability;
