// DogCar.tsx
import React from 'react';
import { Dog } from '../../services/api';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  return (
    <Card>
      <CardMedia component='img' height='250' image={dog.img} alt={dog.name} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {dog.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {dog.breed}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {dog.age} years old
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DogCard;
