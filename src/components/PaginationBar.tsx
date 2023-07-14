import React from 'react';
import { Stack, Container, createTheme, ThemeProvider } from '@mui/material';
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
  const theme = createTheme({
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            backgroundColor: '#1e7dd9',
            color: 'white',
            border: 'none',
          },
        },
      },
    },
  });

  return (
    <Container maxWidth='md' sx={{ my: 5, justifyContent: 'center' }}>
      <Stack spacing={2} direction='row' justifyContent='center'>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </Stack>
    </Container>
  );
};

export default PaginationBar;
