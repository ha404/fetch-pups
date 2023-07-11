// DogCar.tsx
import React from 'react';
import { Dog } from '../../services/api';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Favorite } from '@mui/icons-material';

interface DogCardProps {
  dog: Dog;
  onFavoriteClick: (id: string) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onFavoriteClick }) => {
  return (
    <Card
      raised
      sx={{
        maxWidth: 280,
        margin: '0 auto 0',
        padding: '0 0.1em',
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
        <CardActions disableSpacing sx={{ py: 0 }}>
          <IconButton
            aria-label='add to favorites'
            onClick={() => onFavoriteClick(dog.id)}
          >
            <FavoriteBorderIcon color='error' />
            {/* <Favorite color='error' /> */}
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default DogCard;
