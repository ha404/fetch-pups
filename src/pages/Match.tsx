import React, { useEffect, useContext, useState } from 'react';
import APIService from '../services/api';
import { Dog } from '../services/api';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import DogCard from '../components/DogCard';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useLocation } from 'react-router-dom';
import MatchButton from '../components/Buttons/MatchButton';
import SearchButton from '../components/Buttons/SearchButton';
import FavoritesButton from '../components/Buttons/FavoriteButton';
import { FavoritesContext } from '../context/FavoritesContext';

const Match: React.FC = () => {
  const [dog, setDog] = useState<Dog | null>(null);
  const { width, height } = useWindowSize();
  const location = useLocation();

  const { favorites, showFavorite, setShowFavorite } =
    useContext(FavoritesContext);

  const fetchMatchDog = async () => {
    try {
      const response = await APIService.match(favorites);
      const matchedDogId = response.data.match;
      const dogResponse = await APIService.getDogs([matchedDogId]);
      const matchedDog = dogResponse.data[0];
      setDog(matchedDog);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleShowFavorite = () => {
    setShowFavorite((prev) => !prev);
  };

  useEffect(() => {
    fetchMatchDog();
  }, [location]);

  // If dog is null, display a loading spinner
  if (dog === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          paddingTop: 15,
          width: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Once dog is not null, display DogCard
  return (
    <>
      <Confetti width={width} height={height} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          paddingTop: 2,
          width: '100%',
        }}
      >
        {' '}
        <Typography
          variant='h2'
          color='primary'
          gutterBottom
          sx={{ pb: 5, fontWeight: 700 }}
        >
          THE PERFECT MATCH!
        </Typography>
        {dog && <DogCard dog={dog} />}
        <Grid container spacing={2} sx={{ pt: 4, justifyContent: 'center' }}>
          <Grid item>
            <FavoritesButton
              favoritesCount={favorites.length}
              showFavorite={showFavorite}
              toggleShowFavorite={toggleShowFavorite}
            />
          </Grid>
          <Grid item>
            <MatchButton />
          </Grid>
          <Grid item>
            <SearchButton />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Match;
