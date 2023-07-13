import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Hero from '../components/Hero';
import bg2 from '../assets/bg2.jpeg';
import bg3 from '../assets/bg2.jpeg';
import bg5 from '../assets/bg2.jpeg';

const About: React.FC = () => {
  return (
    <Container
      maxWidth='xl'
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Grid container spacing={2}>
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
    </Container>
  );
};

export default About;
