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
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
