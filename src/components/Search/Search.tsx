// Inside Search.tsx
import React, { useEffect, useState } from 'react';
import DogCard from '../DogCard/DogCard';
import APIService from '../../services/api';
import { Dog } from '../../services/api';

const Search: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchDogs();
  }, [page]);

  const fetchDogs = async () => {
    try {
      // For now, fetch a default list of 25 dogs, sorted by breed in ascending order
      const response = await APIService.getDogs({
        size: 25,
        sort: 'breed:asc',
        page: page,
      });
      setDogs(response.data);
    } catch (err) {
      setError('An error occurred while fetching dogs.');
      console.error(err);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {/* {dogs.map((dog: Dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))} */}
      <button onClick={handlePreviousPage}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

export default Search;
