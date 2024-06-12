import React,{useState} from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import { Button } from '../../Components/Button';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/20/solid';

function ViewAppointments() {

    const [appointments] = useState([
        { appointmentNumber: '01', patient: '200200201883', relationship: '-', doctor: 'Wijesekara', date: 'available', time: 'Edit', diseaseReport:'qwgydhgvytdqwkjc', status:'Complete' },
        { appointmentNumber: '02', patient: '199187539537', relationship: 'Mother', doctor: 'Wijesekara', date: 'available', time: 'Edit', diseaseReport:'qwgydhgvytdqwkjc', status:'Waiting' },
        { appointmentNumber: '03', patient: '197589342856', relationship: '-', doctor: 'Suresh', date: 'available', time: 'Edit', diseaseReport:'qwgydhgvytdqwkjc', status:'Cancel' },
      ]);
    
      const [selectedAppointment, setSelectedAppointment] = useState(null);
    
      const openPopup = (Appointment) => {
        setSelectedAppointment(Appointment);
      };
    
      const closePopup = () => {
        setSelectedAppointment(null);
      };


  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
            <ReceptionistNavBar/>
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
            <div className='flex justify-center mt-28 w-full h-fit font-bold text-4xl'>
                Appointments
            </div>
            <div className='px-20'>
                <div className='flex flex-row items-center justify-center w-full gap-5 py-4'>
                    <h3 className='font-semibold w-fit'>Select Date:</h3>
                    <div>
                        <input type='date' className='rounded-md bg-custom-black border-2 border-custom-darkGreen p-2 w-48 outline-none' />
                    </div>
                    <h3 className='font-semibold w-fit'>Select Time:</h3>
                    <select className='rounded-md bg-custom-black border-2 border-custom-darkGreen p-2 w-48 outline-none'>
                        <option value='Morning'>Morning</option>
                        <option value='Evening'>Evening</option>
                    </select>
                    <Button className='flex flex-row items-center justify-center gap-1 bg-custom-darkGreen border-2 border-custom-darkGreen hover:border-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md h-9 w-32 hover:bg-custom-blackGreen'>
                        <FunnelIcon className='h-[18px]' />
                        Filter
                    </Button>
                </div>
                <div className='flex justify-center bg-custom-black w-full rounded-3xl p-6'>
                    <table className='table-auto border-separate border-spacing-y-2 border-spacing-x-6'>
                        <thead>
                            <tr className='gap-4 '>
                            <th>Appointment Number</th>
                            <th>Patient NIC</th>
                            <th>Relationship</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Disease/Report</th>
                            <th>Status</th>
                            {/* <th>Diagnosis</th>
                            <th>Treatment Plan</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((Appointment, index) => (
                            <tr key={index} className='text-sm '>
                                <td>{Appointment.appointmentNumber}</td>
                                <td>{Appointment.patient}</td>
                                <td>{Appointment.relationship}</td>
                                <td>{Appointment.doctor}</td>
                                <td>{Appointment.date}</td>
                                <td>{Appointment.time}</td>
                                <td>{Appointment.diseaseReport}</td>
                                <td>{Appointment.status}</td>
                                {/* <td>{Appointment.diagnosis}</td>
                                <td>{Appointment.treatment}</td> */}
                                <td>
                                <Button className='text-white bg-custom-darkGreen text-sm font-medium px-4 py-[4px] rounded-md w-fit'
                                        onClick={() => openPopup(Appointment)}>
                                    More
                                </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {selectedAppointment && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                <div className='bg-custom-black p-5 rounded-lg'>
                    <div className='flex items-center justify-center'>
                        <div className='absolute bg-custom-black text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
                            <div className='relative flex flex-col items-center text-white pt-5 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
                                <h2 className='text-2xl p-6 font-semibold'>{selectedAppointment.appointmentNumber} - {selectedAppointment.patient} - {selectedAppointment.doctor}</h2>
                                <div className='flex flex-col w-full gap-4 mt-5'>
                                    <div className='flex flex-col gap-2 w-full px-8'>
                                        <h3 className='text-lg font-medium'>Disease/Report</h3>
                                        <textarea className='w-full h-20 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none'></textarea>
                                    </div>
                                    <div className='flex flex-col gap-2 w-full px-8'>
                                        <h3 className='text-lg font-medium'>Diagnosis</h3>
                                        <textarea className='w-full h-20 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none'></textarea>
                                    </div>
                                    <div className='flex flex-col gap-2 w-full px-8'>
                                        <h3 className='text-lg font-medium'>Treatment Plan</h3>
                                        <textarea className='w-full h-20 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none'></textarea>
                                    </div>
                                    <div className='flex flex-col gap-2 w-full px-8'>
                                        <h3 className='text-lg font-medium'>Payment</h3>
                                        <div className='flex flex-row gap-6 items-center'>
                                            <h3 className='text-base font-medium w-1/4'>Doctor Fee :</h3>
                                            <input type='text' className='w-1/4 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none' />
                                            <h3 className='text-base font-medium w-1/4'>Medicine Fee :</h3>
                                            <input type='text' className='w-1/4 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center w-full px-8 gap-2'>
                                        <h3 className='text-base font-medium w-1/4'>Total :</h3>
                                        <input type='text' className='w-1/4 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none' />
                                    </div>
                                    <div className='flex flex-row items-center w-full px-8 gap-4 mt-6'>
                                        <div className='w-1/3'>
                                            <Button className="bg-custom-red hover:opacity-80 text-white text-base font-medium px-4 py-2 rounded-md w-full">Delete</Button>
                                        </div>
                                        <div className='w-1/3'>
                                            <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Complete</Button>
                                        </div>
                                        <div className='w-1/3'>
                                            <Button onClick={closePopup} className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:outline-custom-red">Cancel</Button>
                                        </div>
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
        )}
      </div>
    </div>
  )
}

export default ViewAppointments
