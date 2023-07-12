import React, { useEffect, useState } from 'react';
import APIService from '../../services/api';
import { Dog } from '../../services/api';
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Grid,
  Tooltip,
} from '@mui/material';
import DogCard from '../../components/DogCard';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate, useLocation } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
import MatchButton from '../../components/Buttons/MatchButton';
import SearchButton from '../../components/Buttons/SearchButton';

const Match: React.FC = () => {
  const [dog, setDog] = useState<Dog | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchMatchDog = async () => {
    const localFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setFavorites(localFavorites);

    try {
      const response = await APIService.match(localFavorites);
      const matchedDogId = response.data.match;
      const dogResponse = await APIService.getDogs([matchedDogId]);
      const matchedDog = dogResponse.data[0];
      setDog(matchedDog);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMatchDog();
  }, [location]);

  const handleBackToSearch = () => {
    navigate('/search');
  };

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
              Favorites ({favorites.length})
            </Button>
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
