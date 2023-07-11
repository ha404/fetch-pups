import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const allBreeds = [
  'Affenpinscher',
  'Afghan Hound',
  'African Hunting Dog',
  'Airedale',
  'American Staffordshire Terrier',
  'Appenzeller',
  'Australian Terrier',
  'Basenji',
  'Basset',
  'Beagle',
  'Bedlington Terrier',
  'Bernese Mountain Dog',
  'Black-and-tan Coonhound',
  'Blenheim Spaniel',
  'Bloodhound',
  'Bluetick',
  'Border Collie',
  'Border Terrier',
  'Borzoi',
  'Boston Bull',
  'Bouvier Des Flandres',
  'Boxer',
  'Brabancon Griffon',
  'Briard',
  'Brittany Spaniel',
  'Bull Mastiff',
  'Cairn',
  'Cardigan',
  'Chesapeake Bay Retriever',
  'Chihuahua',
  'Chow',
  'Clumber',
  'Cocker Spaniel',
  'Collie',
  'Curly-coated Retriever',
  'Dandie Dinmont',
  'Dhole',
  'Dingo',
  'Doberman',
  'English Foxhound',
  'English Setter',
  'English Springer',
  'EntleBucher',
  'Eskimo Dog',
  'Flat-coated Retriever',
  'French Bulldog',
  'German Shepherd',
  'German Short-haired Pointer',
  'Giant Schnauzer',
  'Golden Retriever',
  'Gordon Setter',
  'Great Dane',
  'Great Pyrenees',
  'Greater Swiss Mountain Dog',
  'Groenendael',
  'Ibizan Hound',
  'Irish Setter',
  'Irish Terrier',
  'Irish Water Spaniel',
  'Irish Wolfhound',
  'Italian Greyhound',
  'Japanese Spaniel',
  'Keeshond',
  'Kelpie',
  'Kerry Blue Terrier',
  'Komondor',
  'Kuvasz',
  'Labrador Retriever',
  'Lakeland Terrier',
  'Leonberg',
  'Lhasa',
  'Malamute',
  'Malinois',
  'Maltese Dog',
  'Mexican Hairless',
  'Miniature Pinscher',
  'Miniature Poodle',
  'Miniature Schnauzer',
  'Newfoundland',
  'Norfolk Terrier',
  'Norwegian Elkhound',
  'Norwich Terrier',
  'Old English Sheepdog',
  'Otterhound',
  'Papillon',
  'Pekinese',
  'Pembroke',
  'Pomeranian',
  'Pug',
  'Redbone',
  'Rhodesian Ridgeback',
  'Rottweiler',
  'Saint Bernard',
  'Saluki',
  'Samoyed',
  'Schipperke',
  'Scotch Terrier',
  'Scottish Deerhound',
  'Sealyham Terrier',
  'Shetland Sheepdog',
  'Shih-Tzu',
  'Siberian Husky',
  'Silky Terrier',
  'Soft-coated Wheaten Terrier',
  'Staffordshire Bullterrier',
  'Standard Poodle',
  'Standard Schnauzer',
  'Sussex Spaniel',
  'Tibetan Mastiff',
  'Tibetan Terrier',
  'Toy Poodle',
  'Toy Terrier',
  'Vizsla',
  'Walker Hound',
  'Weimaraner',
  'Welsh Springer Spaniel',
  'West Highland White Terrier',
  'Whippet',
  'Wire-haired Fox Terrier',
  'Yorkshire Terrier',
];

interface ComboBoxProps {
  selectedBreeds: string[];
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  selectedBreeds,
  setSelectedBreeds,
}) => {
  return (
    <Autocomplete
      disablePortal
      size='small'
      id='combo-box'
      multiple
      options={allBreeds}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label='Filter by breeds' />
      )}
      onChange={(event: any, newValues: string[] | null) => {
        if (newValues) {
          setSelectedBreeds(newValues);
        }
      }}
      value={selectedBreeds}
    />
  );
};
export default ComboBox;
