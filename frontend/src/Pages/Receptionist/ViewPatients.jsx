import React,{useState} from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import {Button} from '../../Components/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SearchBar from '../../Components/SearchBar';

function ViewPatients() {

  const [patients] = useState([
    { name: 'Vijitha', nic: 'Room 01', dob: 'Sun - Fri', gender: 'Male', mobile: 'available', email: 'Edit', address: 'Edit', weight: 'Edit', height: 'Edit', bloodGroup: 'Edit' },
    { name: 'Jayasiri', nic: 'Room 01', dob: 'Sun - Fri', gender: 'Male', mobile: 'available', email: 'Edit', address: 'Edit', weight: 'Edit', height: 'Edit', bloodGroup: 'Edit' },
    { name: 'P. P. Wijesekara', nic: 'Room 01', dob: 'Sun - Fri', gender: 'Male', mobile: 'available', email: 'Edit', address: 'Edit', weight: 'Edit', height: 'Edit', bloodGroup: 'Edit' },
    { name: 'P. P. Wijesekara', nic: 'Room 01', dob: 'Sun - Fri', gender: 'Male', mobile: 'available', email: 'Edit', address: 'Edit', weight: 'Edit', height: 'Edit', bloodGroup: 'Edit' },
    { name: 'P. P. Wijesekara', nic: 'Room 01', dob: 'Sun - Fri', gender: 'Male', mobile: 'available', email: 'Edit', address: 'Edit', weight: 'Edit', height: 'Edit', bloodGroup: 'Edit' },
    { name: 'P. P. Wijesekara', nic: 'Room 01', dob: 'Sun - Fri', gender: 'Male', mobile: 'available', email: 'Edit', address: 'Edit', weight: 'Edit', height: 'Edit', bloodGroup: 'Edit' },
    { name: 'P. P. Wijesekara', nic: 'Room 01', dob: 'Sun - Fri', gender: 'Male', mobile: 'available', email: 'Edit', address: 'Edit', weight: 'Edit', height: 'Edit', bloodGroup: 'Edit' },
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const openPopup = (Patient) => {
    setSelectedPatient(Patient);
  };

  const closePopup = () => {
    setSelectedPatient(null);
  };

  const [familyMember] = useState([
    { relationship: 'mother', name: 'Vijitha', dob: 'Sun - Fri', gender: 'Male', weight: 'Edit', height: 'Edit', bloodGroup: 'Edit' },
    { relationship: 'mother', name: 'Vijitha', dob: 'Sun - Fri', gender: 'Male', weight: 'Edit', height: 'Edit', bloodGroup: 'Edit' },
    { relationship: 'mother', name: 'Vijitha', dob: 'Sun - Fri', gender: 'Male', weight: 'Edit', height: 'Edit', bloodGroup: 'Edit' },
  ]);

  // const [selectedfamilyMember, setSelectedfamilyMember] = useState(null);


  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
            <ReceptionistNavBar/>
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
            <div className='flex justify-center mt-28 w-full h-fit font-bold text-4xl'>
                Patients
            </div>
            <div className='px-20'>
              <div className='px-5 py-4'>
                <SearchBar/>
              </div>
              <div className='flex justify-center bg-custom-black w-full rounded-3xl p-6'>
                <table className='table-auto border-separate border-spacing-y-2 border-spacing-x-6'>
                  <thead>
                    <tr className='gap-4 '>
                      <th>Name</th>
                      <th>NIC Number</th>
                      <th>Date of Birth</th>
                      <th>Gender</th>
                      <th>Mobile Number</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Weight</th>
                      <th>Height</th>
                      <th>Blood Group</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient, index) => (
                      <tr key={index} className='text-sm '>
                        <td>{patient.name}</td>
                        <td>{patient.nic}</td>
                        <td>{patient.dob}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.mobile}</td>
                        <td>{patient.email}</td>
                        <td>{patient.address}</td>
                        <td>{patient.weight}</td>
                        <td>{patient.height}</td>
                        <td>{patient.bloodGroup}</td>
                        <td>
                          <Button className='text-white bg-custom-darkGreen text-sm font-medium px-4 py-[4px] rounded-md w-fit'
                                  onClick={() => openPopup(patient)}>
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
        {selectedPatient && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
            <div className='bg-custom-black p-5 rounded-lg'>
              <div className='flex items-center justify-center'>
                <div className='absolute bg-custom-black text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
                  <div className='relative flex flex-col items-center text-white pt-5 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
                    <h2 className='text-2xl p-6 font-semibold'>{selectedPatient.name}</h2>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>NIC Number</h3>
                        <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>First Name</h3>
                        <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>Last Name</h3>
                        <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>Mobile Number</h3>
                        <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>Email</h3>
                        <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>Date of Birth</h3>
                        <input type='date' className='rounded-md bg-custom-black border-2 border-custom-darkGreen w-[65%] p-2 outline-none'/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>Gender</h3>
                        <select className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>Address</h3>
                        <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>Weight</h3>
                        <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>Height</h3>
                        <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                    </div>
                    <div className='flex flex-row items-center gap-2 w-[60%] px-8 mt-4'>
                        <h3 className='text-lg font-medium w-[35%]'>Blood Group</h3>
                        <input type='text' className='bg-custom-black border-2 border-custom-darkGreen rounded-md p-2 w-[65%]'/>
                    </div>
                    <div className='flex flex-row items-center w-[60%] px-8 gap-4 mt-10'>
                        <div className='w-1/4'>
                            <Button className="bg-custom-red hover:opacity-80 text-white text-base font-medium px-4 py-2 rounded-md w-full">Delete</Button>
                        </div>
                        <div className='w-1/4'>
                            <Button className="bg-custom-red hover:opacity-80 text-white text-base font-medium px-4 py-2 rounded-md w-full">Block</Button>
                        </div>
                        <div className='w-1/4'>
                            <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Save</Button>
                        </div>
                        <div className='w-1/4'>
                            <Button onClick={closePopup} className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:outline-custom-red">Cancel</Button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center mt-5'>
                      <h2 className='text-2xl p-6 font-semibold'>Family Members</h2>
                      <table className='table-auto border-separate border-spacing-y-2 border-spacing-x-6'>
                        <thead>
                          <tr className='gap-4 '>
                            <th>Relationship</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Weight</th>
                            <th>Height</th>
                            <th>Blood Group</th>
                          </tr>
                        </thead>
                        <tbody>
                          {familyMember.map((familyMember, index) => (
                            <tr key={index} className='text-sm '>
                              <td>{familyMember.relationship}</td>
                              <td>{familyMember.name}</td>
                              <td>{familyMember.dob}</td>
                              <td>{familyMember.gender}</td>
                              <td>{familyMember.weight}</td>
                              <td>{familyMember.height}</td>
                              <td>{familyMember.bloodGroup}</td>
                              <td>
                                <Button className='text-white bg-custom-darkGreen text-sm font-medium px-4 py-[4px] rounded-md w-fit'>
                                  remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <h2 className='text-2xl p-6 font-semibold'>Add Family Members</h2>
                      <div className='w-full'>
                        <div className='flex flex-row items-center gap-4 mt-4'>
                          <div className='w-1/2'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Relationship</h2>
                            <input type='text' className='rounded-md bg-custom-black border-2 border-custom-darkGreen w-full p-2 outline-none' placeholder='Enter relationship'/>
                          </div>
                          <div className='flex flex-col w-1/2'>
                            <div className='flex gap-5'>
                                <div className='flex flex-col w-1/2'>
                                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Date of Birth</h2>
                                    <input type='date' className='rounded-md bg-custom-black border-2 border-custom-darkGreen w-full p-2 outline-none'/>
                                </div>
                                <div className='flex flex-col w-1/2'>
                                    <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Gender</h2>
                                    <select id='gender' className='rounded-md bg-custom-black border-2 border-custom-darkGreen w-full p-2 outline-none'>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-row items-center gap-4 mt-4'>
                          <div className='w-1/2'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>First Name</h2>
                            <input type='text' className='rounded-md bg-custom-black border-2 border-custom-darkGreen w-full p-2 outline-none' placeholder='Enter your first name'/>
                          </div>
                          <div className='w-1/2'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Weight</h2>
                            <input type='text' className='rounded-md bg-custom-black border-2 border-custom-darkGreen w-full p-2 outline-none' placeholder='Enter your address'/>
                          </div>
                        </div>
                        <div className='flex flex-row items-center gap-4 mt-4'>
                          <div className='w-1/2'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Last Name</h2>
                            <input type='text' className='rounded-md bg-custom-black border-2 border-custom-darkGreen w-full p-2 outline-none' placeholder='Enter your first name'/>
                          </div>
                          <div className='w-1/2'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Height</h2>
                            <input type='text' className='rounded-md bg-custom-black border-2 border-custom-darkGreen w-full p-2 outline-none' placeholder='Enter your address'/>
                          </div>
                        </div>
                        <div className='flex flex-row items-center gap-4 mt-4'>
                          <div className='w-1/2'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Blood Group</h2>
                            <input type='text' className='rounded-md bg-custom-black border-2 border-custom-darkGreen w-full p-2 outline-none' placeholder='Enter your address'/>
                          </div>
                        </div>
                        <div className='flex flex-row items-center gap-4 mt-6'>
                          <div className='w-1/2'>
                              <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:outline-custom-red">Cancel</Button>
                          </div>
                          <div className='w-1/2'>
                            <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Add</Button>
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
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewPatients
