'use client';

import { SetStateAction } from 'react';

import { Alert, AlertProps, Snackbar } from '@mui/material';

interface ProductSnackbarProps extends AlertProps {
  children?: string;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}

export const ProductSnackbar = ({ children, severity, open, setOpen }: ProductSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={() => setOpen(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {children}
      </Alert>
    </Snackbar>
  );
};
