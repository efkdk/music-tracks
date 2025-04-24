import { Button } from '@shared/ui/button';
import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
      <span className="text-6xl font-bold text-red-400">404</span>
      <p className="text-xl font-semibold">The vibes you're looking for can't be found.</p>
      <Link to="/tracks">
        <Button size="lg" className="text-[1rem]">
          To Tracks
        </Button>
      </Link>
    </div>
  );
};
