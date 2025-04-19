import { ITrackResponse } from "@entities/track/model/schema";
import { TrackImage } from "@entities/track";
import { EditTrackModal } from "@features/edit-track";

export const TrackItem = ({ track }: { track: ITrackResponse }) => {
  return (
    <li>
      <div className="flex gap-4 w-full">
        <TrackImage {...track} />
        <div className="flex justify-between w-full">
          <div>
            <span className="text-gray-500 font-medium">
              {track.artist}
              {track.album && " | Album - " + track.album}
            </span>
            <h3 className="text-lg font-bold">{track.title}</h3>
          </div>
          {track.genres && (
            <div className="flex flex-col gap-4">
              <ul className="flex gap-2 flex-wrap h-fit w-fit">
                {track.genres.map((genre) => (
                  <li
                    className="capitalize bg-gray-400 rounded-sm p-1 text-white"
                    key={genre}
                  >
                    {genre}
                  </li>
                ))}
              </ul>
              <div className="w-fit self-end">
                <EditTrackModal track={track} />
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
