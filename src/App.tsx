import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Verify } from './pages/Verify';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/98" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;