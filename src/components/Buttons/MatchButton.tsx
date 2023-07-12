import React from 'react';
import { Button } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useNavigate } from 'react-router-dom';

const MatchButton: React.FC = () => {
  const navigate = useNavigate();

  const handleRegenerateMatch = async () => {
    navigate('/match');
  };

  return (
    <Button
      variant='contained'
      color='secondary'
      size='small'
      startIcon={<CelebrationIcon />}
      sx={{ fontWeight: 700, mx: 1 }}
      onClick={handleRegenerateMatch}
    >
      Match
    </Button>
  );
};

export default MatchButton;
