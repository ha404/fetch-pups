import React, { useEffect, useState } from 'react';
import DogCard from '../DogCard/DogCard';
import APIService from '../../services/api';
import { Dog } from '../../services/api';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { AppBar, Stack, Theme, Toolbar, Typography } from '@mui/material';
import { Pets } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const [dogsIds, setDogsIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchDogs();
  }, [page]);

  const fetchDogs = async () => {
    try {
      const responseIds = await APIService.getDogsIds({
        size: 9,
        sort: 'breed:asc',
        from: page,
      });
      setDogsIds(responseIds.data.resultIds);

      const response = await APIService.getDogs(responseIds.data.resultIds);
      setDogs(response.data);
    } catch (err) {
      setError('An error occurred while fetching dogs.');
      console.error(err);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 9);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 9);
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

  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          <Pets />
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            FetchPups
          </Typography>
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero Section */}
        <Container maxWidth='sm' style={{ marginTop: 100, marginBottom: 100 }}>
          <Typography
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Let's look for a pup
          </Typography>
          <Typography
            variant='h6'
            align='center'
            color='textSecondary'
            paragraph
          >
            Lorem Ipsum has been the industry standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction='row'
            spacing={2}
            justifyContent='center'
          >
            <Button variant='contained' color='primary'>
              See my photos
            </Button>
            <Button variant='outlined' color='primary'>
              Secondary Action
            </Button>
          </Stack>
        </Container>
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
          <Stack
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
          </Stack>
        </Container>
      </main>
    </>
  );
};

export default Search;
