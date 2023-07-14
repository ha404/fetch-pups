import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<MainLayout />} />
    </Routes>
  );
};

export default App;
