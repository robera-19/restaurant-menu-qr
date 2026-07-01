import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScanQR from './pages/customer/ScanQR';
import CustomerMenu from './pages/customer/CustomerMenu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScanQR />} />
        <Route path="/menu/qr/:shortId" element={<CustomerMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
