import React from 'react'
import Logo from '../Images/Logo.png';
import {MenuItems} from '../Components/MenuItems'
import { Link } from 'react-router-dom';
import { Button } from './Button';

function NavBar() {
  return (
    <nav style={{fontFamily: "Montserrat, sans-serif",}} className='flex space-x-0.5 items-center p-8 shadow-xl w-11/12 h-20 rounded-3xl bg-white'>
        <Link>
            <img className='h-12' src={Logo} alt='Logo'/>
        </Link>
        <ul className='grid grid-cols-4 grid-flow-col gap-5 items-center'>
            {MenuItems.map((item, index) => {
                return(
                    <li>
                        <Link className='text-gray-700 font-medium py-3 px-4 whitespace-nowrap transition-transform hover:text-custom-darkGreen scale-125 '>
                            {item.title}
                        </Link>
                    </li>
                )
            })}
            <Button className='bg-custom-darkGreen rounded-md text-white py-1 px-2.5'>Signup</Button>
            <Button className='bg-custom-darkGreen rounded-md text-white py-1 px-2.5'>Login</Button>  
        </ul>
    </nav>
  )
}

export default NavBar
