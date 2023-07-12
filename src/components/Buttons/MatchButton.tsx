import React, { useContext, useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const MatchButton: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useContext(FavoritesContext);
  const [open, setOpen] = useState(false);

  const handleRegenerateMatch = async () => {
    if (favorites.length === 0) {
      setOpen(true);
    } else {
      navigate('/match');
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='warning'>
          Please add some favorites first!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MatchButton;
