'use client';

import { useRouter } from 'next/navigation';

export const BackButton = ({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) => {
  const router = useRouter();
  return (
    <button className={className} onClick={() => router.back()}>
      {children}
    </button>
  );
};
