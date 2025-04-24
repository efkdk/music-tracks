import { ITrackResponse } from '@entities/track/model/schema';
import { TrackItem } from '@pages/tracks';

export const TrackList = ({ tracks }: { tracks: ITrackResponse[] }) => {
  return (
    <ul className="flex flex-col gap-4">
      {tracks.map((track) => (
        <TrackItem key={track.id} track={track} />
      ))}
    </ul>
  );
};
