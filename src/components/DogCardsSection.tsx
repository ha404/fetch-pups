import React from 'react';
import { Dog } from '../services/api';
import { Grid } from '@mui/material';
import DogCard from '../components/DogCard';
import EmptyFavoritesAlert from '../components/EmptyFavoritesAlert';

interface DogCardsSectionProps {
  dogs: Dog[];
  showFavorite: boolean;
  favorites: string | string[];
}

const DogCardsSection: React.FC<DogCardsSectionProps> = ({
  dogs,
  showFavorite,
  favorites,
}) => {
  return (
    <Grid container spacing={3}>
      {favorites.length === 0 && showFavorite ? (
        <EmptyFavoritesAlert />
      ) : (
        dogs.map((dog: Dog) => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <DogCard dog={dog} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default DogCardsSection;
