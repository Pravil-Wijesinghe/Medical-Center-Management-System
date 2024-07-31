// Navigation bar for the website
import React from 'react'
import Logo from '../Images/Logo.png';
import {MenuItems} from '../Components/MenuItems'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';

function NavBar() {
    const navigate = useNavigate();
  return (
    <div className='flex pt-2.5 justify-center h-screen'>
        <nav style={{fontFamily: "Montserrat, sans-serif",}} className='flex  justify-between items-center p-8 shadow-xl w-8/12 h-16 rounded-xl bg-white/95'>
            <Link>
                <img className='h-10' src={Logo} alt='Logo'/>
            </Link>
            <ul className='flex items-center space-x-9'>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <Link className='text-gray-700 font-medium text-sm py-3 items-center whitespace-nowrap transition-transform hover:text-custom-darkGreen '>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
            </ul>
            <div className='flex items-center space-x-4'>
                <Button onClick={()=>navigate("/signup")} className='bg-custom-darkGreen rounded-md text-white py-1 px-2.5 hover:bg-custom-blackGreen'>Signup</Button>
                <Button onClick={()=>navigate("/login")} className='bg-custom-darkGreen rounded-md text-white py-1 px-2.5 hover:bg-custom-blackGreen'>Login</Button>  
            </div>
        </nav>
    </div>
  )
}

export default NavBar
