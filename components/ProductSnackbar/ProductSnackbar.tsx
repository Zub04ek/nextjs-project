'use client';

import { Alert, Snackbar } from '@mui/material';
import { SetStateAction } from 'react';

interface ProductSnackbarProps {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}

export const ProductSnackbar = ({ open, setOpen }: ProductSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={() => setOpen(false)} severity="info" variant="filled" sx={{ width: '100%' }}>
        Product card detailing in the development process!
      </Alert>
    </Snackbar>
  );
};
