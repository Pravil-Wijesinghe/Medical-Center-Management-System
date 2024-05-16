import Background from '../../Components/Background.jsx';
import PatientNavBar from '../../Components/PatientNavBar.jsx';

function Appointment() {

  return (
    <div className='relative text-white font-montserrat'>
      <Background/>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
        <PatientNavBar/>
      </div>
      <div className='flex items-center justify-center'>
        <div className='absolute top-[90px] bg-white text-black flex flex-col w-[68%] h-[80%] rounded-3xl mt-4 '>
          <div className='absolute bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-semibold text-white'>Appointment</h2>
          </div>
          <div className='relative flex flex-col items-center mt-[60px] pb-12 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
            <div className='mt-5'>
              <table className='table-auto'>
              <thead>
                <tr className='flex gap-24 text-lg bg-white shadow-xl py-2 px-28 rounded-lg'>
                  <th></th>
                  <th className='font-semibold'>Appointment Number</th>
                  <th className='font-semibold'>Date</th>
                  <th className='font-semibold'>Time</th>
                  <th className='font-semibold'>Doctor</th>
                </tr>
              </thead>
              <tbody>
                <tr className='flex gap-24 bg-white shadow-xl py-2 px-28 rounded-lg mt-5'>
                  <td>
                    <input type='checkbox'/>
                  </td>
                  <td>1</td>
                  <td>01/02/2024</td>
                  <td>12:20 P.M.</td>
                  <td>Dr. Priyantha</td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment
