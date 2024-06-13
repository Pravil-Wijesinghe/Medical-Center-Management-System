import React, { useState } from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import { Button } from '../../Components/Button'; 
import axios from 'axios';

function AddMedicine() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mgf_date: '',
    exp_date: '',
    quantity: '',
    supplying_price: '',
    selling_price: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    // Handle file upload logic if needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/medicine/add', formData);
      console.log(response.data);
      // Clear form fields on successful submission
      setFormData({
        name: '',
        description: '',
        mgf_date: '',
        exp_date: '',
        quantity: '',
        supplying_price: '',
        selling_price: '',
      });
    } catch (error) {
      console.error('There was an error adding the medicine:', error);
    }
  };

  const handleCancel = () => {
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

  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
          <ReceptionistNavBar/>
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
          <div className='flex justify-center mt-24 w-full h-fit font-bold text-4xl'>
            Add Medicine
          </div>
          <div className='flex flex-col justify-center px-60 gap-6'>
            <div className='flex flex-row justify-start w-full gap-6'>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Set Image</h2>
                <div className='flex items-center justify-center rounded-xl border-2 border-custom-darkGreen bg-white w-full h-80 overflow-hidden'>
                  <input type='file' className='' placeholder='Add Medicine Image' onChange={handleFileChange} />
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
            <div className='flex flex-row items-center w-full gap-6'>
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
            <div className='flex flex-row items-center w-full gap-6'>
              <h2 className='text-xl font-semibold mb-0.5 ml-2'>Stock and Pricing</h2>
            </div>
            <div className='flex flex-row items-center w-full gap-6'>
              <div className='w-1/3'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Quantity</h2>
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
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
              <div className='w-1/3'>
                <Button
                  className="bg-custom-darkGreen border-2 border-custom-darkGreen  text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen"
                  onClick={handleSubmit}
                >
                  Add a Medicine
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMedicine;
