import {useRef, useState} from 'react'
import Background from '../../Components/Background.jsx';
import PatientNavBar from '../../Components/PatientNavBar.jsx';
import AddUserIcon from '../../Images/user.png';
import { Button } from '../../Components/Button.jsx';

function Profile() {

  const inputref = useRef(null);
  const [image, setImage] = useState(null);


  const handleImageClick = () => {
    inputref.current.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  }

  return (
    <div className='relative text-white font-montserrat'>
      <Background/>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <PatientNavBar/>
      </div>
      <div className='flex items-center justify-center'>
        <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4 '>
          <div className='absolute bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-semibold text-white'>Profile</h2>
          </div>
          <div className='relative mt-[60px] pb-12 px-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
            <div className='flex flex-row items-center gap-6 p-8 ml-3'>
              <div onClick={handleImageClick} className='flex items-center justify-center border-0 w-20 h-20 overflow-hidden border-black rounded-full'>
                {image ?
                  <img src={URL.createObjectURL(image)} alt='Upload_Image' className='text-black w-20'/>
                :
                  <img src={AddUserIcon} alt='Upload_Image' className='text-black w-20'/>
                }
                <input type='file' className='hidden' onChange={handleImageChange} ref={inputref}/>
              </div>
              <div className='font-medium text-lg'>
                User's Name
              </div>
            </div>
            <div className='flex flex-row items-center w-full px-8 gap-4'>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>First Name</h2>
                <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your first name'/>
              </div>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Address</h2>
                <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your address'/>
              </div>
            </div>
            <div className='flex flex-row items-center w-full px-8 gap-4 mt-4'>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Last Name</h2>
                <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your first name'/>
              </div>
              <div className='flex flex-col w-1/2'>
                <div className='flex gap-5'>
                    <div className='flex flex-col w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Date of Birth</h2>
                        <input type='date' className='rounded-md border-2 h-9 w-full p-2 outline-none'/>
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Gender</h2>
                        <select id='gender' className='rounded-md border-2 h-9 w-full p-2 outline-none'>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                </div>
              </div>
            </div>
            <div className='flex flex-row items-center w-full px-8 gap-4 mt-4'>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>NIC Number</h2>
                <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your NIC number'/>
              </div>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Weight</h2>
                <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your weight'/>
              </div>
            </div>
            <div className='flex flex-row items-center w-full px-8 gap-4 mt-4'>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Mobile Number</h2>
                <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your mobile number'/>
              </div>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Height</h2>
                <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your height'/>
              </div>
            </div>
            <div className='flex flex-row items-center w-full px-8 gap-4 mt-4'>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Email</h2>
                <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your email'/>
              </div>
              <div className='w-1/2'>
                <h2 className='text-base font-semibold mb-0.5 ml-2'>Blood Group</h2>
                <input type='text' className='rounded-md border-2 h-9 w-full p-2 outline-none' placeholder='Enter your blood group'/>
              </div>
            </div>
            <div className='flex flex-row items-center w-full px-8 gap-4 mt-8'>
              <div className='w-1/2'>
                <Button className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
              </div>
              <div className='w-1/2'>
                <Button className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
