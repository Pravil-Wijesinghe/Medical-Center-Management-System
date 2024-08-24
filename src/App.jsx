import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
// import NavBar from './components/navBar';
import Doctor from './pages/Doctor';
import Appointments from './pages/Appointments';
import Staff from './pages/Staff';
import Patient from './pages/Patient';
import Reports from './pages/Reports';
import MiniDrawer from './components/MiniDrawer';

function App() {

  return (
    <div>
      <Router>
      <div>
        <MiniDrawer/>
      </div>
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path='/Doctor' element={<Doctor/>}/>
          <Route path='/Appontment' element={<Appointments/>}/>
          <Route path='/Staff' element={<Staff/>}/>
          <Route path='/Patient' element={<Patient/>}/>
          <Route path='/Reports' element={<Reports/>}/>    
          <Route path='/Drawer' element={<MiniDrawer/>}/>      
        </Routes>
      </Router>
    </div>
  )
}

export default App
