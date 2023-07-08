// Inside DogCard.tsx
import React from 'react';
import { Dog } from '../../services/api';

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  return (
    <div>
      <img src={dog.img} alt={dog.name} />
      <h2>{dog.name}</h2>
      <p>{dog.breed}</p>
      <p>{dog.age} years old</p>
    </div>
  );
};

export default DogCard;
