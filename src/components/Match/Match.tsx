import React from 'react';
import DogCard from '../DogCard/DogCard';
import { Dog } from '../../services/api';
import { Box } from '@mui/material';

interface MatchProps {
  dog: Dog;
  onFavoriteClick: (id: string) => void;
  favorites: string[];
  setShowMatch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Match: React.FC<MatchProps> = ({
  dog,
  onFavoriteClick,
  favorites,
  setShowMatch,
}) => {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        paddingTop: 15,
        width: '100%',
      }}
    >
      <DogCard
        dog={dog}
        onFavoriteClick={onFavoriteClick}
        favorites={favorites}
      />
    </Box>
  );
};

export default Match;
