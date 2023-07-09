import React, { useEffect, useState } from 'react';
import DogCard from '../DogCard/DogCard';
import APIService from '../../services/api';
import { Dog } from '../../services/api';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Pets } from '@mui/icons-material';

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
        size: 12,
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
    setPage((prevPage) => prevPage + 12);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 12);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h6'>FetchPups</Typography>
          <Pets />
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth='sm'>
          <Typography
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Let's look for a pup
          </Typography>
          <Typography variant='h6' align='center' color='textPrimary' paragraph>
            Lorem Ipsum has been the industry standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </Typography>
        </Container>
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
          <Button
            variant='contained'
            color='primary'
            onClick={handlePreviousPage}
          >
            Previous Page
          </Button>
          <Button variant='contained' color='primary' onClick={handleNextPage}>
            Next Page
          </Button>
        </Container>
      </main>
    </>
  );
};

export default Search;
