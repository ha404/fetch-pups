import React from 'react';
import Container from '@mui/material/Container';
import { Typography, Box } from '@mui/material';

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 6,
        pb: 6,
      }}
    >
      <Container maxWidth='md'>
        <Typography
          variant='h3'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          Let's find a match!
        </Typography>
        <Typography
          variant='body1'
          align='center'
          color='textSecondary'
          paragraph
        >
          Here at FetchPups, we love our furry friends, and hope you do too! Our
          mission is to help a dog-lover like yourself find a sheltered dog to
          join your family. Pick a few of your favorite dogs and we will find
          you a match!
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
