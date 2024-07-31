import React, { useEffect, useState } from 'react';
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import axios from 'axios';

function Payment() {
  // State to store payments data
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payments data on component mount
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/payments');
      // Update state with fetched data
      setPayments(response.data);
    } catch (error) {
      // Log error if fetching fails
      console.error('Error fetching payments:', error);
    }
  };

  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
            <ReceptionistNavBar/>
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
            <div className='flex justify-center mt-28 w-full h-fit font-bold text-4xl'>
                Doctor Payments
            </div>
            <div className='px-20'>
                <div className='flex justify-center bg-custom-black w-full rounded-3xl p-6'>
                    <table className='table-auto border-separate border-spacing-y-2 border-spacing-x-6'>
                        <thead>
                            <tr className='gap-4 '>
                                <th>Doctor NIC</th>
                                <th>Doctor Name</th>
                                <th>Patients</th>
                                <th>Payment</th>
                                <th>Issue Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                              <tr key={index} className='text-sm'>
                                <td>{payment.Doctor_NIC}</td>
                                <td>{`${payment.First_Name} ${payment.Last_Name}`}</td>
                                <td>{payment.Patients}</td>
                                <td>{payment.Payment}</td>
                                <td>{new Date(payment.Issue_Date).toISOString().split('T')[0]}</td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;
