import React, { useEffect, useState } from 'react';
import Logo from '../Images/Logo.png';
import { Link } from 'react-router-dom';
import { ReceptionistMenuItems } from './ReceptionistMenuItems';

function ReceptionistNavBar() {
  const [dropdown, setDropdown] = useState(null);
  const [receptionist, setReceptionist] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setReceptionist(userData);
    }
  }, []);

  return (
    <div className='flex pt-2.5 justify-center'>
      <nav style={{ fontFamily: "Montserrat, sans-serif", }} className='flex justify-between items-center p-8 shadow-xl w-[75%] h-16 rounded-xl bg-custom-black/95'>
        <Link to='/Home'>
          <img className='h-10' src={Logo} alt='Logo' />
        </Link>
        <ul className='flex items-center space-x-9'>
          {ReceptionistMenuItems.map((item, index) => (
            <li key={index} 
                onMouseEnter={() => setDropdown(index)} 
                onMouseLeave={() => setDropdown(null)}
                className='relative'>
              <Link to={item.url} className='text-white font-medium text-sm py-3 items-center whitespace-nowrap transition-transform hover:text-custom-darkGreen '>
                {item.title}
              </Link>
              {item.subMenu && dropdown === index && (
                <ul className='absolute top-full left-0 mt-2 w-48 bg-custom-black shadow-lg rounded-lg py-2'>
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex} className='px-4 py-2 hover:bg-custom-black'>
                      <Link to={subItem.url} className='block text-white hover:text-custom-darkGreen'>
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div>
          <Link className='flex items-center space-x-4' to='/ReceptionistProfile'>
            <p className='-mr-2 text-white'>{receptionist.First_Name} {receptionist.Last_Name}</p>
            <div className='relative bg-gray-400 rounded-full w-10 h-10'></div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default ReceptionistNavBar;
