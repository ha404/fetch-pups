import React, { createContext, useState, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

type FavoritesContextProps = {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  showFavorite: boolean;
  setShowFavorite: React.Dispatch<React.SetStateAction<boolean>>;
};

const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  setFavorites: () => {},
  showFavorite: false,
  setShowFavorite: () => {},
});

type FavoritesProviderProps = {
  children: ReactNode;
};

const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [showFavorite, setShowFavorite] = useState<boolean>(false);

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, showFavorite, setShowFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesProvider, FavoritesContext };
