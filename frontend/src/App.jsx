import { BrowserRouter, Routes, Route } from 'react-router-dom';
import sideBar from './components/sideBar';
import './App.css'

function App() {

  return (
    <div className="app-container">
    <BrowserRouter>
      <sideBar/>
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  )
}

export default App
