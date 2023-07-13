import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

// Create a mock navigate function
const mockNavigate = jest.fn();

// Mock the whole react-router-dom module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the APIService.logout function
jest.mock('../services/api', () => ({
  logout: jest.fn().mockResolvedValue({}),
}));

describe('NavBar', () => {
  afterEach(() => {
    mockNavigate.mockClear();
  });

  it('should render the app title', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const titleElement = screen.getByText('FetchPups');
    expect(titleElement).toBeInTheDocument();
  });

  it('should navigate to search page when the FetchPups logo is clicked', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const titleElement = screen.getByText('FetchPups');
    fireEvent.click(titleElement);
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });

  it('should navigate to login page when Logout is clicked', async () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    // wait for any promises to be resolved
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });
});
