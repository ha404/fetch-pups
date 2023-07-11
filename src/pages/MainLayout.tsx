import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Search from './Search/Search';
import Favorites from '../components/Favorites';
import Match from './Match/Match';

const MainLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/search' element={<Search />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/match' element={<Match />} />
      </Routes>
    </>
  );
};

export default MainLayout;
