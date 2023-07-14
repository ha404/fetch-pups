import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        sx={{ justifyContent: 'space-evenly', bgcolor: 'white' }}
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
