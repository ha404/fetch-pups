import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';

const FavoritesButton: React.FC = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const localFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setFavoritesCount(localFavorites.length);
  }, []);

  return (
    <Button
      variant='contained'
      color='error'
      startIcon={<Favorite />}
      size='small'
      sx={{
        border: 0,
        fontWeight: 700,
      }}
    >
      Favorites ({favoritesCount})
    </Button>
  );
};

export default FavoritesButton;
