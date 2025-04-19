import { useGetTracksQuery } from "@entities/track/model/api";
import { CreateTrackModal } from "@features/create-track";
import { TrackItem } from "@entities/track";
import { Button } from "@shared/ui/button";

export const TracksPage = () => {
  const { data, error, isLoading, refetch } = useGetTracksQuery();

  return (
    <div className="container flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Music Tracks</h1>
      <CreateTrackModal />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {data?.data.map((track) => (
              <TrackItem key={track.id} track={track} />
            ))}
          </ul>
        </>
      )}
      {error && (
        <div className="flex flex-col gap-2 self-center items-center">
          <p className="text-lg font-bold">
            Oops! Failed to fetch tracks. Try again.
          </p>
          <Button className="w-fit" onClick={() => refetch()}>
            Fetch again
          </Button>
        </div>
      )}
    </div>
  );
};
