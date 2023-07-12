import React from 'react';
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PetsIcon from '@mui/icons-material/Pets';

const EmptyFavoritesAlert: React.FC = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3,
          py: 10,
        }}
      >
        <Typography variant='h6' color='textSecondary' align='center'>
          Oops! You haven't added any favorites yet...
        </Typography>
        <Typography
          variant='subtitle1'
          color='textSecondary'
          align='center'
          gutterBottom
        >
          Let's pick some of your favorite dogs so we can generate a match for
          ya!
        </Typography>
        <PetsIcon color='secondary' fontSize='large' />
      </Box>
    </Container>
  );
};

export default EmptyFavoritesAlert;
