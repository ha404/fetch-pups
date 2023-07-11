import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Pets } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import APIService from '../../services/api';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await APIService.logout();
      navigate('/');
    } catch (err) {
      console.error('Login Failed:', err);
    }
  };

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Pets style={{ marginLeft: 5 }} />
        <Typography variant='h5' flexGrow={1} sx={{ fontWeight: 700 }}>
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
