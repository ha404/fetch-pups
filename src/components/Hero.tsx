import React from 'react';
import Container from '@mui/material/Container';
import { Typography, Box } from '@mui/material';
import { Pets } from '@mui/icons-material';

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 10,
        pb: 6,
      }}
    >
      <Container maxWidth='md'>
        <Typography
          variant='h3'
          align='center'
          color='textPrimary'
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Let's find a match!
        </Typography>
        <Typography
          variant='h6'
          align='center'
          color='textPrimary'
          paragraph
          sx={{ fontWeight: 500 }}
        >
          Here at
          <Pets />
          FetchPups, we love our furry best friends. Our mission is to help a
          dog-lover like yourself find a sheltered dog to join your family. Pick
          a few of your favorite dogs and we will find you a perfect match!
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
