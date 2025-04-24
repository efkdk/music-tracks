import { memo } from 'react';
import { Music } from 'lucide-react';
import { CreateTrackModal } from '@features/create-track';

export const TracksHeader = memo(() => {
  return (
    <header className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-200 pb-4">
      <div className="flex items-center gap-2">
        <Music className="flex-shrink-0 flex-grow-0 w-[1.5rem] h-[1.5rem]" />
        <h1 className="text-3xl font-bold">Music Tracks</h1>
      </div>
      <CreateTrackModal />
    </header>
  );
});
