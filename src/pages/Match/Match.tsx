import React, { useEffect, useState } from 'react';
import APIService from '../../services/api';
import { Dog } from '../../services/api';
import { Box, CircularProgress, Typography, Button, Grid } from '@mui/material';
import DogCard from '../../components/DogCard';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
import CelebrationIcon from '@mui/icons-material/Celebration';

const Match: React.FC = () => {
  const [dog, setDog] = useState<Dog | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

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
  }, []);

  const handleBackToFavorites = () => {};

  const handleRegenerateMatch = async () => {
    await fetchMatchDog();
  };

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
              Favorites (0)
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              size='small'
              startIcon={<CelebrationIcon />}
              sx={{ fontWeight: 700 }}
              onClick={handleRegenerateMatch}
            >
              Match
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={handleBackToSearch}
            >
              Back to Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Match;
