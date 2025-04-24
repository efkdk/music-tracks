import { AudioPlayer } from '@widgets/player/ui/audio-player';
import { Outlet } from 'react-router';

export const RootLayout = () => {
  return (
    <div className="relative pb-[6.25rem]">
      <AudioPlayer />
      <Outlet />
    </div>
  );
};
