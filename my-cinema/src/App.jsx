import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Головна сторінка
import Booking from './pages/Booking'; // Сторінка бронювання
import './App.css'; // Стилі

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
