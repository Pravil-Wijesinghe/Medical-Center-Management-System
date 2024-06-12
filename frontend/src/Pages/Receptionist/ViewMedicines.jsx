import React,{useState} from 'react'
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import SearchBar from '../../Components/SearchBar';
import {Button} from '../../Components/Button';
import {XMarkIcon} from '@heroicons/react/24/solid';

function ViewMedicines() {

    const [medicines] = useState([
        { medicineID: 'Vijitha', name: 'Room 01', description: 'Sun - Fri', mfgDate: 'Male', expDate: 'available', quantity: 'Edit', supPrice: 'Edit', sellPrice: 'Edit',},
      ]);
    
      const [selectedMedicine, setSelectedMedicine] = useState(null);
    
      const openPopup = (Medicine) => {
        setSelectedMedicine(Medicine);
      };
    
      const closePopup = () => {
        setSelectedMedicine(null);
      };


  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
            <ReceptionistNavBar/>
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
            <div className='flex justify-center mt-28 w-full h-fit font-bold text-4xl'>
                Medicines
            </div>
            <div className='px-20'>
                <div className='px-5 py-4'>
                    <SearchBar/>
                </div>
                <div className='flex justify-center bg-custom-black w-full rounded-3xl p-6'>
                    <table className='table-auto border-separate border-spacing-y-2 border-spacing-x-6'>
                    <thead>
                        <tr className='gap-4 '>
                        <th>Medicine ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>MFG Date</th>
                        <th>EXP Date</th>
                        <th>Available Stock</th>
                        <th>Supplying Price</th>
                        <th>Selling Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((Medicine, index) => (
                        <tr key={index} className='text-sm '>
                            <td>{Medicine.medicineID}</td>
                            <td>{Medicine.name}</td>
                            <td>{Medicine.description}</td>
                            <td>{Medicine.mfgDate}</td>
                            <td>{Medicine.expDate}</td>
                            <td>{Medicine.quantity}</td>
                            <td>{Medicine.supPrice}</td>
                            <td>{Medicine.sellPrice}</td>
                            <td>
                            <Button className='text-white bg-custom-darkGreen text-sm font-medium px-4 py-[4px] rounded-md w-fit'
                                    onClick={() => openPopup(Medicine)}>
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
        {selectedMedicine && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                <div className='bg-custom-black p-5 rounded-lg'>
                    <div className='flex items-center justify-center'>
                        <div className='absolute bg-custom-black text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4'>
                            <div className='relative flex flex-col items-center text-white pt-5 pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
                                <h2 className='text-2xl p-6 font-semibold'>{selectedMedicine.name}</h2>
                                <div>
                                    <div className='flex flex-row justify-start w-full gap-6'>
                                        <div className='w-1/2'>
                                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Set Image</h2>
                                            <div className='flex items-center justify-center rounded-xl border-2 border-custom-darkGreen bg-white w-full h-80 overflow-hidden'>
                                                <input type='file' className='' placeholder='Add Medicine Image'/>
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-1/2 gap-6'>
                                            <div>
                                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Medicine Name</h2>
                                                <input
                                                    type='text'
                                                    className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                                />
                                            </div>
                                            <div>
                                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Description</h2>
                                                <textarea className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-56 w-full p-2 outline-none'>Description</textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center w-full gap-6 mt-4'>
                                        <div className='w-1/2'>
                                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Manufacture Date</h2>
                                            <input
                                                type='date'
                                                className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Expiration Date</h2>
                                            <input
                                                type='date'
                                                className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center w-full gap-6 mt-5'>
                                        <h2 className='text-xl font-semibold mb-0.5 ml-2'>Stock and Pricing</h2>
                                    </div>
                                    <div className='flex flex-row items-center w-full gap-6'>
                                        <div className='w-1/3'>
                                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Available Stock</h2>
                                            <input
                                                type='text'
                                                className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                                name='First_Name'
                                            />
                                        </div>
                                        <div className='w-1/3'>
                                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Supplying price</h2>
                                            <input
                                                type='text'
                                                className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                            />
                                        </div>
                                        <div className='w-1/3'>
                                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Selling Price</h2>
                                            <input
                                                type='text'
                                                className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center justify-center w-full gap-4 mt-4 mb-12'>
                                        <div className='w-1/3'>
                                            <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                                        </div>
                                        <div className='w-1/3'>
                                            <Button className="bg-custom-darkGreen border-2 border-custom-darkGreen  text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Update a Medicine</Button>
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

export default ViewMedicines
