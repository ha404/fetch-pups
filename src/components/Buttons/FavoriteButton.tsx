import React from 'react';
import { Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface FavoriteButtonProps {
  favoritesCount: number;
  showFavorite: boolean;
  toggleShowFavorite: () => void;
}

const FavoritesButton: React.FC<FavoriteButtonProps> = ({
  favoritesCount,
  showFavorite,
  toggleShowFavorite,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleFavoriteButtonClick = () => {
    if (location.pathname === '/match') {
      navigate('/search');
      toggleShowFavorite();
    }
    toggleShowFavorite();
  };

  return (
    <Button
      variant={showFavorite ? 'outlined' : 'contained'}
      color='error'
      startIcon={<Favorite />}
      size='small'
      onClick={handleFavoriteButtonClick}
      sx={{
        fontWeight: 700,
      }}
    >
      Favorites ({favoritesCount})
    </Button>
  );
};

export default FavoritesButton;
