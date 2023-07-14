import React from 'react';
import { Box, Grid } from '@mui/material';
import Hero from '../components/Hero';
import bg2 from '../assets/bg2.jpeg';

const About: React.FC = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box
          component='img'
          src={bg2}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          alt='about-image'
        />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Hero />
      </Grid>
    </Grid>
  );
};

export default About;
