import React from 'react';
import { Stack, Container, styled } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& button': {
    '&:hover': {
      backgroundColor: '#1e7dd9',
      color: 'white',
      border: 'none',
      fontWeight: theme.typography.fontWeightBold,
    },
  },
}));

interface PaginationBarProps {
  totalResults: number;
  page: number;
  setPage: (page: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  totalResults,
  page,
  setPage,
}) => {
  return (
    <Container maxWidth='md' sx={{ my: 5, justifyContent: 'center' }}>
      <Stack spacing={2} direction='row' justifyContent='center'>
        <StyledPagination
          count={Math.ceil(totalResults / 9)}
          page={page}
          size='large'
          onChange={(event, newPage) => setPage(newPage)}
          color='primary'
          variant='outlined'
          shape='rounded'
          siblingCount={2}
          defaultPage={1}
          showFirstButton={true}
          showLastButton={true}
        />
      </Stack>
    </Container>
  );
};

export default PaginationBar;
