import React, { useEffect, useState, useContext } from 'react';
import DogCard from '../components/DogCard';
import { Dog } from '../services/api';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import PaginationBar from '../components/PaginationBar';
import Hero from '../components/Hero';
import FilterSection from '../components/Filter/FilterSection';
import MatchButton from '../components/Buttons/MatchButton';
import FavoritesButton from '../components/Buttons/FavoriteButton';
import { FavoritesContext } from '../context/FavoritesContext';
import { isAxiosError } from 'axios';
import { fetchDogs } from '../services/dogApi';

const Search: React.FC = () => {
  const { favorites, setFavorites, showFavorite, setShowFavorite } =
    useContext(FavoritesContext);

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [asc, setAsc] = useState<boolean>(true);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [showComboBox, setShowComboBox] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [ageRange, setAgeRange] = useState<number | number[]>([0, 20]);
  const [ageMin, ageMax] = ageRange as [number, number];

  useEffect(() => {
    fetchData();
  }, [page, asc, selectedBreeds, ageRange, showFavorite]);

  const fetchData = async () => {
    try {
      const { dogs, totalResults } = await fetchDogs(
        showFavorite,
        favorites,
        asc,
        page,
        selectedBreeds,
        ageRange as number[]
      );
      setDogs(dogs);
      setTotalResults(totalResults);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 400) {
        setError('An error occurred while fetching dogs, please try again');
      } else if (isAxiosError(err) && err.request) {
        setError(
          'A network error occurred, please check your internet connection'
        );
      } else {
        setError('An unexpected error occurred');
      }
      console.error(err);
    }
  };

  const handleSort = () => {
    setAsc((prevAsc) => !prevAsc);
  };

  const handleAgeRangeSlider = (event: any, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  const handleAddFavoriteClick = (id: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((dogId) => dogId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const toggleShowFilter = () => {
    setShowComboBox((prevShowComboBox) => !prevShowComboBox);
  };

  const toggleShowFavorites = () => {
    setShowFavorite((prev) => !prev);
  };

  const favoritesCount = favorites.length;

  return (
    <>
      <main>
        <Hero />
        {/* Search Section */}
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
            toggleShowFilter={toggleShowFilter}
            selectedBreeds={selectedBreeds}
            setSelectedBreeds={setSelectedBreeds}
            ageRange={ageRange}
            handleAgeRangeSlider={handleAgeRangeSlider}
            ageMin={ageMin}
            ageMax={ageMax}
          />
        </Box>
        {/* End Search Section */}
        {/* Results Section */}
        <Container maxWidth='md' sx={{ py: 1 }}>
          <Grid
            container
            spacing={1}
            justifyContent='space between'
            sx={{ py: 1, pt: 0.5, mb: 1, bgcolor: '#F2F3F5', borderRadius: 1 }}
          >
            <Grid item xs={9}>
              <Container>
                <FavoritesButton
                  favoritesCount={favoritesCount}
                  showFavorite={showFavorite}
                  toggleShowFavorite={toggleShowFavorites}
                />
                <MatchButton />
              </Container>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant='subtitle1'
                align='center'
                sx={{ pt: 1, pb: 0, pl: 5 }}
                color='primary'
              >
                <b>{totalResults}</b> Results
              </Typography>
            </Grid>
          </Grid>
          {error && <p>{error}</p>}
          {/* Dog Cards Section */}
          <Grid container spacing={3}>
            {dogs &&
              dogs.map((dog: Dog) => (
                <Grid item xs={12} sm={6} md={4} key={dog.id}>
                  <DogCard
                    dog={dog}
                    onFavoriteClick={handleAddFavoriteClick}
                    favorites={favorites}
                  />
                </Grid>
              ))}
          </Grid>
          {/*End Dog Cards Section*/}
        </Container>
        {/* End Results Section */}
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
