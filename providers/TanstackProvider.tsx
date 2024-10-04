'use client';

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@/api/getQueryClient';

export const TanstackProvider = ({ children }: PropsWithChildren<{}>) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {children}
    </QueryClientProvider>
  );
};
