import { useRef, useState, useEffect } from 'react';
import Background from '../../Components/Background.jsx';
import PatientNavBar from '../../Components/PatientNavBar.jsx';
import AddUserIcon from '../../Images/user.png';
import { Button } from '../../Components/Button.jsx';

function Profile() {
    //file input element
    const inputref = useRef(null);
    // State for storing the selected image
    const [image, setImage] = useState(null);
    // State for storing user data
    const [user, setUser] = useState({});
    // State for storing original user data
    const [originalUser, setOriginalUser] = useState({});

    useEffect(() => {
        // Fetch user data from localStorage on component mount
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setOriginalUser(storedUser);
        }
    }, []);

    // Function to handle input field changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Function to trigger file input click
    const handleImageClick = () => {
        inputref.current.click();
    };

    // Function to handle image file selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    // Function to handle saving of updated profile data
    const handleSave = async () => {
        try {
            console.log('Sending update request:', user);

            // Update profile data
            const response = await fetch('http://localhost:3000/patient/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const responseText = await response.text();
            console.log('Response text:', responseText);

            if (!response.ok) {
                let errorMessage = 'Unknown error occurred';
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.message || errorMessage;
                } catch (err) {
                    console.error('Error parsing JSON response:', err);
                }
                throw new Error(errorMessage);
            }

            const responseData = JSON.parse(responseText);
            console.log('Update response:', responseData);

             // Update profile picture if a new one is selected
            if (image) {
                const formData = new FormData();
                formData.append('profilePicture', image);
                formData.append('nic', user.NIC);

                const uploadResponse = await fetch('http://localhost:3000/patient/upload', {
                    method: 'POST',
                    body: formData,
                });

                const uploadResponseText = await uploadResponse.text();
                console.log('Upload response text:', uploadResponseText);

                if (!uploadResponse.ok) {
                    let uploadErrorMessage = 'Unknown error occurred';
                    try {
                        const uploadErrorData = JSON.parse(uploadResponseText);
                        uploadErrorMessage = uploadErrorData.message || uploadErrorMessage;
                    } catch (err) {
                        console.error('Error parsing JSON response:', err);
                    }
                    throw new Error(uploadErrorMessage);
                }

                const uploadData = JSON.parse(uploadResponseText);
                console.log('Upload response:', uploadData);

                // Update user state with new profile picture URL
                setUser((prevUser) => ({
                    ...prevUser,
                    Profile_Picture: uploadData.profilePicture,
                }));
            }

            // Save updated user data to localStorage
            localStorage.setItem('user', JSON.stringify(user));
            alert('Profile updated successfully');
            setOriginalUser(user);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(`Error updating profile: ${error.message}`);
        }
    };

    // Function to cancel changes and reset to original user data
    const handleCancel = () => {
        setUser(originalUser);
        setImage(null);
    };

    return (
        <div className='relative text-white font-montserrat'>
            <Background />
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
                <PatientNavBar />
            </div>
            <div className='flex items-center justify-center'>
                <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4 '>
                    <div className='absolute bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
                        <h2 className='text-2xl font-semibold text-white'>Profile</h2>
                    </div>
                    <div className='relative mt-[60px] pb-12 px-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
                        <div className='flex flex-row items-center gap-6 p-8 ml-3'>
                            <div onClick={handleImageClick} className='flex items-center justify-center border-0 w-20 h-20 overflow-hidden border-black rounded-full'>
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt='Upload_Image' className='text-black w-20' />
                                ) : (
                                    <img src={user.Profile_Picture ? `http://localhost:3000/uploads/${user.Profile_Picture}` : AddUserIcon} alt='Upload_Image' className='text-black w-20' />
                                )}
                                <input type='file' className='hidden' onChange={handleImageChange} ref={inputref} />
                            </div>
                            <div className='font-medium text-lg'>
                                {user.First_Name} {user.Last_Name}
                            </div>
                        </div>
                        <div className='flex flex-row items-center w-full px-8 gap-4'>
                            <div className='w-1/2'>
                                <h2 className='text-base font-semibold mb-0.5 ml-2'>First Name</h2>
                                <input
                                    type='text'
                                    className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                    name='First_Name'
                                    value={user.First_Name || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='w-1/2'>
                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Address</h2>
                                <input
                                    type='text'
                                    className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                    name='Address'
                                    value={user.Address || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-center w-full px-8 gap-4 mt-4'>
                            <div className='w-1/2'>
                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Last Name</h2>
                                <input
                                    type='text'
                                    className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                    name='Last_Name'
                                    value={user.Last_Name || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col w-1/2'>
                                <div className='flex gap-5'>
                                    <div className='flex flex-col w-1/2'>
                                        <h2 className='text-base font-semibold mb-0.5 ml-2'>Date of Birth</h2>
                                        <input
                                            type='date'
                                            className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                            name='DOB'
                                            value={user.DOB ? user.DOB.split('T')[0] : ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='flex flex-col w-1/2'>
                                        <h2 className='text-base font-semibold mb-0.5 ml-[10px]'>Gender</h2>
                                        <select
                                            id='gender'
                                            className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                            name='Gender'
                                            value={user.Gender || ''}
                                            onChange={handleInputChange}
                                        >
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
                                <input
                                    type='text'
                                    className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                    name='NIC'
                                    value={user.NIC || ''}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>
                            <div className='w-1/2'>
                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Weight</h2>
                                <input
                                    type='text'
                                    className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                    name='Weight'
                                    value={user.Weight || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-center w-full px-8 gap-4 mt-4'>
                            <div className='w-1/2'>
                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Mobile Number</h2>
                                <input
                                    type='text'
                                    className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                    name='Mobile_Number'
                                    value={user.Mobile_Number || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='w-1/2'>
                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Height</h2>
                                <input
                                    type='text'
                                    className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                    name='Height'
                                    value={user.Height || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-center w-full px-8 gap-4 mt-4'>
                            <div className='w-1/2'>
                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Email</h2>
                                <input
                                    type='text'
                                    className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                    name='Email'
                                    value={user.Email || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='w-1/2'>
                                <h2 className='text-base font-semibold mb-0.5 ml-2'>Blood Group</h2>
                                <input
                                    type='text'
                                    className='rounded-md border-2 h-9 w-full p-2 outline-none'
                                    name='Blood_Group'
                                    value={user.Blood_Group || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-center w-full px-8 gap-4 mt-8'>
                            <div className='w-1/2'>
                                <Button onClick={handleCancel} className="outline outline-2 outline-offset-0 outline-custom-darkGreen hover:outline-custom-red text-black text-base font-medium px-4 py-2 rounded-md w-full">Cancel</Button>
                            </div>
                            <div className='w-1/2'>
                                <Button onClick={handleSave} className="bg-custom-darkGreen text-white text-base font-medium px-4 py-2 rounded-md w-full hover:bg-custom-blackGreen">Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
