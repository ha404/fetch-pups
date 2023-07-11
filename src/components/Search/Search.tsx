import React, { useEffect, useState } from 'react';
import DogCard from '../DogCard/DogCard';
import APIService from '../../services/api';
import { Dog } from '../../services/api';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {
  AppBar,
  Box,
  Pagination,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  ArrowDownward,
  ArrowUpward,
  Favorite,
  Pets,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import TuneIcon from '@mui/icons-material/Tune';
import Slider from '@mui/material/Slider';
import ComboBox from './ComboBox';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { itemCount, valuetext } from '../../utils/utils';

const Search: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [asc, setAsc] = useState<boolean>(true);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [showComboBox, setShowComboBox] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [ageRange, setAgeRange] = useState<number | number[]>([0, 25]);
  const [ageMin, ageMax] = ageRange as [number, number];
  const [showFavorite, setShowFavorite] = useState<boolean>(false);

  useEffect(() => {
    fetchDogs();
  }, [page, asc, selectedBreeds, ageRange, showFavorite]);

  const fetchDogs = async () => {
    try {
      let dogIds: string[] = [];
      if (showFavorite) {
        dogIds = favorites;
      } else {
        // Retrieve Dog Ids
        const responseIds = await APIService.getDogsIds({
          size: 9,
          sort: `breed:${asc ? 'asc' : 'desc'}`,
          from: itemCount(page),
          breeds: selectedBreeds ? selectedBreeds : null,
          ageMin: ageMin,
          ageMax: ageMax,
        });
        setTotalResults(responseIds.data.total);
        dogIds = responseIds.data.resultIds;
      }

      // Retrive Dogs Objects
      const response = await APIService.getDogs(dogIds);
      setDogs(response.data);
    } catch (err) {
      setError('An error occurred while fetching dogs.');
      console.error(err);
    }
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await APIService.logout(); // call the logout method from API service
      // Redirect the user to the search page
      navigate('/');
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login Failed:', err);
    }
  };

  const handleSort = () => {
    setAsc((prevAsc) => !prevAsc);
  };

  const handleFilterToggle = () => {
    setShowComboBox((prevShowComboBox) => !prevShowComboBox);
  };

  const handleAgeRangeSlider = (event: any, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  const handleFavoriteClick = (id: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((dogId) => dogId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
    console.log(favorites);
  };

  const toggleShowFavorites = () => {
    setShowFavorite((prev) => !prev);
  };

  const favoritesCount = favorites.length;

  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          <Pets style={{ marginLeft: 5 }} />
          <Typography variant='h6' flexGrow={1}>
            FetchPups
          </Typography>
          <Button color='inherit' onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth='md' sx={{ py: 1 }}>
            <Typography
              variant='h4'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              Let's find a match!
            </Typography>
            <Typography
              variant='body1'
              align='center'
              color='textSecondary'
              paragraph
            >
              Here at FetchPups, we love our furry friends, and hope you do too!
              Our mission is to help a dog-lover like yourself find a sheltered
              dog to join your family. Pick a few of your favorite dogs and we
              will find you a match!
            </Typography>
            <Grid container spacing={0} columns={16}>
              <Grid item xs={8}>
                <Button
                  variant={showComboBox ? 'contained' : 'outlined'}
                  color='primary'
                  startIcon={<TuneIcon />}
                  fullWidth
                  onClick={handleFilterToggle}
                >
                  FILTER
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button
                  variant='outlined'
                  color='primary'
                  startIcon={asc ? <ArrowUpward /> : <ArrowDownward />}
                  fullWidth
                  onClick={handleSort}
                >
                  SORT BY BREED
                </Button>
              </Grid>
            </Grid>
            {showComboBox && (
              <Container
                maxWidth='md'
                sx={{ my: 3, py: 1, border: 1, borderRadius: 0.2 }}
              >
                {' '}
                <Typography id='track-slider' variant='h6' gutterBottom>
                  Filter by
                </Typography>
                <Grid container spacing={3} columns={16}>
                  <Grid item xs={8}>
                    <Typography id='track-breeds' gutterBottom>
                      Select Dog Breed(s)
                    </Typography>
                    <ComboBox
                      selectedBreeds={selectedBreeds}
                      setSelectedBreeds={setSelectedBreeds}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography id='track-slider' gutterBottom>
                      Select Age Range: {ageMin} - {ageMax} years old
                    </Typography>
                    <Slider
                      getAriaLabel={() => 'Dog Age Range'}
                      value={ageRange}
                      valueLabelDisplay='auto'
                      onChange={handleAgeRangeSlider}
                      getAriaValueText={valuetext}
                      max={25}
                    />
                  </Grid>
                </Grid>
              </Container>
            )}
          </Container>
        </Box>
        {/* End Hero */}

        <Container maxWidth='md'>
          <Grid
            container
            spacing={1}
            justifyContent='space-between'
            sx={{ p: 1, mb: 1, bgcolor: '#F2F3F5', borderRadius: 1 }}
          >
            <Grid item xs={4}>
              <Button
                variant={showFavorite ? 'contained' : 'outlined'}
                color='error'
                startIcon={<Favorite />}
                onClick={toggleShowFavorites}
              >
                Favorites ({favoritesCount})
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                variant='outlined'
                color='secondary'
                startIcon={<CelebrationIcon />}
              >
                Match from favorites!
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant='subtitle1'
                align='center'
                sx={{ pt: 1, pb: 0 }}
                color='primary'
              >
                <b>{totalResults}</b> Results
              </Typography>
            </Grid>
          </Grid>
          {error && <p>{error}</p>}
          <Grid container spacing={3}>
            {dogs &&
              dogs.map((dog: Dog) => (
                <Grid item xs={12} sm={6} md={4} key={dog.id}>
                  <DogCard
                    dog={dog}
                    onFavoriteClick={handleFavoriteClick}
                    favorites={favorites}
                  />
                </Grid>
              ))}
          </Grid>
          {/* <Stack
            sx={{ pt: 4 }}
            direction='row'
            spacing={2}
            justifyContent='center'
          >
            <Button
              variant='contained'
              size='medium'
              onClick={handlePreviousPage}
            >
              Prev Page
            </Button>
            <Button variant='contained' size='medium' onClick={handleNextPage}>
              Next Page
            </Button>
          </Stack> */}
        </Container>
        <Container maxWidth='md' sx={{ my: 5, justifyContent: 'center' }}>
          <Stack spacing={2} direction='row' justifyContent='center'>
            <Pagination
              count={Math.ceil(totalResults / 9)}
              page={page}
              size='large'
              onChange={(event, newPage) => setPage(newPage)}
              color='primary'
              variant='outlined'
              shape='rounded'
              siblingCount={2}
              defaultPage={1}
              showFirstButton={true}
              showLastButton={true}
            />
          </Stack>
        </Container>
      </main>
    </>
  );
};

export default Search;
