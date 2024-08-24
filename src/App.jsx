import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
