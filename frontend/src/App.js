import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import PatientProfile from './Pages/Patient/Profile';
import PatientAppointment from './Pages/Patient/Appointment';
import PatientFamilyMembers from './Pages/Patient/FamilyMembers';
import PatientResetPassword from './Pages/Patient/ResetPassword';
import PatientLogout from './Pages/Patient/Logout';
import DoctorProfile from './Pages/Doctor/Profile';
import DoctorPatientInformation from './Pages/Doctor/PatientInformation';
import DoctorAvailability from './Pages/Doctor/Availability';
import ReceptionistProfile from './Pages/Receptionist/Profile';
import ReceptionistDashboard from './Pages/Receptionist/Dashboard';
import ReceptionistAddPatient from './Pages/Receptionist/AddAPatient';
import ReceptionistViewPatientst from './Pages/Receptionist/ViewPatients';
import ReceptionistAddDoctor from './Pages/Receptionist/AddADoctor';
import ReceptionistViewDoctors from './Pages/Receptionist/ViewDoctors';
import ReceptionistAddMedicine from './Pages/Receptionist/AddMedicine';
import ReceptionistViewMedicines from './Pages/Receptionist/ViewMedicines';
import ReceptionistMakeAppointment from './Pages/Receptionist/MakeAnAppointment';
import ReceptionistViewAppointments from './Pages/Receptionist/ViewAppointments';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Home' element={<Home/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/PatientProfile' element={<PatientProfile/>}></Route>
          <Route path='/PatientAppointment' element={<PatientAppointment/>}></Route>
          <Route path='/PatientFamilyMembers' element={<PatientFamilyMembers/>}></Route>
          <Route path='/PatientResetPassword' element={<PatientResetPassword/>}></Route>
          <Route path='/PatientLogout' element={<PatientLogout/>}></Route>
          <Route path='/DoctorProfile' element={<DoctorProfile/>}></Route>
          <Route path='/DoctorPatientInformation' element={<DoctorPatientInformation/>}></Route>
          <Route path='/DoctorAvailability' element={<DoctorAvailability/>}></Route>
          <Route path='/ReceptionistProfile' element={<ReceptionistProfile/>}></Route>
          <Route path='/ReceptionistDashboard' element={<ReceptionistDashboard/>}></Route>
          <Route path='/ReceptionistAddPatient' element={<ReceptionistAddPatient/>}></Route>
          <Route path='/ReceptionistViewPatientst' element={<ReceptionistViewPatientst/>}></Route>
          <Route path='/ReceptionistAddDoctor' element={<ReceptionistAddDoctor/>}></Route>
          <Route path='/ReceptionistViewDoctors' element={<ReceptionistViewDoctors/>}></Route>
          <Route path='/ReceptionistAddMedicine' element={<ReceptionistAddMedicine/>}></Route>
          <Route path='/ReceptionistViewMedicines' element={<ReceptionistViewMedicines/>}></Route>
          <Route path='/ReceptionistMakeAppointment' element={<ReceptionistMakeAppointment/>}></Route>
          <Route path='/ReceptionistViewAppointments' element={<ReceptionistViewAppointments/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
