import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { Box, Button } from '@mui/material';
import { useZipCodes } from '../../context/ZipCodesContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { zipCodes, setZipCodes, removeZipCode } = useZipCodes();

  useEffect(() => {
    // Only add the value to zip codes when it's exactly 5 numeric characters
    if (/^\d{5}$/.test(inputValue)) {
      setZipCodes((prevZipCodes) => [...prevZipCodes, inputValue]);
      setInputValue('');
    }
  }, [inputValue, setZipCodes]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleZipCodeClick = (zipCode: string) => {
    removeZipCode(zipCode);
  };

  return (
    <Box>
      <Search>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <StyledInputBase
            placeholder='Enter a zip code...'
            inputProps={{ 'aria-label': 'search' }}
            value={inputValue}
            onChange={handleInputChange}
          />
          <SearchIconWrapper>
            <IconButton
              onClick={() => {}}
              style={{ position: 'absolute', right: '0' }}
            >
              <SearchIcon />
            </IconButton>
          </SearchIconWrapper>
        </div>
      </Search>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          mt: 1,
        }}
      >
        {zipCodes.map((zipCode) => (
          <Button
            variant='outlined'
            key={zipCode}
            onClick={() => handleZipCodeClick(zipCode)}
          >
            {zipCode}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SearchBar;
