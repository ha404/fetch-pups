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
import ClearFavoritesButton from '../components/Buttons/ClearFavoritesButton';
import SearchButton from '../components/Buttons/SearchButton';
import EmptyFavoritesAlert from '../components/EmptyFavoritesAlert';

const Search: React.FC = () => {
  const { favorites, showFavorite, setShowFavorite } =
    useContext(FavoritesContext);

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [asc, setAsc] = useState<boolean>(true);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [ageRange, setAgeRange] = useState<number | number[]>([0, 20]);
  const [ageMin, ageMax] = ageRange as [number, number];

  useEffect(() => {
    fetchData();
  }, [page, asc, selectedBreeds, ageRange, showFavorite]);

  // Fetch dogs data from the API based on the current search criteria
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
      // Handle errors
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

  // Handle age range slider change
  const handleAgeRangeSlider = (event: any, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  // Toggle show/hide filter section
  const toggleShowFilter = () => {
    setShowFilter((prevShowFilter) => !prevShowFilter);
  };

  // Handle sort order toggle
  const toggleSortOrder = () => {
    setAsc((prevAsc) => !prevAsc);
  };

  // Toggle show/hide favorite dogs
  const toggleShowFavorites = () => {
    setShowFavorite((prev) => !prev);
  };

  // Calculate the count of favorite dogs
  const favoritesCount = favorites.length;

  return (
    <>
      <main>
        {/* <Hero /> */}
        {/* Search Section */}
        <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'row' }}>
          <FilterSection
            asc={asc}
            showComboBox={showFilter}
            handleSort={toggleSortOrder}
            toggleShowFilter={toggleShowFilter}
            selectedBreeds={selectedBreeds}
            setSelectedBreeds={setSelectedBreeds}
            ageRange={ageRange}
            handleAgeRangeSlider={handleAgeRangeSlider}
            ageMin={ageMin}
            ageMax={ageMax}
          />

          {/* End Search Section */}
          {/* Results Section */}
          <Container maxWidth='lg' sx={{ py: 1, my: 10 }}>
            <Grid
              container
              spacing={1}
              justifyContent='space between'
              sx={{
                py: 1,
                pt: 0.5,
                mb: 1,
                bgcolor: '#F2F3F5',
                borderRadius: 1,
              }}
            >
              <Grid item xs={9}>
                <Container>
                  <FavoritesButton
                    favoritesCount={favoritesCount}
                    showFavorite={showFavorite}
                    toggleShowFavorite={toggleShowFavorites}
                  />
                  {showFavorite ? <ClearFavoritesButton /> : null}
                  <MatchButton />
                  {showFavorite ? <SearchButton /> : null}
                </Container>
              </Grid>
              <Grid item xs={3}>
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
            {/* Dog Cards Section */}
            <Grid container spacing={3}>
              {favorites.length === 0 && showFavorite ? (
                <EmptyFavoritesAlert />
              ) : (
                dogs.map((dog: Dog) => (
                  <Grid item xs={12} sm={6} md={4} key={dog.id}>
                    <DogCard dog={dog} />
                  </Grid>
                ))
              )}
            </Grid>
            <PaginationBar
              totalResults={totalResults}
              page={page}
              setPage={setPage}
            />
            {/*End Dog Cards Section*/}
          </Container>
          {/* End Results Section */}
        </Container>
      </main>
    </>
  );
};

export default Search;
