import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { AudioPlayer } from '@widgets/player/ui/audio-player';

export const RootLayout = () => {
  return (
    <div className="relative pb-[10rem] sm:pb-[8rem]">
      <AudioPlayer />
      <Outlet />
      <ToastContainer />
    </div>
  );
};
