import React, { useContext } from 'react';
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
import { FavoritesContext } from '../../context/FavoritesContext';

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const isFavorite = favorites.includes(dog.id);

  // Add or remove from favorites based on the current isFavorite status
  const handleFavoriteIconButtonClick = () => {
    if (isFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== dog.id)
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, dog.id]);
    }
  };

  return (
    <Card
      raised
      sx={{
        maxWidth: 275,
        minWidth: 268,
        margin: '0 auto 0',
        padding: '0, 0.5em',
        borderRadius: 2,
        bgcolor: 'white',
        maxHeight: 390,
      }}
    >
      <CardMedia
        component='img'
        height='200'
        width='100%'
        image={dog.img}
        alt={dog.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {dog.name}
        </Typography>
        <Typography
          variant='body1'
          color='text.primary'
          sx={{ fontWeight: 400 }}
        >
          Breed: {dog.breed}
        </Typography>
        <Typography
          variant='body1'
          color='text.primary'
          sx={{ fontWeight: 400 }}
        >
          Age: {dog.age} years old
        </Typography>
        <Typography
          variant='body1'
          color='text.primary'
          sx={{ fontWeight: 400 }}
        >
          Location: {dog.zip_code}
        </Typography>
        {favorites && (
          <CardActions disableSpacing sx={{ py: 0, pl: 0 }}>
            <IconButton
              aria-label={
                !isFavorite ? 'add to favorites' : 'remove from favorites'
              }
              onClick={handleFavoriteIconButtonClick}
            >
              {isFavorite ? (
                <Favorite color='error' fontSize='medium' />
              ) : (
                <FavoriteBorderIcon color='error' fontSize='medium' />
              )}
            </IconButton>
          </CardActions>
        )}
      </CardContent>
    </Card>
  );
};

export default DogCard;
