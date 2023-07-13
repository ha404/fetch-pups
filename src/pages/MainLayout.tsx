import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Search from './Search';
import Favorites from '../components/Favorites';
import Match from './Match';
import { FavoritesProvider } from '../context/FavoritesContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

const theme = createTheme({
  palette: {
    background: {
      default: 'whitesmoke', // replace '#yourColor' with your preferred color
    },
  },
});

const MainLayout: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <FavoritesProvider>
        <NavBar />
        <Container
          disableGutters
          maxWidth={false}
          sx={{ bgcolor: theme.palette.background.default, minHeight: '100%' }}
        >
          <Routes>
            <Route path='/search' element={<Search />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/match' element={<Match />} />
          </Routes>
        </Container>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
