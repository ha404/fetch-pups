import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DogCard from '../components/ResultsSection/DogCard';
import { FavoritesContext } from '../context/FavoritesContext';
import { Dog } from '../services/api';

const dogMock: Dog = {
  id: '100',
  name: 'Test dog',
  breed: 'Breed',
  age: 2,
  img: 'test.jpg',
  zip_code: '12345',
};

describe('DogCard', () => {
  it('should render the correct dog information: name, breed, age, img, zip code', () => {
    const favorites = ['123', '232', '456']; // dogMock is initially not a favorite

    render(
      <FavoritesContext.Provider
        value={{
          favorites: favorites,
          setFavorites: () => {},
          showFavorite: false,
          setShowFavorite: () => {},
        }}
      >
        <DogCard dog={dogMock} />
      </FavoritesContext.Provider>
    );

    expect(screen.getByText(dogMock.name)).toBeInTheDocument();
    expect(screen.getByText(`Breed: ${dogMock.breed}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Age: ${dogMock.age} years old`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Location: ${dogMock.zip_code}`)
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', dogMock.img);
  });

  it('should remove the dog from favorites when the favorite button is clicked & the dog is already a favorite', () => {
    const favorites = ['100', '123', '232', '456']; // dogMock is initially a favorite
    const setFavorites = jest.fn((updateFunction) => {
      const newFavorites = updateFunction(favorites);
      return newFavorites;
    });
    const setShowFavorite = jest.fn();

    render(
      <FavoritesContext.Provider
        value={{
          favorites: favorites,
          setFavorites,
          showFavorite: false,
          setShowFavorite,
        }}
      >
        <DogCard dog={dogMock} />
      </FavoritesContext.Provider>
    );

    const favoriteButton = screen.getByLabelText('remove from favorites');
    fireEvent.click(favoriteButton);
    expect(setFavorites).toHaveBeenCalledWith(expect.any(Function));
    expect(setFavorites.mock.calls[0][0](favorites)).toEqual([
      '123',
      '232',
      '456',
    ]);
  });

  it('should add the dog to favorites when the favorite button is clicked & the dog is not a favorite', () => {
    const favorites = ['123', '232', '456']; // dogMock is initially not a favorite
    const setFavorites = jest.fn((updateFunction) => {
      const newFavorites = updateFunction(favorites);
      return newFavorites;
    });
    const setShowFavorite = jest.fn();

    render(
      <FavoritesContext.Provider
        value={{
          favorites: favorites,
          setFavorites,
          showFavorite: false,
          setShowFavorite,
        }}
      >
        <DogCard dog={dogMock} />
      </FavoritesContext.Provider>
    );

    const favoriteButton = screen.getByLabelText('add to favorites');
    fireEvent.click(favoriteButton);
    expect(setFavorites).toHaveBeenCalledWith(expect.any(Function));
    expect(setFavorites.mock.calls[0][0](favorites)).toEqual([
      '123',
      '232',
      '456',
      '100',
    ]);
  });

  it('should display the correct favorite icon based on favorite status', () => {
    const favorites = ['123', '232', '456']; // dogMock is initially not a favorite

    const { rerender } = render(
      <FavoritesContext.Provider
        value={{
          favorites: favorites,
          setFavorites: () => {},
          showFavorite: false,
          setShowFavorite: () => {},
        }}
      >
        <DogCard dog={dogMock} />
      </FavoritesContext.Provider>
    );

    expect(screen.getByLabelText('add to favorites')).toBeInTheDocument();

    rerender(
      <FavoritesContext.Provider
        value={{
          favorites: [...favorites, dogMock.id], // dogMock is now a favorite
          setFavorites: () => {},
          showFavorite: false,
          setShowFavorite: () => {},
        }}
      >
        <DogCard dog={dogMock} />
      </FavoritesContext.Provider>
    );

    expect(screen.getByLabelText('remove from favorites')).toBeInTheDocument();
  });
});
