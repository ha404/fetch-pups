import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DogCard from '../src/components/DogCard';
import { FavoritesContext } from '../src/context/FavoritesContext';
import { Dog } from '../src/services/api';

const mockDog: Dog = {
  id: '1',
  name: 'Test Dog',
  breed: 'Test Breed',
  age: 2,
  zip_code: '10001',
  img: 'test-dog.jpg',
};

interface FavoritesContextProps {
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  showFavorite: boolean;
  setShowFavorite: (showFavorite: boolean) => void;
}

describe('DogCard', () => {
  it('displays the dog name and breed', () => {
    render(<DogCard dog={mockDog} />);

    expect(screen.getByText('Test Dog')).toBeInTheDocument();
    expect(screen.getByText('Breed: Test Breed')).toBeInTheDocument();
  });

  it('handles favorite button clicks', () => {
    const mockSetFavorites = jest.fn();
    render(
      <FavoritesContext.Provider
        value={{
          favorites: [],
          setFavorites: mockSetFavorites,
          showFavorite: false,
          setShowFavorite: jest.fn(),
        }}
      >
        <DogCard dog={mockDog} />
      </FavoritesContext.Provider>
    );

    fireEvent.click(screen.getByLabelText('add to favorites'));
    expect(mockSetFavorites).toHaveBeenCalledWith(['1']);

    fireEvent.click(screen.getByLabelText('add to favorites'));
    expect(mockSetFavorites).toHaveBeenCalledWith([]);
  });
});
