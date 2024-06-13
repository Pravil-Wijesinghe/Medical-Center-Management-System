import React, { useState, useEffect } from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import SearchBar from '../../Components/SearchBar';
import { Button } from '../../Components/Button';
import { XMarkIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [patientsChecked, setPatientsChecked] = useState('');
  const [doctorFee, setDoctorFee] = useState('');
  const [payment, setPayment] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getDoctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const openDoctorPopup = (doctor) => {
    setSelectedDoctor(doctor);
    setShowPaymentPopup(false);
  };

  const openPaymentPopup = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorFee(doctor.Doctor_Fee);
    setShowPaymentPopup(true);
  };

  const closePopup = () => {
    setSelectedDoctor(null);
    setShowPaymentPopup(false);
  };

  const handleUpdateDoctor = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/updateDoctor/${selectedDoctor.NIC}`, selectedDoctor);
      if (response.status === 200) {
        alert('Successfully Updated!');
        fetchDoctors();
        closePopup();
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('Failed to update doctor.');
    }
  };

  const handleDeleteDoctor = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/deleteDoctor/${selectedDoctor.NIC}`);
      if (response.status === 200) {
        alert('Doctor deleted successfully!');
        fetchDoctors();
        closePopup();
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('Failed to delete doctor.');
    }
  };

  const handleCompletePayment = async () => {
    const paymentData = {
      Doctor_NIC: selectedDoctor.NIC,
      Patients: patientsChecked,
      Payment: payment,
      Issue_Date: new Date().toISOString().split('T')[0]
    };
    try {
      const response = await axios.post('http://localhost:3000/addPayment', paymentData);
      if (response.status === 200) {
        alert('Payment added successfully!');
        closePopup();
      }
    } catch (error) {
      console.error('Error adding payment:', error);
      alert('Failed to add payment.');
    }
  };

  useEffect(() => {
    if (doctorFee && patientsChecked) {
      setPayment(doctorFee * patientsChecked);
    }
  }, [doctorFee, patientsChecked]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedDoctor({ ...selectedDoctor, [name]: value });
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
                      <td>{doctor.First_Name}</td>
                      <td>{doctor.NIC}</td>
                      <td>{doctor.Specialization}</td>
                      <td>{doctor.Mobile_Number}</td>
                      <td>{doctor.Email}</td>
                      <td>{doctor.Address}</td>
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
                    <h2 className='text-2xl p-6 font-semibold'>{selectedDoctor.First_Name}</h2>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[35%]'>NIC Number</h3>
                      <input type='text' defaultValue={selectedDoctor.NIC} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]' name='NIC' onChange={handleInputChange}/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[35%]'>Name</h3>
                      <input type='text' defaultValue={selectedDoctor.First_Name} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]' name='First_Name' onChange={handleInputChange}/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[35%]'>Specialization</h3>
                      <input type='text' defaultValue={selectedDoctor.Specialization} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]' name='Specialization' onChange={handleInputChange}/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[35%]'>Mobile Number</h3>
                      <input type='text' defaultValue={selectedDoctor.Mobile_Number} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]' name='Mobile_Number' onChange={handleInputChange}/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[35%]'>Email</h3>
                      <input type='text' defaultValue={selectedDoctor.Email} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]' name='Email' onChange={handleInputChange}/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[35%]'>Address</h3>
                      <input type='text' defaultValue={selectedDoctor.Address} className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]' name='Address' onChange={handleInputChange}/>
                    </div>
                    <div className='flex flex-row items-center w-[60%] px-8 gap-4 mt-10'>
                      <div className='w-1/3'>
                        <Button className="bg-custom-red hover:opacity-80 text-white text-base font-medium px-4 py-2 rounded-md w-full" onClick={handleDeleteDoctor}>Delete</Button>
                      </div>
                      <div className='w-1/3'>
                        <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen" onClick={handleUpdateDoctor}>Save</Button>
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
                    <h2 className='text-2xl p-6 font-semibold'>Payment for {selectedDoctor.First_Name}</h2>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[50%]'>Issue Date:</h3>
                      <input type='date' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[50%]' defaultValue={new Date().toISOString().split('T')[0]}/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[50%]'>Patients that are checked:</h3>
                      <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[50%]' value={patientsChecked} onChange={(e) => setPatientsChecked(e.target.value)}/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[50%]'>Doctor fee</h3>
                      <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[50%]' value={doctorFee} readOnly/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                      <h3 className='text-lg font-medium w-[50%]'>Payment (LKR):</h3>
                      <h3 className='text-lg font-medium w-[50%]'>{payment}</h3>
                    </div>
                    <div className='flex flex-row items-center w-[60%] px-8 gap-4 mt-10'>
                    <div className='w-1/2'>
                        <Button onClick={closePopup} className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:outline-custom-red">Cancel</Button>
                      </div>
                      <div className='w-1/2'>
                        <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen" onClick={handleCompletePayment}>Complete Payment</Button>
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
