'use client';

import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, Fab, Fade, useScrollTrigger } from '@mui/material';

export const ScrollTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    const anchor = document.querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Fade>
  );
};
