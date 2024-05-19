import React, {useState} from 'react';
import Background from '../../Components/Background';
import PatientNavBar from '../../Components/PatientNavBar';
import {Button} from '../../Components/Button';
import { TrashIcon } from '@heroicons/react/24/outline';

function FamilyMembers() {

  const [selectAll, setSelectAll] = useState(false);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([
    { relationship: 'Mother', name: 'Geetha', dob: '10/03/1975', gender: 'Female' },
    { relationship: 'Father', name: 'Jayasiri', dob: '10/03/1971', gender: 'Male' },
    { relationship: 'Son', name: 'Eric', dob: '10/03/2008', gender: 'Male' },
    { relationship: 'Grand Mother', name: 'Geetha', dob: '10/03/1943', gender: 'Female' },
    { relationship: 'Daughter', name: 'Seetha', dob: '10/03/2015', gender: 'Female' },
    // ...add other Family Members here
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedFamilyMembers(familyMembers.map(appt => appt.relationship));
    } else {
      setSelectedFamilyMembers([]);
    }
  };

  const handleSelectAppointment = (relationship) => {
    if (selectedFamilyMembers.includes(relationship)) {
      setSelectedFamilyMembers(selectedFamilyMembers.filter(apptRelationship => apptRelationship !== relationship));
    } else {
      setSelectedFamilyMembers([...selectedFamilyMembers, relationship]);
    }
  };

  const handleRemoveSelected = () => {
    setShowModal(true);
  };

  const confirmRemove = () => {
    setFamilyMembers(familyMembers.filter(appt => !selectedFamilyMembers.includes(appt.relationship)));
    setSelectedFamilyMembers([]);
    setSelectAll(false);
    setShowModal(false);
  };

  const cancelRemove = () => {
    setShowModal(false);
  };

  return (
    <div className='relative text-white font-montserrat'>
      <Background/>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <PatientNavBar/>
      </div>
      <div className='flex items-center justify-center'>
        <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
            <div className='absolute bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-semibold text-white'>Family Members</h2>
            </div>
            <div className='relative flex flex-col items-center mt-[60px] pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
              <div className='mt-5'>
                <table className='table-auto border-separate border-spacing-y-2'>
                  <thead>
                    <tr className='text-lg bg-white shadow-xl'>
                      <th className='py-2 px-8 rounded-l-lg'>
                        <input type='checkbox' checked={selectAll} onChange={handleSelectAll} />
                      </th>
                      <th className='font-semibold py-2'>Relationship</th>
                      <th className='font-semibold py-2'>Name</th>
                      <th className='font-semibold py-2'>Date of Birth</th>
                      <th className='font-semibold py-2 rounded-r-lg'>Gender</th>
                    </tr>
                  </thead>
                  <tbody className='text-sm'>
                    {familyMembers.map((familyMember, index) => (
                      <tr key={index} className='bg-white shadow-xl py-2 px-28 mt-5 rounded-lg'>
                        <td className='px-8 py-3 rounded-l-lg'>
                          <input type='checkbox' checked={selectedFamilyMembers.includes(familyMember.relationship)} onChange={() => handleSelectAppointment(familyMember.relationship)} />
                        </td>
                        <td className='px-10 py-3'>{familyMember.relationship}</td>
                        <td className='px-12 py-3'>{familyMember.name}</td>
                        <td className='px-12 py-3'>{familyMember.dob}</td>
                        <td className='px-12 py-3 rounded-r-lg'>{familyMember.gender}</td>
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
              <div className='flex flex-row items-center mt-10 mb-5'>
                <h2 className='text-2xl font-semibold'>Add Family Members</h2>
              </div>
              <div className='px-20 w-full'>
                <div className='flex flex-row items-center gap-4 mt-4'>
                  <div className='w-1/2'>
                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Relationship</h2>
                    <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter relationship'/>
                  </div>
                  <div className='flex flex-col w-1/2'>
                    <div className='flex gap-5'>
                        <div className='flex flex-col w-1/2'>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Date of Birth</h2>
                            <input type='date' className='rounded-md border-2 h-9 w-full p-2 outline-none'/>
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Gender</h2>
                            <select id='gender' className='rounded-md border-2 h-9 w-full p-2 outline-none'>
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
                    <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your first name'/>
                  </div>
                  <div className='w-1/2'>
                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Weight</h2>
                    <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your address'/>
                  </div>
                </div>
                <div className='flex flex-row items-center gap-4 mt-4'>
                  <div className='w-1/2'>
                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Last Name</h2>
                    <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your first name'/>
                  </div>
                  <div className='w-1/2'>
                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Height</h2>
                    <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your address'/>
                  </div>
                </div>
                <div className='flex flex-row items-center gap-4 mt-4'>
                  <div className='w-1/2'>
                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Mobile Number</h2>
                    <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your first name'/>
                  </div>
                  <div className='w-1/2'>
                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Blood Group</h2>
                    <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your address'/>
                  </div>
                </div>
                <div className='flex flex-row items-center gap-4 mt-8'>
                  <div className='w-1/2'>
                    <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                  </div>
                  <div className='w-1/2'>
                    <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Save</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

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
  )
}

export default FamilyMembers
