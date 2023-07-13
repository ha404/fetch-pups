import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';

const SearchBarSection: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          py: '1em',
          px: { xs: 0, lg: ' 1rem' },
          mt: 5,
          bgcolor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: { xs: '80%', sm: '600px', md: '800px', lg: '1200px' },
          mx: { xs: 0, lg: 'auto' },
        }}
      >
        <Typography
          id='filter-title'
          color='primary'
          variant='h6'
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Search By Zip Code
        </Typography>
        <Grid container spacing={0} columns={12}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <SearchBar />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SearchBarSection;
