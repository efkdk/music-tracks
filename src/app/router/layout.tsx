import { AudioPlayer } from '@widgets/player/ui/audio-player';
import { Outlet } from 'react-router';

export const RootLayout = () => {
  return (
    <div className="relative">
      <AudioPlayer />
      <Outlet />
    </div>
  );
};
