import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import TuneIcon from '@mui/icons-material/Tune';
import ComboBox from './ComboBox';

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
    <Container maxWidth='md' sx={{ py: 1, bgcolor: 'FDFEFF' }}>
      <Grid container spacing={0} columns={16}>
        <Grid item xs={8}>
          <Button
            variant={showComboBox ? 'contained' : 'outlined'}
            color='primary'
            startIcon={<TuneIcon />}
            fullWidth
            onClick={toggleShowFilter}
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
        <Grid item xs={8}>
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
              borderLeft: 0,
            }}
          >
            SORT BY BREED
          </Button>
        </Grid>
      </Grid>
      {showComboBox && (
        <Container
          maxWidth='md'
          sx={{
            mt: 3,
            py: 1.5,
            border: 0.2,
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Typography id='track-slider' variant='h6' gutterBottom>
            Filter by
          </Typography>
          <Grid container spacing={3} columns={16}>
            <Grid item xs={8}>
              <Typography id='track-breeds' gutterBottom>
                Select Dog Breed(s)
              </Typography>
              <ComboBox
                selectedBreeds={selectedBreeds}
                setSelectedBreeds={setSelectedBreeds}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography id='track-slider' gutterBottom>
                Select Age Range:{' '}
                <i>
                  {ageMin} - {ageMax} years old
                </i>
              </Typography>
              <Slider
                getAriaLabel={() => 'Dog Age Range'}
                value={ageRange}
                onChange={handleAgeRangeSlider}
                max={20}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </Container>
  );
};

export default FilterSection;
