import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';
import CustomerMenu from './pages/customer/CustomerMenu';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MenuProvider>
          <Router>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<CustomerMenu />} />
              <Route path="/menu" element={<CustomerMenu />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </MenuProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
