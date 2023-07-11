import React from 'react';
import { Stack, Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';

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
        <Pagination
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
