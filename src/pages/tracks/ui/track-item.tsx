import { ITrackResponse } from '@entities/track/model/schema';
import { TrackImage } from '@entities/track';
import { EditTrackModal } from '@features/edit-track';
import { DeleteTrackModal } from '@features/delete-track';
import { UploadFileModal } from '@features/upload-file';
import { DeleteFileModal } from '@features/delete-file';
import { PlayButton } from '@features/player/ui/play-button';
import { GenreBadge } from './genre-badge';

export const TrackItem = ({ track }: { track: ITrackResponse }) => {
  return (
    <li>
      <div className="flex gap-4 w-full">
        <TrackImage className="w-24 h-24 sm:w-32 sm:h-32" {...track} />
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between w-full">
            <div>
              <span className="text-gray-500 font-medium">
                {track.artist}
                {track.album && ' | Album - ' + track.album}
              </span>
              <h3 className="text-lg font-bold">{track.title}</h3>
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
};
