import { ITrack } from "@entities/track/model/types";
import { ImageWithSkeleton } from "@shared/ui/image-with-skeleton";

export const TrackItem = ({ track }: { track: ITrack }) => {
  return (
    <li>
      <div className="flex gap-4 w-full">
        <ImageWithSkeleton
          src={track.coverImage || "./public/default-cover.png"}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "./public/default-cover.png";
          }}
          alt={track.title}
          className="flex-shrink-0 flex-grow-0 w-32 h-32 object-cover rounded-sm"
        />
        <div className="flex justify-between w-full">
          <div>
            <span className="text-gray-500 font-medium">
              {track.artist}
              {track.album && " | Album - " + track.album}
            </span>
            <h3 className="text-lg font-bold">{track.title}</h3>
          </div>
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
        </div>
      </div>
    </li>
  );
};
