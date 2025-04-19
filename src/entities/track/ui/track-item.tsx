import { ITrack } from "@entities/track/model/types";
import { TrackImage } from "@entities/track/";

export const TrackItem = ({ track }: { track: ITrack }) => {
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
            <ul className="flex gap-2 flex-wrap">
              {track.genres.map((genre) => (
                <li
                  className="capitalize bg-gray-400 rounded-sm h-fit w-fit p-1 text-white"
                  key={genre}
                >
                  {genre}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
};
