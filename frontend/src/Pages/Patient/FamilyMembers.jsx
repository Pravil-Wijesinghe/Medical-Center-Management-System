import React, { useState, useEffect } from 'react';
import Background from '../../Components/Background';
import PatientNavBar from '../../Components/PatientNavBar';
import { Button } from '../../Components/Button';
import { TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

function FamilyMembers() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFamilyMember, setNewFamilyMember] = useState({
    relationship: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    weight: '',
    height: '',
    mobileNumber: '',
    bloodGroup: ''
  });

  const patientNic = JSON.parse(localStorage.getItem('user')).NIC;

  useEffect(() => {
    axios.get(`http://localhost:3000/familyMember/${patientNic}`)
      .then(response => {
        setFamilyMembers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the family members!', error);
      });
  }, [patientNic]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedFamilyMembers(familyMembers.map(member => member.Member_ID));
    } else {
      setSelectedFamilyMembers([]);
    }
  };

  const handleSelectMember = (memberId) => {
    if (selectedFamilyMembers.includes(memberId)) {
      setSelectedFamilyMembers(selectedFamilyMembers.filter(id => id !== memberId));
    } else {
      setSelectedFamilyMembers([...selectedFamilyMembers, memberId]);
    }
  };

  const handleRemoveSelected = () => {
    setShowModal(true);
  };

  const confirmRemove = () => {
    selectedFamilyMembers.forEach(memberId => {
      axios.delete(`http://localhost:3000/familyMember/${patientNic}/${memberId}`)
        .then(response => {
          setFamilyMembers(familyMembers.filter(member => member.Member_ID !== memberId));
        })
        .catch(error => {
          console.error('There was an error deleting the family member!', error);
        });
    });
    setSelectedFamilyMembers([]);
    setSelectAll(false);
    setShowModal(false);
  };

  const cancelRemove = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFamilyMember({
      ...newFamilyMember,
      [name]: value
    });
  };

  const handleSaveMember = () => {
    axios.post('http://localhost:3000/familyMember', { ...newFamilyMember, patientNic })
      .then(response => {
        setFamilyMembers([...familyMembers, response.data.member]);
        setNewFamilyMember({
          relationship: '',
          firstName: '',
          lastName: '',
          dob: '',
          gender: 'Male',
          weight: '',
          height: '',
          mobileNumber: '',
          bloodGroup: ''
        });
      })
      .catch(error => {
        console.error('There was an error adding the family member!', error);
      });
  };

  const handleCancel = () => {
    setNewFamilyMember({
      relationship: '',
      firstName: '',
      lastName: '',
      dob: '',
      gender: 'Male',
      weight: '',
      height: '',
      mobileNumber: '',
      bloodGroup: ''
    });
  };

  return (
    <div className='relative text-white font-montserrat'>
      <Background />
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <PatientNavBar />
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
                        <input type='checkbox' checked={selectedFamilyMembers.includes(familyMember.Member_ID)} onChange={() => handleSelectMember(familyMember.Member_ID)} />
                      </td>
                      <td className='px-10 py-3'>{familyMember.Relationship}</td>
                      <td className='px-12 py-3'>{familyMember.First_Name} {familyMember.Last_Name}</td>
                      <td className='px-12 py-3'>{new Date(familyMember.DOB).toLocaleDateString()}</td>
                      <td className='px-12 py-3 rounded-r-lg'>{familyMember.Gender}</td>
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
                  <select
                      id='relationship'
                      name='relationship'
                      className='rounded-md border-2 h-9 w-full p-2 outline-none'
                      value={newFamilyMember.relationship}
                      onChange={handleInputChange}
                    >
                    <option value=''>Select relationship</option>
                    <option value='Mother'>Mother</option>
                    <option value='Father'>Father</option>
                    <option value='Wife'>Wife</option>
                    <option value='Son'>Son</option>
                    <option value='Daughter'>Daughter</option>
                  </select>
                </div>
                <div className='flex flex-col w-1/2'>
                  <div className='flex gap-5'>
                    <div className='flex flex-col w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-2'>Date of Birth</h2>
                      <input type='date' name='dob' value={newFamilyMember.dob} onChange={handleInputChange} className='rounded-md border-2 h-9 w-full p-2 outline-none' />
                    </div>
                    <div className='flex flex-col w-1/2'>
                      <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Gender</h2>
                      <select id='gender' name='gender' value={newFamilyMember.gender} onChange={handleInputChange} className='rounded-md border-2 h-9 w-full p-2 outline-none'>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-row items-center gap-4 mt-4'>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>First Name</h2>
                  <input type='text' name='firstName' value={newFamilyMember.firstName} onChange={handleInputChange} className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your first name' />
                </div>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>Weight</h2>
                  <input type='text' name='weight' value={newFamilyMember.weight} onChange={handleInputChange} className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter weight' />
                </div>
              </div>
              <div className='flex flex-row items-center gap-4 mt-4'>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>Last Name</h2>
                  <input type='text' name='lastName' value={newFamilyMember.lastName} onChange={handleInputChange} className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your last name' />
                </div>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>Height</h2>
                  <input type='text' name='height' value={newFamilyMember.height} onChange={handleInputChange} className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter height' />
                </div>
              </div>
              <div className='flex flex-row items-center gap-4 mt-4'>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>Mobile Number</h2>
                  <input type='text' name='mobileNumber' value={newFamilyMember.mobileNumber} onChange={handleInputChange} className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter mobile number' />
                </div>
                <div className='w-1/2'>
                  <h2 className='text-base font-semibold mb-0.5 ml-2'>Blood Group</h2>
                  <input type='text' name='bloodGroup' value={newFamilyMember.bloodGroup} onChange={handleInputChange} className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter blood group' />
                </div>
              </div>
              <div className='flex flex-row items-center gap-4 mt-8'>
                <div className='w-1/2'>
                  <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full" onClick={handleCancel}>Cancel</Button>
                </div>
                <div className='w-1/2'>
                  <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen" onClick={handleSaveMember}>Save</Button>
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
            <p className='mt-4'>Are you sure you want to delete the selected family members?</p>
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

export default FamilyMembers;
