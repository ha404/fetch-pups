import React, { useEffect, useState } from 'react';
import DogCard from '../DogCard/DogCard';
import APIService from '../../services/api';
import { Dog } from '../../services/api';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { itemCount, valuetext } from '../../utils/utils';
import NavBar from '../NavBar/NavBar';
import PaginationBar from '../Pagination/PaginationBar';
import Hero from '../Hero';
import FilterSection from '../FilterSection';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [asc, setAsc] = useState<boolean>(true);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [showComboBox, setShowComboBox] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [ageRange, setAgeRange] = useState<number | number[]>([0, 20]);
  const [ageMin, ageMax] = ageRange as [number, number];
  const [showFavorite, setShowFavorite] = useState<boolean>(false);
  const navigate = useNavigate();

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
      let newFavorites;
      if (prevFavorites.includes(id)) {
        newFavorites = prevFavorites.filter((dogId) => dogId !== id);
      } else {
        newFavorites = [...prevFavorites, id];
      }

      // Update local storage directly after state update
      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      return newFavorites;
    });
  };

  const toggleShowFavorites = () => {
    setShowFavorite((prev) => !prev);
  };

  const handleMatchFavoriteClick = () => {
    navigate('/match');
  };

  const favoritesCount = favorites.length;

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Box
          sx={{
            bgcolor: 'background.paper',
            pb: 2,
            mb: 4,
          }}
        >
          <FilterSection
            asc={asc}
            showComboBox={showComboBox}
            handleSort={handleSort}
            handleFilterToggle={handleFilterToggle}
            selectedBreeds={selectedBreeds}
            setSelectedBreeds={setSelectedBreeds}
            ageRange={ageRange}
            handleAgeRangeSlider={handleAgeRangeSlider}
            ageMin={ageMin}
            ageMax={ageMax}
          />
        </Box>
        <Container maxWidth='md' sx={{ py: 1 }}>
          <Grid
            container
            spacing={1}
            justifyContent='space-between'
            sx={{ py: 1, pt: 0.5, mb: 1, bgcolor: '#F2F3F5', borderRadius: 1 }}
          >
            <Grid item xs={4}>
              <Button
                variant={showFavorite ? 'contained' : 'outlined'}
                color='error'
                startIcon={<Favorite />}
                onClick={toggleShowFavorites}
                sx={{
                  bgcolor: showFavorite ? null : 'white',
                  border: 0,
                  fontWeight: 700,
                }}
              >
                Favorites ({favoritesCount})
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                variant='outlined'
                color='secondary'
                startIcon={<CelebrationIcon />}
                sx={{ bgcolor: 'white', border: 0, fontWeight: 700 }}
                onClick={handleMatchFavoriteClick}
              >
                Match favorites!
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
        </Container>
        <PaginationBar
          totalResults={totalResults}
          page={page}
          setPage={setPage}
        />
      </main>
    </>
  );
};

export default Search;
