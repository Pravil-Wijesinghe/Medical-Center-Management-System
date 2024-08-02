import React, { useState, useEffect } from 'react';
import Background from '../../Components/Background.jsx';
import { Button } from '../../Components/Button.jsx';
import PatientNavBar from '../../Components/PatientNavBar.jsx';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import MakeAnAppontment from '../../Components/MakeAnAppontment3.jsx';

function Appointment() {
  // State to manage the selection of all appointments
  const [selectAll, setSelectAll] = useState(false);
  // State to manage the list of selected appointment numbers
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  // State to store the list of appointments
  const [appointments, setAppointments] = useState([]);
  // State to manage the visibility of the delete confirmation modal
  const [showModal, setShowModal] = useState(false);
  // State to manage the visibility of the "Make an Appointment" modal
  const [makeAppointment, setMakeAppointment] = useState(false);

  // Fetch the appointments for the logged-in patient
  const fetchAppointments = async () => {
    try {
      const patientNIC = JSON.parse(localStorage.getItem('user')).NIC;
      const response = await fetch(`http://localhost:3000/appointment/patient/${patientNIC}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error('Failed to fetch appointments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  

  // Use useEffect to fetch appointments when the component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Handle the selection of all appointments
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedAppointments(appointments.map(appt => appt.Appointment_Number));
    } else {
      setSelectedAppointments([]);
    }
  };

  // Handle the selection of individual appointments
  const handleSelectAppointment = (appointmentNumber) => {
    if (selectedAppointments.includes(appointmentNumber)) {
      setSelectedAppointments(selectedAppointments.filter(apptNum => apptNum !== appointmentNumber));
    } else {
      setSelectedAppointments([...selectedAppointments, appointmentNumber]);
    }
  };

  // Handle the removal of selected appointments
  const handleRemoveSelected = () => {
    setShowModal(true);
  };

  // Handle making a new appointment
  const handleMakeAppointment = () => {
    setMakeAppointment(true);
  };

  // Confirm and remove the selected appointments
  const confirmRemove = async () => {
    try {
      const appointmentsToDelete = appointments.filter(appt =>
        selectedAppointments.includes(appt.Appointment_Number)
      ).map(appt => ({
        Appointment_Number: appt.Appointment_Number,
        Date: appt.Date,
        Doctor_NIC: appt.Doctor_NIC
      }));
  
      console.log('Appointments to delete:', appointmentsToDelete);
  
      const response = await fetch('http://localhost:3000/appointment/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointments: appointmentsToDelete }),
      });
  
      if (response.ok) {
        console.log('Appointments deleted successfully');
        setAppointments(appointments.filter(appt =>
          !selectedAppointments.includes(appt.Appointment_Number)
        ));
        setSelectedAppointments([]);
        setSelectAll(false);
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error('Error deleting appointments:', errorData.message);
      }
    } catch (error) {
      console.error('Error deleting appointments:', error);
    }
  };  

  // Cancel the removal of selected appointments
  const cancelRemove = () => {
    setShowModal(false);
  };

  // Close the "Make an Appointment" modal and refresh the appointment list
  const closeMakeAppointment = () => {
    setMakeAppointment(false);
    fetchAppointments(); // Refresh appointments list after making a new appointment
  };

  return (
    <div className='relative text-white font-montserrat'>
      <Background />
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <PatientNavBar />
      </div>
      <div className='flex items-center justify-center'>
        <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4 '>
          <div className='absolute bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-semibold text-white'>Appointment</h2>
          </div>
          <div className='relative flex flex-col items-center mt-[60px] pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
            <div className='mt-5'>
              <table className='table-auto border-separate border-spacing-y-2'>
                <thead>
                  <tr className='text-lg bg-white shadow-xl'>
                    <th className='py-2 px-8 rounded-l-lg'>
                      <input type='checkbox' checked={selectAll} onChange={handleSelectAll} />
                    </th>
                    <th className='font-semibold py-2'>Appointment Number</th>
                    <th className='font-semibold py-2'>Date</th>
                    <th className='font-semibold py-2'>Time</th>
                    <th className='font-semibold py-2 rounded-r-lg'>Doctor</th>
                  </tr>
                </thead>
                <tbody className='text-sm'>
                  {appointments.map((appointment, index) => (
                    <tr key={index} className='bg-white shadow-xl py-2 px-28 mt-5 rounded-lg'>
                      <td className='px-8 py-3 rounded-l-lg'>
                        <input 
                          type='checkbox' 
                          checked={selectedAppointments.includes(appointment.Appointment_Number)} 
                          onChange={() => handleSelectAppointment(appointment.Appointment_Number)} 
                        />
                      </td>
                      <td className='px-10 py-3'>{appointment.Appointment_Number}</td>
                      <td className='px-12 py-3'>{new Date(appointment.Date).toISOString().split('T')[0]}</td>
                      <td className='px-12 py-3'>{appointment.Time}</td>
                      <td className='px-12 py-3 rounded-r-lg'>{appointment.Doctor_First_Name} {appointment.Doctor_Last_Name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='flex flex-col items-center mt-5'>
                <Button className="bg-custom-darkGreen text-white text-sm font-medium px-3 py-2 rounded-md w-32 hover:bg-custom-blackGreen" onClick={handleRemoveSelected}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed bottom-5 right-4'>
        <Button className='text-black hover:text-white font-medium bg-white hover:bg-custom-darkGreen px-3 py-1 rounded-full' onClick={handleMakeAppointment}>
          Make an Appointment
        </Button>
      </div>

      {/* Modal for Make an appointment */}
      {makeAppointment && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
          <div>
            <MakeAnAppontment closeMakeAppointment={closeMakeAppointment} />
          </div>
          <div>
            <Button className='fixed top-5 right-4' onClick={closeMakeAppointment}>
              <XMarkIcon className='w-8 h-8 text-white' />
            </Button>
          </div>
        </div>
      )}

      {/* Modal for confirm Remove */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col items-center bg-white p-6 rounded-lg text-black'>
            <TrashIcon className='w-16 h-16 text-red-600 mb-2' />
            <h2 className='text-xl font-bold'>Confirm Delete</h2>
            <p className='mt-4'>Are you sure you want to delete the selected appointments?</p>
            <div className='mt-6 flex justify-end'>
              <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-black text-sm font-medium px-4 py-2 rounded-md mr-2" onClick={cancelRemove}>
                Cancel
              </Button>
              <Button className="outline outline-2 outline-offset-0 outline-red-600 bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md" onClick={confirmRemove}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointment;
