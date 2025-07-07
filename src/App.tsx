
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import BuyCar from './pages/BuyCar';
import SellCar from './pages/SellCar';
import Contact from './pages/Contact';
import LoginPage from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/buy-car" element={<BuyCar />} />
        <Route path="/sell-car" element={<SellCar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
