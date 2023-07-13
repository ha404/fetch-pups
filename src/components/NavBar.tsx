import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Pets } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import APIService from '../services/api';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await APIService.logout();
      navigate('/');
    } catch (err) {
      console.error('Logout Failed:', err);
    }
  };
  const handleLogoClick = async () => {
    navigate('/search');
  };

  return (
    <AppBar position='sticky' component='nav'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button
          variant='text'
          color='inherit'
          aria-label='Return to search'
          onClick={handleLogoClick}
          sx={{ textTransform: 'none' }}
        >
          <Pets color='inherit' sx={{ pr: 0 }} />
          <Typography
            component='span'
            variant='h5'
            flexGrow={1}
            sx={{ fontWeight: 700 }}
          >
            FetchPups
          </Typography>
        </Button>
        <Button
          variant='text'
          color='inherit'
          aria-label='Logout'
          onClick={handleLogout}
        >
          <LogoutIcon />
          <Typography
            component='span'
            variant='body1'
            flexGrow={1}
            sx={{ fontWeight: 500 }}
          >
            Logout
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
