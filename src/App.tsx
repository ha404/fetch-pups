import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import Favorites from './components/Favorites/Favorites';
import Match from './components/Match/Match';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/match' element={<Match />} />
      </Routes>
    </Router>
  );
};

export default App;
