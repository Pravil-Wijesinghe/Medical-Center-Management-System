import React,{useState} from 'react'
import ReceptionistNavBar from '../../Components/ReceptionistNavBar';
import { generateDate, months } from '../../Components/calender';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import cn from '../../Components/cn';
import dayjs from 'dayjs';
import { Button } from '../../Components/Button';


function MakeAnAppointment() {

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);


  return (
    <div className='text-white font-montserrat'>
      <div className='bg-custom-blackGreen w-full h-screen'>
        <div className='fixed top-1 left-1/2 transform -translate-x-1/2 w-full'>
            <ReceptionistNavBar/>
        </div>
        <div className='flex flex-col gap-10 w-full h-screen overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-custom-blackGreen scrollbar-track-transparent'>
            <div className='flex justify-center mt-24 w-full h-fit font-bold text-4xl'>
                Make an Appointment
            </div>
            <div className='flex flex-col justify-center px-60 gap-6'>
                <div className='flex flex-row justify-start w-full gap-6'>
                    <div className='flex flex-col gap-6 w-1/2'>
                        <div>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Patient's NIC Number</h2>
                            <input
                                type='text'
                                className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-10 w-full p-2 outline-none'
                            />
                        </div>
                        <div>
                            <div className='w-full'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='select-none font-semibold'>
                                    {months[today.month()]}, {today.year()}
                                    </h1>
                                    <div className='flex gap-10 items-center '>
                                    <ArrowLeftIcon
                                        className='w-5 h-5 cursor-pointer hover:scale-105 transition-all'
                                        onClick={() => {
                                        setToday(today.month(today.month() - 1));
                                        }}
                                    />
                                    <h1
                                        className=' cursor-pointer hover:scale-105 transition-all'
                                        onClick={() => {
                                        setToday(currentDate);
                                        }}
                                    >
                                        Today
                                    </h1>
                                    <ArrowRightIcon
                                        className='w-5 h-5 cursor-pointer hover:scale-105 transition-all'
                                        onClick={() => {
                                        setToday(today.month(today.month() + 1));
                                        }}
                                    />
                                    </div>
                                </div>
                                <div className='grid grid-cols-7 '>
                                    {days.map((day, index) => {
                                    return (
                                        <h1
                                        key={index}
                                        className='text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none'
                                        >
                                        {day}
                                        </h1>
                                    );
                                    })}
                                </div>
                                <div className=' grid grid-cols-7 '>
                                    {generateDate(today.month(), today.year()).map(
                                    ({ date, currentMonth, today }, index) => {
                                        return (
                                        <div
                                            key={index}
                                            className='p-2 text-center h-14 grid place-content-center text-sm border-t'
                                        >
                                            <h1
                                            className={cn(
                                                currentMonth ? '' : 'text-gray-400',
                                                today ? 'bg-red-600 text-white' : '',
                                                selectDate.toDate().toDateString() ===
                                                date.toDate().toDateString()
                                                ? 'bg-black text-white'
                                                : '',
                                                'h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none'
                                            )}
                                            onClick={() => {
                                                setSelectDate(date);
                                            }}
                                            >
                                            {date.date()}
                                            </h1>
                                        </div>
                                        );
                                    }
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='h-96 w-96'>
                            <h1 className=' font-semibold'>
                                You selected {selectDate.toDate().toDateString()}
                            </h1>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2 gap-6'>
                        <div>
                            <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Select your doctor</h2>
                            <select
                                id='doctor'
                                className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-9 w-full p-2 outline-none'
                            >
                            <option value=''>Select a doctor</option>
                            <option value='Dr. P. P. Wijesekara'>Dr. P. P. Wijesekara</option>
                            <option value='Dr. Sudesh Gunawardhana'>Dr. Sudesh Gunawardhana</option>
                            </select>
                        </div>
                        <div>
                            <h2 className='text-base font-semibold mb-0.5 ml-2'>Disease/Report</h2>
                            <textarea className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-56 w-full p-2 outline-none'/>
                        </div>
                        <div className='flex flex-row gap-5 ml-[10px]'>
                            <h2 className='text-base font-semibold mb-0.5'>Select your time :</h2>
                            <div className='flex gap-1'>
                                <input
                                    type='radio'
                                    name='time'
                                />
                                <label htmlFor='morning'>Morning</label>
                            </div>
                            <div className='flex gap-1'>
                                <input
                                    type='radio'
                                    name='time'
                                />
                                <label htmlFor='evening'>Evening</label>
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 ml-[10px]'>
                            <input
                            type='checkbox'
                            name='forFamilyMembers'
                            id='forFamilyMembers'
                            />
                            <h2 className='text-base font-semibold mb-0.5'>For Family Members</h2>
                        </div>
                        <div>
                            <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Relationship</h2>
                            <select
                            id='relationship'
                            className='rounded-md border-2 border-custom-darkGreen bg-custom-black h-9 w-full p-2 outline-none'
                            >
                            <option value=''>Select relationship</option>
                            <option value='Mother'>Mother</option>
                            <option value='Father'>Father</option>
                            <option value='Wife'>Wife</option>
                            <option value='Son'>Son</option>
                            <option value='Daughter'>Daughter</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='flex gap-6 -mt-80'>
                    <div className='w-1/2'>
                        <Button className='outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-base font-medium px-4 py-2 rounded-md w-full'>
                            Cancel
                        </Button>
                    </div>
                    <div className='w-1/2'>
                        <Button
                            className='bg-custom-darkGreen outline-custom-darkGreen outline outline-2 hover:outline-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen'>
                            Make an Appointment
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MakeAnAppointment
