import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const navButtons = [
  { name: 'About', path: '/about' },
  { name: 'Search', path: '/search' },
  { name: 'Dog Care Tips', path: '/tips' },
];

const SecondaryNavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position='sticky' component='nav'>
      <Toolbar
        variant='dense'
        sx={{ justifyContent: 'space-evenly', bgcolor: 'whitesmoke' }}
      >
        {' '}
        {navButtons.map((button) => (
          <Button
            color='primary'
            onClick={() => navigate(button.path)}
            key={button.name}
            size='large'
            sx={{ pb: 0, fontWeight: 700 }}
          >
            {button.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default SecondaryNavBar;
