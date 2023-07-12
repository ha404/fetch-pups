import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIService from '../services/api';

const Login = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Name: ${name}, Email: ${email}`);
    // Perform login action here
    try {
      await APIService.authenticate({ name, email });
      // Redirect the user to the search page
      navigate('/search');
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login Failed:', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Name:
        <input
          type='name'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type='submit'>Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
