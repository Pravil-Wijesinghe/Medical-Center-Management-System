import React, { useState, useEffect } from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import { Button } from '../../Components/Button';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

function ViewAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [filterDate, setFilterDate] = useState('');
    const [filterTime, setFilterTime] = useState('');
    const [formData, setFormData] = useState({
        Disease_Report: '',
        Diagnosis: '',
        Treatment_Plan: '',
        Payment: '',
        doctorFee: '',
        medicineFee: ''
    });

    useEffect(() => {
        // Fetch all appointments from the backend
        axios.get('http://localhost:3000/appointment')
            .then(response => {
                const formattedAppointments = response.data.map(appointment => ({
                    ...appointment,
                    Date: new Date(appointment.Date).toISOString().split('T')[0]
                }));
                setAppointments(formattedAppointments);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    const openPopup = (appointment) => {
        setSelectedAppointment(appointment);
        setFormData({
            Disease_Report: appointment.Disease_Report,
            Diagnosis: appointment.Diagnosis,
            Treatment_Plan: appointment.Treatment_Plan,
            Payment: appointment.Payment,
            doctorFee: '',
            medicineFee: ''
        });
    };

    const closePopup = () => {
        setSelectedAppointment(null);
        setFormData({
            Disease_Report: '',
            Diagnosis: '',
            Treatment_Plan: '',
            Payment: '',
            doctorFee: '',
            medicineFee: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const totalPayment = parseFloat(formData.doctorFee) + parseFloat(formData.medicineFee);
        const updatedData = { ...formData, Payment: totalPayment };
        try {
            await axios.put(`http://localhost:3000/appointment/${selectedAppointment.Appointment_Number}`, updatedData);
            alert('Appointment updated successfully!');
            closePopup();
            // Refresh appointments list after update
            const response = await axios.get('http://localhost:3000/appointment');
            setAppointments(response.data.map(appointment => ({
                ...appointment,
                Date: new Date(appointment.Date).toISOString().split('T')[0]
            })));
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/appointment/${selectedAppointment.Appointment_Number}`);
            alert('Appointment deleted successfully!');
            closePopup();
            // Refresh appointments list after delete
            const response = await axios.get('http://localhost:3000/appointment');
            setAppointments(response.data.map(appointment => ({
                ...appointment,
                Date: new Date(appointment.Date).toISOString().split('T')[0]
            })));
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const handleFilter = async () => {
        try {
            const response = await axios.get('http://localhost:3000/appointment', {
                params: {
                    date: filterDate,
                    time: filterTime
                }
            });
            setAppointments(response.data.map(appointment => ({
                ...appointment,
                Date: new Date(appointment.Date).toISOString().split('T')[0]
            })));
        } catch (error) {
            console.error('Error filtering appointments:', error);
        }
    };

    const handleClear = () => {
        setFilterDate('');
        setFilterTime('');
        axios.get('http://localhost:3000/appointment')
            .then(response => setAppointments(response.data.map(appointment => ({
                ...appointment,
                Date: new Date(appointment.Date).toISOString().split('T')[0]
            }))))
            .catch(error => console.error('Error fetching appointments:', error));
    };

    return (
        <div className='text-white font-montserrat'>
            <div className='bg-custom-blackGreen w-full h-screen'>
                <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
                    <ReceptionistNavBar />
                </div>
                <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
                    <div className='flex justify-center mt-28 w-full h-fit font-bold text-4xl'>
                        Appointments
                    </div>
                    <div className='px-20'>
                        <div className='flex flex-row items-center justify-center w-full gap-5 py-4'>
                            <h3 className='font-semibold w-fit'>Select Date:</h3>
                            <div>
                                <input
                                    type='date'
                                    className='rounded-md bg-custom-black border-2 border-custom-darkGreen p-2 w-48 outline-none'
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                />
                            </div>
                            <h3 className='font-semibold w-fit'>Select Time:</h3>
                            <select
                                className='rounded-md bg-custom-black border-2 border-custom-darkGreen p-2 w-48 outline-none'
                                value={filterTime}
                                onChange={(e) => setFilterTime(e.target.value)}
                            >
                                <option value=''>Select Time</option>
                                <option value='Morning'>Morning</option>
                                <option value='Evening'>Evening</option>
                            </select>
                            <Button
                                className='flex flex-row items-center justify-center gap-1 bg-custom-darkGreen border-2 border-custom-darkGreen hover:border-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md h-9 w-32 hover:bg-custom-blackGreen'
                                onClick={handleFilter}
                            >
                                <FunnelIcon className='h-[18px]' />
                                Filter
                            </Button>
                            <Button
                                className='flex flex-row items-center justify-center gap-1 bg-custom-red text-white text-base font-medium px-4 py-2 rounded-md h-9 w-32 hover:opacity-90'
                                onClick={handleClear}
                            >
                                Clear
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment, index) => (
                                        <tr key={index} className='text-sm '>
                                            <td>{appointment.Appointment_Number}</td>
                                            <td>{appointment.Patient_NIC}</td>
                                            <td>{appointment.Relationship}</td>
                                            <td>{appointment.Doctor_NIC}</td>
                                            <td>{appointment.Date}</td>
                                            <td>{appointment.Time}</td>
                                            <td>{appointment.Disease_Report}</td>
                                            <td>{appointment.Status}</td>
                                            <td>
                                                <Button className='text-white bg-custom-darkGreen text-sm font-medium px-4 py-[4px] rounded-md w-fit'
                                                    onClick={() => openPopup(appointment)}>
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
                                        <h2 className='text-2xl p-6 font-semibold'>{selectedAppointment.Appointment_Number} - {selectedAppointment.Patient_NIC} - {selectedAppointment.Doctor_NIC}</h2>
                                        <form onSubmit={handleUpdate}>
                                            <div className='flex flex-col w-full gap-4 mt-5'>
                                                <div className='flex flex-col gap-2 w-full px-8'>
                                                    <h3 className='text-lg font-medium'>Disease/Report</h3>
                                                    <textarea className='w-full h-20 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none'
                                                        name='Disease_Report'
                                                        value={formData.Disease_Report}
                                                        onChange={handleChange}></textarea>
                                                </div>
                                                <div className='flex flex-col gap-2 w-full px-8'>
                                                    <h3 className='text-lg font-medium'>Diagnosis</h3>
                                                    <textarea className='w-full h-20 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none'
                                                        name='Diagnosis'
                                                        value={formData.Diagnosis}
                                                        onChange={handleChange}></textarea>
                                                </div>
                                                <div className='flex flex-col gap-2 w-full px-8'>
                                                    <h3 className='text-lg font-medium'>Treatment Plan</h3>
                                                    <textarea className='w-full h-20 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none'
                                                        name='Treatment_Plan'
                                                        value={formData.Treatment_Plan}
                                                        onChange={handleChange}></textarea>
                                                </div>
                                                <div className='flex flex-col gap-2 w-full px-8'>
                                                    <h3 className='text-lg font-medium'>Payment</h3>
                                                    <div className='flex flex-row gap-6 items-center'>
                                                        <h3 className='text-base font-medium w-1/4'>Doctor Fee :</h3>
                                                        <input type='text' className='w-1/4 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none'
                                                            name='doctorFee'
                                                            value={formData.doctorFee}
                                                            onChange={handleChange} />
                                                        <h3 className='text-base font-medium w-1/4'>Medicine Fee :</h3>
                                                        <input type='text' className='w-1/4 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none'
                                                            name='medicineFee'
                                                            value={formData.medicineFee}
                                                            onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className='flex flex-row items-center w-full px-8 gap-2'>
                                                    <h3 className='text-base font-medium w-1/4'>Total :</h3>
                                                    <input type='text' className='w-1/4 rounded-md border-2 border-custom-darkGreen bg-custom-black p-2 outline-none'
                                                        name='Payment'
                                                        value={parseFloat(formData.doctorFee) + parseFloat(formData.medicineFee)}
                                                        readOnly />
                                                </div>
                                                <div className='flex flex-row items-center w-full px-8 gap-4 mt-6'>
                                                    <div className='w-1/3'>
                                                        <Button type='button' className="bg-custom-red hover:opacity-80 text-white text-base font-medium px-4 py-2 rounded-md w-full"
                                                            onClick={handleDelete}>
                                                            Delete
                                                        </Button>
                                                    </div>
                                                    <div className='w-1/3'>
                                                        <Button type='submit' className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">
                                                            Complete
                                                        </Button>
                                                    </div>
                                                    <div className='w-1/3'>
                                                        <Button type='button' onClick={closePopup} className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:outline-custom-red">
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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
    );
}

export default ViewAppointments;
