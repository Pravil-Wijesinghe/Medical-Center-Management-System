import React, { useEffect, useState } from 'react';
import Logo from '../Images/Logo.png';
import { PatientMenuItems } from './PatientMenuItems';
import { Link } from 'react-router-dom';

function PatientNavBar() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <div className='flex pt-2.5 justify-center h-screen'>
            <nav style={{ fontFamily: 'Montserrat, sans-serif' }} className='flex justify-between items-center p-8 shadow-xl w-[75%] h-16 rounded-xl bg-white/95'>
                <Link to='/Home'>
                    <img className='h-10' src={Logo} alt='Logo' />
                </Link>
                <ul className='flex items-center space-x-9'>
                    {PatientMenuItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.url}
                                className='text-gray-700 font-medium text-sm py-3 items-center whitespace-nowrap transition-transform hover:text-custom-darkGreen'
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='flex items-center space-x-4'>
                    <p className='-mr-2 text-black'>{user.First_Name} {user.Last_Name}</p>
                    <div className='relative bg-gray-400 rounded-full w-10 h-10'>
                        {user.Profile_Picture ? (
                            <img src={`http://localhost:3000/uploads/${user.Profile_Picture}`} alt='Profile' className='w-10 h-10 rounded-full' />
                        ) : (
                            <div className='w-10 h-10 rounded-full bg-gray-400'></div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default PatientNavBar;
