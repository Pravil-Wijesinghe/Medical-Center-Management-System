import React, { useState, useEffect } from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import SearchBar from '../../Components/SearchBar';
import { Button } from '../../Components/Button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

function ViewMedicines() {
    const [medicines, setMedicines] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        mgf_date: '',
        exp_date: '',
        quantity: '',
        supplying_price: '',
        selling_price: '',
    });

    // Fetch all medicines from the backend when the component mounts
    useEffect(() => {
        // Fetch all medicines from the backend
        axios.get('http://localhost:3000/medicine')
            .then(response => setMedicines(response.data))
            .catch(error => console.error('Error fetching medicines:', error));
    }, []);

    // Open the popup and set the selected medicine and form data
    const openPopup = (medicine) => {
        setSelectedMedicine(medicine);
        setFormData({
            name: medicine.name,
            description: medicine.description,
            mgf_date: medicine.mgf_date,
            exp_date: medicine.exp_date,
            quantity: medicine.quantity,
            supplying_price: medicine.supplying_price,
            selling_price: medicine.selling_price,
        });
    };

    // Close the popup and reset the form data
    const closePopup = () => {
        setSelectedMedicine(null);
        setFormData({
            name: '',
            description: '',
            mgf_date: '',
            exp_date: '',
            quantity: '',
            supplying_price: '',
            selling_price: '',
        });
    };

    // Handle input changes in the form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission for updating a medicine
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/medicine/${selectedMedicine.Medicine_ID}`, formData);
            closePopup();
            // Refresh medicines list after update
            const response = await axios.get('http://localhost:3000/medicine');
            setMedicines(response.data);
            alert('Successfully Updated!');
        } catch (error) {
            console.error('Error updating medicine:', error);
        }
    };

    return (
        <div className='text-white font-montserrat'>
            <div className='bg-custom-blackGreen w-full h-screen'>
                <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
                    <ReceptionistNavBar />
                </div>
                <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
                    <div className='flex justify-center mt-28 w-full h-fit font-bold text-4xl'>
                        Medicines
                    </div>
                    <div className='px-20'>
                        <div className='px-5 py-4'>
                            <SearchBar />
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
                                    {medicines.map((medicine, index) => (
                                        <tr key={index} className='text-sm '>
                                            <td>{medicine.Medicine_ID}</td>
                                            <td>{medicine.name}</td>
                                            <td>{medicine.description}</td>
                                            <td>{medicine.mgf_date}</td>
                                            <td>{medicine.exp_date}</td>
                                            <td>{medicine.quantity}</td>
                                            <td>{medicine.supplying_price}</td>
                                            <td>{medicine.selling_price}</td>
                                            <td>
                                                <Button
                                                    className='text-white bg-custom-darkGreen text-sm font-medium px-4 py-[4px] rounded-md w-fit'
                                                    onClick={() => openPopup(medicine)}>
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
                                        <form onSubmit={handleUpdate}>
                                            <div className='flex flex-row justify-start w-full gap-6'>
                                                <div className='w-1/2'>
                                                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Set Image</h2>
                                                    <div className='flex items-center justify-center rounded-xl border-2 border-custom-darkGreen bg-white w-full h-80 overflow-hidden'>
                                                        <input type='file' className='' placeholder='Add Medicine Image' />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col w-1/2 gap-6'>
                                                    <div>
                                                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Medicine Name</h2>
                                                        <input
                                                            type='text'
                                                            className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                                            name='name'
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Description</h2>
                                                        <textarea
                                                            className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-56 w-full p-2 outline-none'
                                                            name='description'
                                                            value={formData.description}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-row items-center w-full gap-6 mt-4'>
                                                <div className='w-1/2'>
                                                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Manufacture Date</h2>
                                                    <input
                                                        type='date'
                                                        className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                                        name='mgf_date'
                                                        value={formData.mgf_date}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className='w-1/2'>
                                                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Expiration Date</h2>
                                                    <input
                                                        type='date'
                                                        className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                                        name='exp_date'
                                                        value={formData.exp_date}
                                                        onChange={handleChange}
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
                                                        name='quantity'
                                                        value={formData.quantity}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className='w-1/3'>
                                                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Supplying price</h2>
                                                    <input
                                                        type='text'
                                                        className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                                        name='supplying_price'
                                                        value={formData.supplying_price}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className='w-1/3'>
                                                    <h2 className='text-base font-semibold mb-0.5 ml-2'>Selling Price</h2>
                                                    <input
                                                        type='text'
                                                        className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                                                        name='selling_price'
                                                        value={formData.selling_price}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-row items-center justify-center w-full gap-4 mt-4 mb-12'>
                                                <div className='w-1/3'>
                                                    <Button
                                                        className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-base font-medium px-4 py-2 rounded-md w-full"
                                                        onClick={closePopup}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                                <div className='w-1/3'>
                                                    <Button
                                                        type="submit"
                                                        className="bg-custom-darkGreen border-2 border-custom-darkGreen  text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen"
                                                    >
                                                        Update a Medicine
                                                    </Button>
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

export default ViewMedicines;
