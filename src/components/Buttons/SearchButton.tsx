import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToSearch = async () => {
    navigate('/search');
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
