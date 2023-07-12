import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { allBreeds } from './breeds';

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
