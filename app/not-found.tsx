import Link from 'next/link';
import { SentimentDissatisfied } from '@mui/icons-material';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <SentimentDissatisfied sx={{ width: 40, height: 40 }} className="text-gray-400" />
      <h2 className="text-xl font-semibold">404</h2>
      <p>This page could not be found.</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
