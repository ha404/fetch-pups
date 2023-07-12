import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Login', () => {
  it('renders login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /email address/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    }) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    const emailInput = screen.getByRole('textbox', {
      name: /email address/i,
    }) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'john@doe.com' } });
    expect(emailInput.value).toBe('john@doe.com');
  });
});
