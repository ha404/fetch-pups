import React, { useEffect, useState } from 'react';
import DogCard from '../DogCard/DogCard';
import APIService from '../../services/api';
import { Dog } from '../../services/api';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Search: React.FC = () => {
  const [dogsIds, setDogsIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchDogs();
  }, [page]);

  const fetchDogs = async () => {
    try {
      const responseIds = await APIService.getDogsIds({
        size: 12,
        sort: 'breed:asc',
        from: 0,
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
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
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
      <Button variant='contained' color='primary' onClick={handlePreviousPage}>
        Previous Page
      </Button>
      <Button variant='contained' color='primary' onClick={handleNextPage}>
        Next Page
      </Button>
    </Container>
  );
};

export default Search;
