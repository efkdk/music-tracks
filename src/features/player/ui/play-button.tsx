import { useAppDispatch, useAppSelector } from '@app/store';
import { ITrackResponse } from '@entities/track/model/schema';
import { playTrack, pauseTrack } from '@features/player';
import { Button } from '@shared/ui/button';
import { Pause, Play } from 'lucide-react';

export const PlayButton = ({ track }: { track: ITrackResponse }) => {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);

  return (
    <Button
      className="rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center"
      onClick={() => {
        if (isPlaying && currentTrack?.id === track.id) {
          dispatch(pauseTrack());
        } else {
          dispatch(playTrack(track));
        }
      }}
    >
      {isPlaying && currentTrack?.id === track.id ? <Pause /> : <Play />}
    </Button>
  );
};
