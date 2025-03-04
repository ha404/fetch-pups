import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/Navigation/NavBar';
import Search from './Search';
import Match from './Match';
import { FavoritesProvider } from '../context/FavoritesContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { ZipCodesProvider } from '../context/ZipCodesContext';
import About from './About';
import DogCareTips from './DogCareTips';

const theme = createTheme({
  palette: {
    background: {
      default: 'whitesmoke',
    },
  },
});

const MainLayout: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <FavoritesProvider>
        <ZipCodesProvider>
          <NavBar />
          <Container
            disableGutters
            maxWidth={false}
            sx={{
              bgcolor: theme.palette.background.default,
              minHeight: '100%',
            }}
          >
            <Routes>
              <Route path='/about' element={<About />} />
              <Route path='/search' element={<Search />} />
              <Route path='/match' element={<Match />} />
              <Route path='/tips' element={<DogCareTips />} />
            </Routes>
          </Container>
        </ZipCodesProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
