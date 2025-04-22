import { useState } from 'react';
import { useGetTracksQuery, useGetTracksMetaQuery } from '@entities/track/model/api';
import { CreateTrackModal } from '@features/create-track';
import { TrackItem } from '@pages/tracks';
import { Button } from '@shared/ui/button';
import { PagePagination } from '@shared/ui/page-pagination';

export const TracksPage = () => {
  const [page, setPage] = useState<number>(1);

  const { data: tracks, error, isLoading, refetch } = useGetTracksQuery({ page });
  const { data: meta } = useGetTracksMetaQuery();

  return (
    <div className="container flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Music Tracks</h1>
      <CreateTrackModal />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {tracks ? (
            <>
              <ul className="flex flex-col gap-4">
                {tracks.map((track) => (
                  <TrackItem key={track.id} track={track} />
                ))}
              </ul>
              <PagePagination
                currentPage={page}
                onPageChange={setPage}
                totalPages={meta?.totalPages}
              />
            </>
          ) : (
            <p>Looks like there are no tracks yet :(</p>
          )}
        </>
      )}
      {error && (
        <div className="flex flex-col gap-2 self-center items-center">
          <p className="text-lg font-bold">Oops! Failed to fetch tracks. Try again.</p>
          <Button className="w-fit" onClick={() => refetch()}>
            Fetch again
          </Button>
        </div>
      )}
    </div>
  );
};
