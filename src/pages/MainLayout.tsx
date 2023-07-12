import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Search from './Search';
import Favorites from '../components/Favorites';
import Match from './Match';
import { FavoritesProvider } from '../context/FavoritesContext';

const MainLayout: React.FC = () => {
  return (
    <>
      <FavoritesProvider>
        <NavBar />
        <Routes>
          <Route path='/search' element={<Search />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/match' element={<Match />} />
        </Routes>
      </FavoritesProvider>
    </>
  );
};

export default MainLayout;
