import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/*' element={<MainLayout />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default App;
