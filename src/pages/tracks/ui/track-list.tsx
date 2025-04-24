import { memo, FC } from 'react';
import { ITrackResponse } from '@entities/track/model/schema';
import { BulkDeleteButtons } from '@features/bulk-delete';
import { TrackItem } from '@pages/tracks';

type TrackListProps = {
  tracks: ITrackResponse[];
};

export const TrackList: FC<TrackListProps> = memo(({ tracks }) => {
  return (
    <div className="flex flex-col gap-4">
      <BulkDeleteButtons tracks={tracks} />
      <ul className="flex flex-col gap-4">
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </ul>
    </div>
  );
});
