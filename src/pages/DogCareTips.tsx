import React from 'react';
import {
  Grid,
  Box,
  Typography,
  ButtonBase,
  useMediaQuery,
} from '@mui/material';
import bg5 from '../assets/bg5.jpeg';
import tips1 from '../assets/tips1.jpeg';
import tips2 from '../assets/tips2.jpeg';
import tips3 from '../assets/tips3.jpeg';
import tips4 from '../assets/tips4.jpeg';

const DogCareTips: React.FC = () => {
  const tips = [
    {
      image: tips1,
      caption: 'Should You Feed Your Pet Wet or Dry Food?',
      link: 'https://www.zoetispetcare.com/blog/article/feed-pet-wet-dry-food',
    },
    {
      image: tips2,
      caption: 'My Dog Has a Belly Rash, What Now?',
      link: 'https://www.zoetispetcare.com/blog/article/dog-belly-rash',
    },
    {
      image: tips3,
      caption: 'Treats for Dogs: When Are They Too Much',
      link: 'https://www.zoetispetcare.com/blog/article/treats-pets-too-much3',
    },
    {
      image: tips4,
      caption: 'What is Hyperpigmentatioins in Dogs',
      link: 'https://www.zoetispetcare.com/blog/article/hyperpigmentation-dogs',
    },
  ];

  const isXsScreen = useMediaQuery('(max-width:600px)');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5} sx={{ height: isXsScreen ? '30vh' : '100%' }}>
        <img
          src={bg5}
          alt={'Happy Dogs'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: isXsScreen ? 'cover' : 'initial',
          }}
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <Typography
          variant='h4'
          align='center'
          color='text-primary'
          gutterBottom
          sx={{ mt: 2, pt: 5, fontWeight: 700, py: { xs: 0 } }}
        >
          Dog Care Tips
        </Typography>
        <Typography
          variant='h6'
          align='center'
          color='text-primary'
          sx={{ mt: 2, mb: 4, py: 1, px: 10 }}
        >
          Explore our curated dog care tips to ensure your furry friend leads a
          happy and healthy life. Click on any tip to learn more.
        </Typography>
        <Grid container spacing={2} sx={{ p: 5 }}>
          {tips.map((tip, index) => (
            <Grid item xs={6} key={index} sx={{ p: 2 }}>
              <ButtonBase
                style={{ width: '100%' }}
                onClick={() => window.open(tip.link, '_blank')}
              >
                <Box
                  sx={{
                    width: 277,
                    flexDirection: 'column',
                    bgcolor: 'white',
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      height: { xs: 100, lg: 156 },
                      objectFit: isXsScreen ? 'cover' : 'initial',
                    }}
                  >
                    <img
                      src={tip.image}
                      alt={`Dog Tip ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 4,
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Typography
                    align='center'
                    sx={{ pt: 1, pb: 5, px: 1, fontWeight: 500 }}
                  >
                    {tip.caption}
                  </Typography>
                </Box>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DogCareTips;
