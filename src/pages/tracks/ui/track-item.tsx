import { memo, FC } from 'react';
import { ITrackResponse } from '@entities/track/model/schema';
import { TrackImage } from '@entities/track';
import { EditTrackModal } from '@features/edit-track';
import { DeleteTrackModal } from '@features/delete-track';
import { UploadFileModal } from '@features/upload-file';
import { DeleteFileModal } from '@features/delete-file';
import { PlayButton } from '@features/player/ui/play-button';
import { selectIsBulkDelete } from '@features/bulk-delete';
import { DeleteCheckbox } from '@pages/tracks';
import { GenreBadge } from '@pages/tracks/ui/genre-badge';
import { useAppSelector } from '@shared/lib/hooks';

type TrackItemProps = { track: ITrackResponse };

export const TrackItem: FC<TrackItemProps> = memo(({ track }) => {
  const isBulkDelete = useAppSelector(selectIsBulkDelete);

  return (
    <li data-testid={`track-item-${track.id}`} className="flex items-center gap-2">
      {isBulkDelete && (
        <DeleteCheckbox
          data-testid={`track-checkbox-${track.id}`}
          trackId={track.id}
          className="flex-grow-0 flex-shrink-0 w-4 h-4"
        />
      )}
      <div className="flex gap-4 w-full">
        <TrackImage className="w-24 h-24 sm:w-32 sm:h-32" {...track} />
        <div className="flex flex-col w-full gap-2 sm:gap-4">
          <div className="flex justify-between w-full">
            <div>
              <span
                data-testid={`track-item-${track.id}-artist`}
                className="text-gray-500 font-medium"
              >
                {track.artist}
              </span>
              {track.album && (
                <span className="text-gray-500 font-medium">{' | Album - ' + track.album}</span>
              )}
              <h3 data-testid={`track-item-${track.id}-title`} className="text-lg font-bold">
                {track.title}
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {track.genres && (
                <ul className="flex self-end gap-2 flex-wrap h-fit w-fit">
                  {track.genres.map((genre) => (
                    <li className="capitalize" key={genre}>
                      <GenreBadge>{genre}</GenreBadge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex gap-4 w-full items-center justify-end">
            {track.audioFile && <PlayButton track={track} />}

            <div className="flex gap-2 flex-grow justify-end">
              {track.audioFile && <DeleteFileModal title={track.title} id={track.id} />}
              <UploadFileModal trackId={track.id} />
              <EditTrackModal track={track} />
              <DeleteTrackModal title={track.title} id={track.id} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
});
