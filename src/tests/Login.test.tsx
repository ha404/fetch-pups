import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import APIService from '../services/api';

jest.mock('../services/api');

describe('Login', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mock function calls after each test
  });

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

  it('displays error message for invalid email format', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByRole('textbox', {
      name: /email address/i,
    }) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    const errorMessage = screen.getByText(/invalid email format/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    APIService.authenticate = jest.fn(); // Mock the authenticate function

    render(
      <Router>
        <Login />
      </Router>
    );

    const nameInput = screen.getByRole('textbox', {
      name: /name/i,
    }) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const emailInput = screen.getByRole('textbox', {
      name: /email address/i,
    }) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'john@doe.com' } });

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    expect(APIService.authenticate).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@doe.com',
    });
    // You can also add assertions to check if the navigation happens after successful authentication
  });
});
