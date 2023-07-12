import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('finds a button', () => {
  render(<App />);
  const signInButton = screen.getByRole('button');
  expect(signInButton).toBeInTheDocument();
});
