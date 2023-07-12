import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';

const SearchButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setShowFavorite } = useContext(FavoritesContext);

  const handleBackToSearch = async () => {
    if (location.pathname === '/search') {
      setShowFavorite(false);
    } else {
      navigate('/search');
    }
  };

  return (
    <Button
      variant='contained'
      color='primary'
      size='small'
      onClick={handleBackToSearch}
    >
      Back to Search
    </Button>
  );
};

export default SearchButton;
