import { useState } from 'react';
import { useGetTracksQuery } from '@shared/model/api';
import { CreateTrackModal } from '@features/create-track';
import { TrackItem, TracksSort, GenreFilter, ArtistFilter, Search } from '@pages/tracks';
import type { SortField, SortOrder } from '@pages/tracks/model/schema';
import { Button } from '@shared/ui/button';
import { PagePagination } from '@shared/ui/page-pagination';

export const TracksPage = () => {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<{ by: SortField; order: SortOrder }>();
  const [genre, setGenre] = useState<string>();
  const [artist, setArtist] = useState<string>();
  const [search, setSearch] = useState<string>();

  const {
    data: { data: tracks, meta } = {},
    error,
    isLoading,
    refetch,
  } = useGetTracksQuery({
    page,
    sort: sort?.by,
    order: sort?.order,
    genre,
    artist,
    search,
  });

  return (
    <div className="container flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Music Tracks</h1>
      <CreateTrackModal />
      <TracksSort sortOptions={sort} onChange={setSort} />
      <GenreFilter onChange={setGenre} />
      <ArtistFilter artist={artist} onChange={setArtist} />
      <Search search={search} onChange={setSearch} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {tracks && tracks.length !== 0 ? (
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
