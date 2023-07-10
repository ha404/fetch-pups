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
  Pets,
  SortByAlpha,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import TuneIcon from '@mui/icons-material/Tune';

const Search: React.FC = () => {
  const [dogsIds, setDogsIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [asc, setAsc] = useState<boolean>(true);

  useEffect(() => {
    fetchDogs();
  }, [page, asc]);

  const fetchDogs = async () => {
    try {
      // Retrieve Dog Ids
      const responseIds = await APIService.getDogsIds({
        size: 9,
        sort: `breed:${asc ? 'asc' : 'desc'}`,
        from: itemCount(page),
      });
      setDogsIds(responseIds.data.resultIds);
      // Retrive Dogs Objects
      const response = await APIService.getDogs(responseIds.data.resultIds);
      setDogs(response.data);
    } catch (err) {
      setError('An error occurred while fetching dogs.');
      console.error(err);
    }
  };

  const itemCount = (page: number) => {
    if (page === 1) {
      return 0;
    }
    if (page > 1) {
      return page * 9;
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
          <Container maxWidth='md' sx={{ py: 5 }}>
            <Typography
              variant='h2'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              Let's find a match!
            </Typography>
            <Typography
              variant='h6'
              align='center'
              color='textSecondary'
              paragraph
            >
              Here at FetchPups, we love our furry friends, and hope you do too!
              Our mission is to help a dog-lover like yourself find a lucky dog
              to join your family. Pick a few of your favorite dogs and we will
              find you a match!
            </Typography>
            <Grid container spacing={0} columns={16}>
              <Grid item xs={8}>
                <Button
                  variant='outlined'
                  color='primary'
                  startIcon={<TuneIcon />}
                  fullWidth
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
                  SORT
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* End Hero */}
        <Container maxWidth='md'>
          {error && <p>{error}</p>}
          <Grid container spacing={3}>
            {dogs &&
              dogs.map((dog: Dog) => (
                <Grid item xs={12} sm={6} md={4} key={dog.id}>
                  <DogCard dog={dog} />
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
              count={1110}
              page={page}
              size='large'
              onChange={(event, newPage) => setPage(newPage)}
              color='primary'
              variant='outlined'
              shape='rounded'
              siblingCount={2}
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
