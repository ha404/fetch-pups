import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FavoritesButton from '../Buttons/FavoriteButton';
import ClearFavoritesButton from '../Buttons/ClearFavoritesButton';
import MatchButton from '../Buttons/MatchButton';
import SearchButton from '../Buttons/SearchButton';

type ResultsToolbarProps = {
  favoritesCount: number;
  showFavorite: boolean;
  toggleShowFavorites: () => void;
  totalResults: number;
};

const ResultsToolbar: React.FC<ResultsToolbarProps> = ({
  favoritesCount,
  showFavorite,
  toggleShowFavorites,
  totalResults,
}) => {
  return (
    <Grid
      container
      spacing={1}
      justifyContent='space between'
      sx={{
        py: 1,
        pt: 0.5,
        mb: 1,
        bgcolor: '#dfe3e8',
        borderRadius: 1,
        ml: '0.2em',
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
          align='right'
          sx={{ pt: 1, pb: 0, pr: 2 }}
          color='primary'
        >
          <b>{totalResults}</b> Results
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ResultsToolbar;
