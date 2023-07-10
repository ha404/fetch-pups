// DogCar.tsx
import React from 'react';
import { Dog } from '../../services/api';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  return (
    <Card
      raised
      sx={{
        maxWidth: 280,
        margin: '0 auto',
        padding: '0.1em',
      }}
    >
      <CardMedia
        component='img'
        height='200'
        image={dog.img}
        alt={dog.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {dog.name}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Breed: {dog.breed}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Age: {dog.age} years old
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Location : {dog.zip_code}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DogCard;
