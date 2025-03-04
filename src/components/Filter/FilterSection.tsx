import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import TuneIcon from '@mui/icons-material/Tune';
import ComboBox from './ComboBox';
import { Box } from '@mui/material';

interface FilterProps {
  asc: boolean;
  showComboBox: boolean;
  selectedBreeds: string[];
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
  ageRange: number | number[];
  ageMin: number;
  ageMax: number;
  handleSort: () => void;
  toggleShowFilter: () => void;
  handleAgeRangeSlider: (event: any, newValue: number | number[]) => void;
}

const FilterSection: React.FC<FilterProps> = ({
  asc,
  showComboBox,
  selectedBreeds,
  setSelectedBreeds,
  ageRange,
  handleSort,
  toggleShowFilter,
  handleAgeRangeSlider,
  ageMin,
  ageMax,
}) => {
  return (
    <>
      <Box
        sx={{
          py: 1,
          px: { xs: 0, lg: ' 1rem' },
          mt: 2,
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
          Search By Filter
        </Typography>
        <Grid container spacing={0} columns={12}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              variant={showComboBox ? 'contained' : 'outlined'}
              color='primary'
              startIcon={<TuneIcon />}
              fullWidth
              // onClick={toggleShowFilter}
              sx={{
                border: 0.2,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRight: 0.1,
              }}
            >
              FILTER
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              variant='outlined'
              color='primary'
              startIcon={asc ? <ArrowUpward /> : <ArrowDownward />}
              fullWidth
              onClick={handleSort}
              sx={{
                border: 0.2,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              SORT
            </Button>
          </Grid>
        </Grid>
        <Box display='flex' flexDirection='column' sx={{ py: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              py: 1,
            }}
          >
            <Typography
              id='track-breeds'
              variant='body2'
              gutterBottom
              sx={{ fontWeight: 400 }}
            >
              Select Dog Breed(s)
            </Typography>
            <Box sx={{ pl: 1, pr: 0 }}>
              <ComboBox
                selectedBreeds={selectedBreeds}
                setSelectedBreeds={setSelectedBreeds}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', py: 2 }}>
            <Typography
              id='track-slider'
              variant='body2'
              gutterBottom
              sx={{ fontWeight: 400 }}
            >
              Select Age Range:
            </Typography>
            <Box sx={{ pl: 3, pr: 0 }}>
              <Typography
                id='track-slider-number'
                variant='body1'
                color='textPrimary'
                gutterBottom
              >
                {ageMin} - {ageMax} years old
              </Typography>
              <Slider
                getAriaLabel={() => 'Dog Age Range'}
                value={ageRange}
                onChange={handleAgeRangeSlider}
                max={20}
                sx={{ maxWidth: 150 }}
                size='medium'
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FilterSection;
