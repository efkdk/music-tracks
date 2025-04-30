import { useState } from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { AudioPlayer } from '@widgets/player/ui/audio-player';

export const RootLayout = () => {
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(false);

  return (
    <div className={isPlayerVisible ? 'relative pb-[10rem] sm:pb-[8rem]' : 'relative'}>
      <AudioPlayer
        onVisible={() => setIsPlayerVisible(true)}
        onHidden={() => setIsPlayerVisible(false)}
      />
      <Outlet />
      <ToastContainer data-testid="toast-container" />
    </div>
  );
};
