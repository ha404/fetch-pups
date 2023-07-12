import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { FavoritesContext } from '../../context/FavoritesContext';

const ClearFavoritesButton: React.FC = () => {
  const { setFavorites } = useContext(FavoritesContext);

  const handleClearFavoritesClick = () => {
    setFavorites([]);
  };

  return (
    <IconButton
      aria-label='clear favorites'
      onClick={handleClearFavoritesClick}
      color='error'
    >
      <BackspaceIcon />
    </IconButton>
  );
};

export default ClearFavoritesButton;
