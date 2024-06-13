// frontend/src/Components/DoctorNavBar.jsx
import React, { useEffect, useState } from 'react';
import Logo from '../Images/Logo.png';
import { Link } from 'react-router-dom';
import { DoctorMenuItems } from './DoctorMenuItems';

function DoctorNavBar() {
  const [doctorName, setDoctorName] = useState('User');

  useEffect(() => {
    const fetchDoctorName = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.First_Name && storedUser.Last_Name) {
        setDoctorName(`${storedUser.First_Name} ${storedUser.Last_Name}`);
      }
    };
    fetchDoctorName();
  }, []);

  return (
    <div className='flex pt-2.5 justify-center h-screen'>
        <nav style={{fontFamily: "Montserrat, sans-serif"}} className='flex justify-between items-center p-8 shadow-xl w-[75%] h-16 rounded-xl bg-white/95'>
            <Link to='/Home'>
                <img className='h-10' src={Logo} alt='Logo'/>
            </Link>
            <ul className='flex items-center space-x-9'>
                {DoctorMenuItems.map((item, index) => (
                    <li key={index}>
                        <Link to={item.url} className='text-gray-700 font-medium text-sm py-3 items-center whitespace-nowrap transition-transform hover:text-custom-darkGreen'>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className='flex items-center space-x-4'>
                <p className='-mr-2 text-black'>{doctorName}</p>
                <div className='relative bg-gray-400 rounded-full w-10 h-10'></div>
            </div>
        </nav>
    </div>
  );
}

export default DoctorNavBar;
