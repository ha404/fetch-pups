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

const defaultTheme = createTheme();

const Login = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error && <Typography color='error'>{error}</Typography>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
