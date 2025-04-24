import { useMemo } from 'react';
import { HeadphoneOff } from 'lucide-react';
import { TracksFilters, TrackList, TracksHeader } from '@pages/tracks';
import { useTracksParams } from '@pages/tracks/lib/hooks';
import { Button } from '@shared/ui/button';
import { PagePagination } from '@shared/ui/page-pagination';
import { Loader } from '@shared/ui/loader';
import { useGetTracksQuery } from '@shared/model/api';

export const TracksPage = () => {
  const {
    page,
    setPage,
    sort,
    setSort,
    genre,
    setGenre,
    artist,
    setArtist,
    search,
    setSearch,
    limit,
    setLimit,
  } = useTracksParams();

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      sort: sort?.by,
      order: sort?.order,
      genre,
      artist,
      search,
    }),
    [page, limit, sort, genre, artist, search],
  );

  const {
    data: { data: tracks, meta } = {},
    error,
    isFetching,
    refetch,
  } = useGetTracksQuery(queryParams);

  return (
    <div className="container flex flex-col gap-4 py-4">
      <TracksHeader />

      <TracksFilters
        search={search}
        onSearchChange={setSearch}
        genre={genre}
        onGenreChange={setGenre}
        artist={artist}
        onArtistChange={setArtist}
        sort={sort}
        onSortChange={setSort}
        limit={limit}
        onLimitChange={setLimit}
      />

      <div className="relative">
        {isFetching && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Loader />
          </div>
        )}

        {tracks && tracks.length !== 0 && (
          <div className="flex flex-col gap-4">
            <TrackList data-loading={isFetching} tracks={tracks} />
            <PagePagination
              currentPage={page}
              onPageChange={setPage}
              totalPages={meta?.totalPages}
            />
          </div>
        )}

        {!isFetching && (!tracks || tracks.length === 0) && (
          <div className="flex flex-col items-center justify-center gap-2 py-10">
            <HeadphoneOff />
            <p className="text-lg font-semibold">Looks like there are no tracks yet :(</p>
          </div>
        )}
      </div>

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
