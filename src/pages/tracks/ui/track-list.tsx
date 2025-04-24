import { memo, FC } from 'react';
import { ITrackResponse } from '@entities/track/model/schema';
import { TrackItem } from '@pages/tracks';

type TrackListProps = {
  tracks: ITrackResponse[];
};

export const TrackList: FC<TrackListProps> = memo(({ tracks }) => {
  return (
    <ul className="flex flex-col gap-4">
      {tracks.map((track) => (
        <TrackItem key={track.id} track={track} />
      ))}
    </ul>
  );
});
