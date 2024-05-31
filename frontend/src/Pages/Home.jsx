import React, { useState, useEffect } from 'react';
import bgImage1 from '../Images/bgImage1.png';
import bgImage2 from '../Images/bgImage2.png';
import NavBar from '../Components/NavBar';
import MakeAnAppointment from '../Components/MakeAnAppontment';
import { Link } from 'react-router-dom';
import {ChevronDoubleRightIcon, PhoneIcon, MapPinIcon} from '@heroicons/react/24/outline';
import Logo from '../Images/Logo.png';

function Home() {
  const [hideNavBar, setHideNavBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const bgImage2Section = document.getElementById('bgImage2Section');
      if (bgImage2Section) {
        const bgImage2Position = bgImage2Section.offsetTop;
        setHideNavBar(scrollPosition > bgImage2Position);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif' }} className="relative bg-gradient-to-r from-custom-darkGreen to-custom-blackGreen w-full min-h-screen">
      {!hideNavBar && (
        <div className="fixed top-0 w-full z-50">
          <NavBar />
        </div>
      )}
      <div className="relative w-full h-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bgImage1})` }}>
        <div className="pl-[350px] pt-[200px] relative z-10">
          <h2 className="text-6xl font-light pb-1">Welcome to</h2>
          <h2 className="text-6xl font-semibold pb-5">Med Connect</h2>
          <p className="text-lg font-medium w-[420px] text-justify">
            Welcome to Med Connect! We are excited to introduce our state-of-the-art Medical Center Management System, designed to
            streamline your healthcare experience. Whether you are a patient seeking efficient appointment scheduling or a healthcare
            professional aiming to enhance your practice, our system is here to meet your needs.
          </p>
        </div>
      </div>
      <div id="bgImage2Section" className="relative w-full min-h-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bgImage2})` }}>
        <div className='absolute inset-0 bg-gradient-to-r from-custom-darkGreen to-custom-blackGreen opacity-80'></div>
        <div className='relative flex flex-col justify-center items-center pt-20 text-white'>
          <h1 className='font-semibold text-3xl'>Open</h1>
          <h3 className='text-lg font-medium'>Weekdays and Saturday</h3>
          <div className='font-semibold text-3xl mt-4'>
            <h1>7:00 AM - 9:00 AM</h1>
            <h1>4:00 PM - 9:00 PM</h1>
          </div>
        </div>
        <div className='relative flex justify-center items-center min-h-[700px]'>
          <MakeAnAppointment />
        </div>
        <div className='relative flex flex-col justify-center items-center px-52 pt-20 text-white'>
          <h1 className='font-semibold text-3xl'>About</h1>
          <p className='font-medium text-lg mt-8 text-justify'>
            Dr. P. P. Wijesekara Medical Center, located at 162B, Darlinton Watta, Hapugala, Galle, Sri Lanka, is your trusted partner for 
            comprehensive treatment services addressing everyday ailments. Our experienced team is committed to delivering personalized care 
            and fostering health, and vitality. Choose us for a dedicated approach to your medical needs, as we strive to impact 
            your journey to wellness positively.
          </p>
        </div>
        <footer className='mt-48'>
          <div className='relative w-full h-[330px] flex flex-row bg-custom-blackGreen rounded-t-3xl px-20 pt-10 pb-10 gap-28'>
            <div className='flex flex-col items-start text-white gap-6'>
              <div>
                <Link className='flex flex-row gap-4 text-white mb-3'>
                  <img className='h-8' src={Logo} alt='Logo'/>
                  <h1 className='font-semibold text-2xl'>Med Connect</h1>
                </Link>
              </div>
              <Link to={"/home"} className='flex flex-row gap-1 hover:text-custom-darkGreen'>
                <ChevronDoubleRightIcon  className='h-5 text-custom-lightGreen'/>Home
              </Link>
              <Link to={"/home"} className='flex flex-row gap-1 hover:text-custom-darkGreen'>
                <ChevronDoubleRightIcon  className='h-5 text-custom-lightGreen'/>Make an Appointment
              </Link>
              <Link to={"/home"} className='flex flex-row gap-1 hover:text-custom-darkGreen'>
                <ChevronDoubleRightIcon  className='h-5 text-custom-lightGreen'/>About
              </Link>
              <Link to={"/home"} className='flex flex-row gap-1 hover:text-custom-darkGreen'>
                <ChevronDoubleRightIcon  className='h-5 text-custom-lightGreen'/>Contact US
              </Link>
            </div>
            <div className='flex flex-col items-start text-white gap-6'>
              <h1 className='font-semibold text-2xl mb-3'>Contact Us</h1>
              <h3 className='flex flex-row gap-2'><PhoneIcon className='h-6 text-custom-lightGreen'/>071 33 26 622</h3>
              <h3 className='flex flex-row gap-2'><MapPinIcon className='h-6 text-custom-lightGreen'/>162B, Darlinton watta, Hapugala, Galle.</h3>
            </div>
            <div className='flex flex-col items-start text-white gap-4'>
              <h1 className='font-semibold text-2xl'>Location</h1>
              <div className='w-[550px] h-[200px] bg-white rounded-lg'>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15869.517307084683!2d80.19348984999999!3d6.07948105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1714ef3686d51%3A0xefa58ded723f591!2sHapugala!5e0!3m2!1sen!2slk!4v1717171057977!5m2!1sen!2slk" 
                  width="550" 
                  height="200" 
                  style={{ border: "0", borderRadius: "10px"}} 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Google Maps">
                </iframe>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
