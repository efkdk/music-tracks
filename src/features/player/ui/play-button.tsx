import { useAppDispatch } from '@app/store';
import { ITrackResponse } from '@entities/track/model/schema';
import { playTrack } from '@features/player';
import { Button } from '@shared/ui/button';

export const PlayButton = ({ track }: { track: ITrackResponse }) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      className="w-fit"
      onClick={() => {
        dispatch(playTrack(track));
      }}
    >
      Play
    </Button>
  );
};
