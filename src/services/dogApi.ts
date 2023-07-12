import APIService, { Dog } from './api';
import { itemCount } from '../utils/utils';

// Fetch dogs data from the API based on the current search criteria
export const fetchDogs = async (
  showFavorite: boolean,
  favorites: string[],
  asc: boolean,
  page: number,
  selectedBreeds: string[] | null,
  ageRange: number[]
) => {
  let dogIds: string[] = [];
  let totalResults: number = 0;
  let dogs: Dog[] = [];

  try {
    if (showFavorite) {
      // Supply Dog ids from favorites instead
      dogIds = favorites;
      totalResults = favorites.length;
    } else {
      // Retrieve Dog Ids
      const responseIds = await APIService.getDogsIds({
        size: 9,
        sort: `breed:${asc ? 'asc' : 'desc'}`,
        from: itemCount(page),
        breeds: selectedBreeds ? selectedBreeds : null,
        ageMin: ageRange[0],
        ageMax: ageRange[1],
      });
      totalResults = responseIds.data.total;
      dogIds = responseIds.data.resultIds;
    }
    // Retrieve Dog objects
    const response = await APIService.getDogs(dogIds);
    dogs = response.data;
  } catch (err) {
    throw err; // throw the error back to the component to handle
  }

  return { dogs, totalResults };
};
