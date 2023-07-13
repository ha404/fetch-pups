import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIService from '../services/api';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Pets } from '@mui/icons-material';
import useLocalStorage from '../hooks/useLocalStorage';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';

const defaultTheme = createTheme();

const Login = () => {
  const [name, setName] = useLocalStorage('name', '');
  const [email, setEmail] = useLocalStorage('email', '');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width:600px)');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isValidEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Invalid email format. Please try again.');
      return;
    }
    try {
      await APIService.authenticate({ name, email });
      navigate('/search');
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login Failed:', err);
    }
  };

  const LoginForm = (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: defaultTheme.shadows[10],
        maxWidth: 370,
        minHeight: 450,
        p: 2,
        m: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h6'>
            Sign in to
          </Typography>

          <Typography
            component='span'
            variant='h5'
            color='primary'
            sx={{ fontWeight: 700 }}
          >
            <Pets />
            FetchPups
          </Typography>
        </Box>
        <Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoComplete='name'
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            value={email}
            error={!isValidEmail(email) && email !== ''}
            helperText={
              !isValidEmail(email) && email !== ''
                ? 'Invalid email format.'
                : ''
            }
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 6, mb: 2 }}
            role='button'
          >
            Sign In
          </Button>
          {error && <Typography color='error'>{error}</Typography>}
        </Box>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container
        component='main'
        maxWidth='xl'
        sx={{
          backgroundImage: `url(${require('../assets/bg1.jpeg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: matches ? 'center' : 'flex-start',
          paddingLeft: matches ? '0' : '2rem',
          paddingRight: matches ? '0' : '2rem',
        }}
      >
        {matches ? (
          <>
            <Button variant='contained' onClick={handleOpen}>
              Sign In
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {LoginForm}
            </Modal>
          </>
        ) : (
          <Box sx={{ paddingLeft: '15%' }}>{LoginForm}</Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Login;
