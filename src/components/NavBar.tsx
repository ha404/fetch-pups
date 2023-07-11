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
    navigate('/Search');
  };

  return (
    <AppBar position='relative' component='nav'>
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          onClick={handleLogoClick}
          aria-label='Return to search'
          sx={{ pr: 0 }}
        >
          <Pets style={{ marginLeft: 5 }} />
        </IconButton>
        <Typography
          component='span'
          onClick={handleLogoClick}
          variant='h5'
          flexGrow={1}
          sx={{ fontWeight: 700 }}
        >
          FetchPups
        </Typography>
        <Button color='inherit' onClick={handleLogout}>
          <LogoutIcon />
          <Typography variant='body1' flexGrow={1} sx={{ fontWeight: 500 }}>
            Logout
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
