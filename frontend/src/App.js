import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import PatientProfile from './Pages/Patient/Profile';
import PatientAppointment from './Pages/Patient/Appointment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/Home' element={<Home/>}></Route>
          <Route path='/PatientProfile' element={<PatientProfile/>}></Route>
          <Route path='/PatientAppointment' element={<PatientAppointment/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
