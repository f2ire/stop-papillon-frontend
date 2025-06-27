
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Debug from './pages/Debug';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/debug" element={<Debug />} />
        {/* More route later */}
      </Routes>
    </Router>
  )
}

export default App
