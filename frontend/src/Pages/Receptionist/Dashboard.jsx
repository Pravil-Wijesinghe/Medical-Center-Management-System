import React, { useEffect, useRef, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarController,
  LineController,
} from 'chart.js';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import PatientPNG from '../../Images/patient.png';
import DoctorPNG from '../../Images/doctor.png';
import MedicinePNG from '../../Images/medicine.png';
import AppointmentPNG from '../../Images/appointment.png';
import { Button } from '../../Components/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import DayRangePicker from '../../Components/DayRangePicker';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import axios from 'axios';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController
);

function Dashboard() {
  // Refs for chart components
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  // State variables for counts and data
  const [counts, setCounts] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalMedicines: 0,
    totalAppointments: 0
  });

  const [appointments, setAppointments] = useState({
    Morning: 0,
    Evening: 0
  });

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorAvailability, setSelectedDoctorAvailability] = useState([]);
  const [selectedDoctorRoom, setSelectedDoctorRoom] = useState("");
  const [selectedDoctorStatus, setSelectedDoctorStatus] = useState("");

  // Function to open the popup and fetch doctor details
  const openPopup = async (doctor) => {
    try {
      const response = await axios.get(`http://localhost:3000/doctorAvailability/${doctor.NIC}`);
      setSelectedDoctor(response.data.doctor);
      setSelectedDoctorAvailability(response.data.availability);
      setSelectedDoctorRoom(response.data.doctor.Room);
      setSelectedDoctorStatus(response.data.doctor.Status);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };
  // Function to close the popup
  const closePopup = () => {
    setSelectedDoctor(null);
    setSelectedDoctorAvailability([]);
    setSelectedDoctorRoom("");
    setSelectedDoctorStatus("");
  };

  // Fetch initial data when the component mounts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard/counts');
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard/today-appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchCounts();
    fetchAppointments();
    fetchDoctors();
  }, []);

  // Set up charts and clean up when the component updates or unmounts
  useEffect(() => {
    const ctx1 = document.getElementById('myChart').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    
    if (chartRef1.current) {
      chartRef1.current.destroy();
    }
    if (chartRef2.current) {
      chartRef2.current.destroy();
    }

    // Create the bar chart for today's appointments
    chartRef1.current = new ChartJS(ctx1, {
      type: 'bar',
      data: {
        labels: ['Morning', 'Evening'],
        datasets: [
          {
            label: 'Appointments',
            data: [appointments.Morning, appointments.Evening],
            backgroundColor: [
              'rgba(14, 149, 73, 0.9)',
              'rgba(14, 149, 73, 0.9)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white', // Set legend text color to white
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white', // Set x-axis text color to white
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)', // Set x-axis grid color to white with opacity
            },
          },
          y: {
            ticks: {
              color: 'white', // Set y-axis text color to white
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)', // Set y-axis grid color to white with opacity
            },
          },
        },
      },
    });

    // Create the line chart for patients
    chartRef2.current = new ChartJS(ctx2, {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Existing Patients',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgba(98, 189, 86, 1)',
            tension: 0.1,
          },
          {
            label: 'New Patients',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: 'rgba(14, 149, 73, 1)',
            tension: 0.1,
          },
          {
            label: 'All Patients',
            data: [93, 107, 120, 100, 142, 82, 130],
            fill: false,
            borderColor: 'rgba(192, 32, 39, 1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white', // Set legend text color to white
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white', // Set x-axis text color to white
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)', // Set x-axis grid color to white with opacity
            },
          },
          y: {
            ticks: {
              color: 'white', // Set y-axis text color to white
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)', // Set y-axis grid color to white with opacity
            },
          },
        },
      },
    });

    // Clean up charts when component unmounts
    return () => {
      if (chartRef1.current) {
        chartRef1.current.destroy();
      }
      if (chartRef2.current) {
        chartRef2.current.destroy();
      }
    };
  }, [appointments]);

  // Function to save updated doctor availability
  const handleSave = async () => {
    const updatedAvailability = selectedDoctorAvailability[0];
    updatedAvailability.Room = selectedDoctorRoom;
    updatedAvailability.Status = selectedDoctorStatus;

    try {
      const response = await axios.put(`http://localhost:3000/doctorAvailability/${updatedAvailability.id}`, updatedAvailability);
      console.log(response.data.message);
      closePopup();
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  // Function to delete doctor availability
  const handleDelete = async (availabilityId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/doctorAvailability/${availabilityId}`);
      console.log(response.data.message);
      closePopup();
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
          <ReceptionistNavBar />
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
            <div className='flex justify-center mt-24 w-full h-fit font-bold text-4xl'>
                Dashboard
            </div>
            <div className='flex flex-row w-full h-fit gap-16 justify-center'>
                <div className='flex bg-custom-black rounded-xl w-fit h-fit px-4 py-1 gap-3 items-center'>
                    <img src={PatientPNG} className='h-10' alt='Patient Icon' />
                    <div className='flex flex-col justify-center'>
                    <h3 className='text-lg'>Patients</h3>
                    <h2 className='text-2xl font-bold text-custom-lightGreen'>{counts.totalPatients}</h2>
                    </div>
                </div>
                <div className='flex bg-custom-black rounded-xl w-fit h-fit px-4 py-1 gap-3 items-center'>
                    <img src={DoctorPNG} className='h-10' alt='Doctor Icon' />
                    <div className='flex flex-col justify-center'>
                    <h3 className='text-lg'>Doctors</h3>
                    <h2 className='text-2xl font-bold text-custom-lightGreen'>{counts.totalDoctors}</h2>
                    </div>
                </div>
                <div className='flex bg-custom-black rounded-xl w-fit h-fit px-4 py-1 gap-3 items-center'>
                    <img src={MedicinePNG} className='h-10' alt='Medicine Icon' />
                    <div className='flex flex-col justify-center'>
                    <h3 className='text-lg'>Medicines</h3>
                    <h2 className='text-2xl font-bold text-custom-lightGreen'>{counts.totalMedicines}</h2>
                    </div>
                </div>
                <div className='flex bg-custom-black rounded-xl w-fit h-fit px-4 py-1 gap-3 items-center'>
                    <img src={AppointmentPNG} className='h-10' alt='Appointment Icon' />
                    <div className='flex flex-col justify-center'>
                    <h3 className='text-lg'>Appointments</h3>
                    <h2 className='text-2xl font-bold text-custom-lightGreen'>{counts.totalAppointments}</h2>
                    </div>
                </div>
            </div>
            <div className='flex flex-row px-20 gap-4'>
                <div className='flex flex-col w-1/2 h-fit gap-4'>
                    <h3 className='text-xl font-medium ml-5'>Today's Appointments</h3>
                    <div className='flex bg-custom-black w-full rounded-3xl p-8'>
                    <canvas id='myChart'></canvas>
                    </div>
                </div>
                <div className='flex flex-col w-1/2 h-fit gap-4'>
                    <h3 className='text-xl font-medium ml-5'>Patients</h3>
                    <div className='flex bg-custom-black w-full rounded-3xl p-8'>
                    <canvas id='myChart2'></canvas>
                    </div>
                </div>
            </div>
            <div className='flex flex-row px-20 gap-4'>
                <div className='flex flex-col w-[70%] h-fit gap-4'>
                    <h3 className='text-xl font-medium ml-5'>Doctors Availability</h3>
                    <div className='flex justify-center bg-custom-black w-full rounded-3xl p-6'>
                      <table className='table-auto border-separate border-spacing-y-2 border-spacing-x-6'>
                        <thead>
                          <tr className='gap-4 '>
                            <th>Doctor</th>
                            <th>Room</th>
                            <th>Available Days</th>
                            <th>Available Time</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctors.map((doctor, index) => (
                            <tr key={index} className='text-sm '>
                              <td>{doctor.First_Name} {doctor.Last_Name}</td>
                              <td>{doctor.Room}</td>
                              <td>{doctor.AvailableDays}</td>
                              <td>{doctor.AvailableTime}</td>
                              <td>{doctor.Status}</td>
                              <td>
                                <Button className='text-white bg-custom-darkGreen text-sm font-medium px-4 py-[4px] rounded-md w-fit'
                                        onClick={() => openPopup(doctor)}>
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </div>
        {selectedDoctor && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
          <div className='bg-custom-black p-5 rounded-lg'>
            <div className='flex items-center justify-center'>
                <div className='absolute bg-custom-black text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
                    <div className='relative flex flex-col items-center text-white pt-5 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
                        <h2 className='text-2xl p-6 font-semibold'>{selectedDoctor.First_Name} {selectedDoctor.Last_Name}</h2>
                        <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                            <h3 className='text-lg font-medium w-[35%]'>Request</h3>
                            <textarea className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]' readOnly>
                              {selectedDoctorAvailability.length > 0 && selectedDoctorAvailability[0].note}
                            </textarea>
                        </div>
                        <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                            <h3 className='text-lg font-medium w-[35%]'>Room</h3>
                            <select className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]' value={selectedDoctorRoom} onChange={(e) => setSelectedDoctorRoom(e.target.value)}>
                              <option value="Room 01">Room 01</option>
                              <option value="Room 02">Room 02</option>
                            </select>
                        </div>
                        <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                            <h3 className='text-lg font-medium w-[35%]'>Available Days</h3>
                            <DayRangePicker value={selectedDoctorAvailability.map(avail => avail.date)} />
                        </div>
                        <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                            <h3 className='text-lg font-medium w-[35%]'>Available Time</h3>
                            <div className='flex items-center gap-4 w-[65%]'>
                              <div className='w-1/2 text-white bg-custom-black border-2 border-custom-darkGreen rounded-md'>
                                <TimePickerComponent className="react-time-picker" clockClassName="react-time-picker__clock" placeholder='Select a time' value={selectedDoctorAvailability.length > 0 ? selectedDoctorAvailability[0].start_time : null}></TimePickerComponent>
                              </div>
                              <p>-</p>
                              <div className='w-1/2 text-white bg-custom-black border-2 border-custom-darkGreen rounded-md'>
                                <TimePickerComponent placeholder='Select a time' value={selectedDoctorAvailability.length > 0 ? selectedDoctorAvailability[0].close_time : null}></TimePickerComponent>
                              </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                            <h3 className='text-lg font-medium w-[35%]'>Status</h3>
                            <select className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]' value={selectedDoctorStatus} onChange={(e) => setSelectedDoctorStatus(e.target.value)}>
                              <option value="Available">Available</option>
                              <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className='flex flex-row items-center w-[60%] px-8 gap-4 mt-10'>
                            <div className='w-1/3'>
                                <Button className="bg-custom-red hover:opacity-80 text-white text-base font-medium px-4 py-2 rounded-md w-full" onClick={() => handleDelete(selectedDoctorAvailability[0].id)}>Delete</Button>
                            </div>
                            <div className='w-1/3'>
                                <Button onClick={closePopup} className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:outline-custom-red">Cancel</Button>
                            </div>
                            <div className='w-1/3'>
                                <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen" onClick={handleSave}>Save</Button>
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
    </div>
  );
}

export default Dashboard;
