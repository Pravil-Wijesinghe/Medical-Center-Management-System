import React, { useState } from 'react';
import Background from '../../Components/Background.jsx';
import { Button } from '../../Components/Button.jsx';
import PatientNavBar from '../../Components/PatientNavBar.jsx';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import MakeAnAppontment from '../../Components/MakeAnAppontment.jsx';

function Appointment() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [appointments, setAppointments] = useState([
    { id: 1, date: '01/02/2024', time: 'Morning', doctor: 'Dr. Priyantha' },
    { id: 2, date: '01/02/2024', time: 'Evening', doctor: 'Dr. Priyantha' },
    { id: 3, date: '01/02/2024', time: 'Evening', doctor: 'Dr. Priyantha' },
    { id: 4, date: '01/02/2024', time: 'Morning', doctor: 'Dr. Priyantha' },
    { id: 5, date: '01/02/2024', time: 'Morning', doctor: 'Dr. Priyantha' },
    { id: 6, date: '01/02/2024', time: 'Evening', doctor: 'Dr. Priyantha' },
    { id: 7, date: '01/02/2024', time: 'Morning', doctor: 'Dr. Priyantha' },
    { id: 8, date: '01/02/2024', time: 'Morning', doctor: 'Dr. Priyantha' },
    { id: 9, date: '01/02/2024', time: 'Evening', doctor: 'Dr. Priyantha' },
    { id: 10, date: '01/02/2024', time: 'Evening', doctor: 'Dr. Priyantha' },
    // ...add other appointments here
  ]);
  const [showModal, setShowModal] = useState(false);
  const [makeAppointment, setMakeAppointment] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedAppointments(appointments.map(appt => appt.id));
    } else {
      setSelectedAppointments([]);
    }
  };

  const handleSelectAppointment = (id) => {
    if (selectedAppointments.includes(id)) {
      setSelectedAppointments(selectedAppointments.filter(apptId => apptId !== id));
    } else {
      setSelectedAppointments([...selectedAppointments, id]);
    }
  };

  const handleRemoveSelected = () => {
    setShowModal(true);
  };

  const handleMakeAppointment = () => {
    setMakeAppointment(true);
  }

  const confirmRemove = () => {
    setAppointments(appointments.filter(appt => !selectedAppointments.includes(appt.id)));
    setSelectedAppointments([]);
    setSelectAll(false);
    setShowModal(false);
  };

  const cancelRemove = () => {
    setShowModal(false);
  };

  const closeMakeAppointment = () => {
    setMakeAppointment(false);
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
                        <input type='checkbox' checked={selectedAppointments.includes(appointment.id)} onChange={() => handleSelectAppointment(appointment.id)} />
                      </td>
                      <td className='px-10 py-3'>{appointment.id}</td>
                      <td className='px-12 py-3'>{appointment.date}</td>
                      <td className='px-12 py-3'>{appointment.time}</td>
                      <td className='px-12 py-3 rounded-r-lg'>{appointment.doctor}</td>
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
