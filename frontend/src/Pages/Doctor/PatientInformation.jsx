import React, { useState, useEffect } from 'react';
import DoctorNavBar from '../../Components/DoctorNavBar';
import Background from '../../Components/Background';
import { Button } from '../../Components/Button';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

function PatientInformation() {
  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formValues, setFormValues] = useState({
    Disease_Report: '',
    Diagnosis: '',
    Treatment_Plan: '',
  });
  const [filterDate, setFilterDate] = useState('');
  const [filterTime, setFilterTime] = useState('');
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.NIC) {
      try {
        const response = await fetch(`http://localhost:3000/appointment/doctor/${storedUser.NIC}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }
  };

  const openPopup = (appointment) => {
    setSelectedPatient(appointment);
    setFormValues({
      Disease_Report: appointment.Disease_Report || '',
      Diagnosis: appointment.Diagnosis || '',
      Treatment_Plan: appointment.Treatment_Plan || '',
    });
  };

  const closePopup = () => {
    setSelectedPatient(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedPatient) {
      try {
        const response = await fetch(`http://localhost:3000/appointment/${selectedPatient.Appointment_Number}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
          closePopup();
          setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment.Appointment_Number === selectedPatient.Appointment_Number
                ? { ...appointment, ...formValues }
                : appointment
            )
          );
        } else {
          console.error('Failed to update appointment');
        }
      } catch (error) {
        console.error('Error updating appointment:', error);
      }
    }
  };

  const handleFilter = async () => {
    if (!filterDate && !filterTime) {
      fetchAppointments();
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/appointment/filter?date=${filterDate}&time=${filterTime}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error('Failed to filter appointments');
      }
    } catch (error) {
      console.error('Error filtering appointments:', error);
    }
  };

  const clearFilter = () => {
    setFilterDate('');
    setFilterTime('');
    fetchAppointments();
  };

  const handleSelectAll = () => {
    setAllSelected(!allSelected);
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => ({ ...appointment, selected: !allSelected }))
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
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
                <input type='date' className='rounded-md border-2 h-9 w-48 p-2 outline-none' value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
              </div>
              <h3 className='font-semibold w-fit'>Select Time:</h3>
              <select className='rounded-md border-2 h-9 w-48 outline-none' value={filterTime} onChange={(e) => setFilterTime(e.target.value)}>
                <option value=''>Select Time</option>
                <option value='Morning'>Morning</option>
                <option value='Evening'>Evening</option>
              </select>
              <Button className='flex flex-row items-center justify-center gap-1 bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md h-9 w-32 hover:bg-custom-blackGreen' onClick={handleFilter}>
                <FunnelIcon className='h-[18px]' />
                Filter
              </Button>
              <Button className='flex flex-row items-center justify-center gap-1 bg-custom-red text-white text-base font-medium px-4 py-2 rounded-md h-9 w-32 hover:opacity-90' onClick={clearFilter}>
                Clear
              </Button>
            </div>
            <div className='flex flex-col items-center mt-5'>
              <table className='table-auto border-separate border-spacing-y-2'>
                <thead>
                  <tr className='text-lg bg-white shadow-xl'>
                    <th className='py-2 px-8 rounded-l-lg'>
                      <input type='checkbox' checked={allSelected} onChange={handleSelectAll} />
                    </th>
                    <th className='font-semibold py-2'>Name</th>
                    <th className='font-semibold py-2'>Mobile Number</th>
                    <th className='font-semibold py-2'>Date</th>
                    <th className='font-semibold py-2'>Time</th>
                    <th className='py-2 rounded-r-lg'></th>
                  </tr>
                </thead>
                <tbody className='text-sm'>
                  {appointments.map((appointment, index) => (
                    <tr key={index} className={`bg-white shadow-xl py-2 px-28 mt-5 rounded-lg ${appointment.selected ? 'bg-gray-200' : ''}`}>
                      <td className='px-8 py-3 rounded-l-lg'>
                        <input type='checkbox' checked={appointment.selected || false} onChange={() => {
                          setAppointments(prevAppointments =>
                            prevAppointments.map((app, i) =>
                              i === index ? { ...app, selected: !app.selected } : app
                            )
                          );
                        }} />
                      </td>
                      <td className='px-10 py-3'>{appointment.Patient_FirstName} {appointment.Patient_LastName}</td>
                      <td className='px-12 py-3'>{appointment.Mobile_Number}</td>
                      <td className='px-12 py-3'>{formatDate(appointment.Date)}</td>
                      <td className='px-12 py-3'>{appointment.Time}</td>
                      <td className='px-12 py-3 rounded-r-lg'>
                        <div className='flex flex-col items-center'>
                          <Button
                            className="text-white bg-custom-darkGreen text-sm font-medium px-3 py-[6px] rounded-md w-20"
                            onClick={() => openPopup(appointment)}
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
                  <h2 className='text-2xl font-semibold text-white'>{selectedPatient.Patient_FirstName} {selectedPatient.Patient_LastName}</h2>
                </div>
                <div className='relative flex flex-col items-center pt-5 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
                  <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2 w-full px-8'>
                      <h3 className='text-lg font-medium'>Disease/Report</h3>
                      <textarea className='w-full h-20 rounded-md border-2 p-2 outline-none' name='Disease_Report' value={formValues.Disease_Report} onChange={handleChange}></textarea>
                    </div>
                    <div className='flex flex-col w-full gap-4 mt-5'>
                      <div className='flex flex-col gap-2 w-full px-8'>
                        <h3 className='text-lg font-medium'>Diagnosis</h3>
                        <textarea className='w-full h-20 rounded-md border-2 p-2 outline-none' name='Diagnosis' value={formValues.Diagnosis} onChange={handleChange}></textarea>
                      </div>
                      <div className='flex flex-col gap-2 w-full px-8'>
                        <h3 className='text-lg font-medium'>Treatment Plan</h3>
                        <textarea className='w-full h-20 rounded-md border-2 p-2 outline-none' name='Treatment_Plan' value={formValues.Treatment_Plan} onChange={handleChange}></textarea>
                      </div>
                      <div className='flex flex-row items-center w-full px-8 gap-4 mt-6'>
                        <div className='w-1/2'>
                          <Button type="button" className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full" onClick={closePopup}>Cancel</Button>
                        </div>
                        <div className='w-1/2'>
                          <Button type="submit" className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Save</Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <Button className='fixed top-5 right-4' onClick={closePopup}>
              <XMarkIcon className='w-8 h-8 text-white' />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientInformation;
