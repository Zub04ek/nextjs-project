'use client';

import { Inter } from 'next/font/google';

import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

let theme = createTheme(
  {
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
    palette: {
      common: {
        black: '#111111',
      },
    },
    typography: {
      fontFamily: inter.style.fontFamily,
    },
  },
  { cssVariables: true }
);

theme = {
  ...theme,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            border: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          maxHeight: '256px !important',
          transition: 'border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          scrollbarWidth: 'thin',
          scrollBehavior: 'smooth',
          scrollbarColor: 'rgba(17, 17, 17, 0.2) transparent',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            borderRadius: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: 'rgba(17, 17, 17, 0.2)',
            backgroundClip: 'padding-box',
            minHeight: 24,
            border: '3px solid transparent',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          [`& .MuiInputBase-input`]: {
            paddingTop: '10px',
            paddingBottom: '10px',
            height: 'auto',
            lineHeight: 1.5,
          },
          [`& .MuiInputBase-input::placeholder`]: {
            opacity: 1,
            color: '#75818F',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          ['&:hover']: {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: 1.5,
          color: theme.palette.common.black,
          ['& svg']: {
            width: '16px',
            height: '16px',
          },
          ['& .MuiChip-deleteIcon']: {
            color: '#9EAAB8',
          },
          ['&.MuiChip-colorError .MuiChip-deleteIcon']: {
            color: theme.palette.common.black,
          },
        },
      },
    },
  },
};

export default theme;
