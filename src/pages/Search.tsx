import React, { useEffect, useState, useContext } from 'react';
import { Dog } from '../services/api';
import Container from '@mui/material/Container';
import PaginationBar from '../components/PaginationBar';
import FilterSection from '../components/Filter/FilterSection';
import { FavoritesContext } from '../context/FavoritesContext';
import { isAxiosError } from 'axios';
import { fetchDogs } from '../services/dogApi';
import DogCardsSection from '../components/ResultsSection/DogCardsSection';
import ResultsToolbar from '../components/ResultsSection/ResultsToolBar';
import SearchBar from '../components/Filter/SearchBarSection';
import { useZipCodes } from '../context/ZipCodesContext';

const Search: React.FC = () => {
  const { favorites, showFavorite, setShowFavorite } =
    useContext(FavoritesContext);
  const { zipCodes } = useZipCodes();

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [asc, setAsc] = useState<boolean>(true);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [ageRange, setAgeRange] = useState<number | number[]>([0, 20]);
  const [ageMin, ageMax] = ageRange as [number, number];

  useEffect(() => {
    fetchData();
  }, [page, asc, selectedBreeds, ageRange, showFavorite, zipCodes]);

  // Fetch dogs data from the API based on the current search criteria
  const fetchData = async () => {
    try {
      const { dogs, totalResults } = await fetchDogs(
        showFavorite,
        favorites,
        asc,
        page,
        selectedBreeds,
        ageRange as number[],
        zipCodes
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
        <Container
          maxWidth='lg'
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {/* Search Section */}
          <Container
            disableGutters
            maxWidth={false}
            sx={{
              maxWidth: { xs: '80%', lg: '18rem' },
              mr: { xs: 0, lg: 2 },
            }}
          >
            <SearchBar />
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
          </Container>
          {/* End Search Section */}
          {/* Results Section */}
          <Container disableGutters maxWidth='lg' sx={{ py: 1, px: 1, my: 5 }}>
            <ResultsToolbar
              favoritesCount={favoritesCount}
              showFavorite={showFavorite}
              toggleShowFavorites={toggleShowFavorites}
              totalResults={totalResults}
            />
            {error && <p>{error}</p>}
            {/* Dog Cards Section */}
            <DogCardsSection
              dogs={dogs}
              showFavorite={showFavorite}
              favorites={favorites}
            />
            {/*End Dog Cards Section*/}
            <PaginationBar
              totalResults={totalResults}
              page={page}
              setPage={setPage}
            />
          </Container>
          {/* End Results Section */}
        </Container>
      </main>
    </>
  );
};

export default Search;
