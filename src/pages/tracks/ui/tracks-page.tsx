import { useState } from 'react';
import { useGetTracksQuery } from '@shared/model/api';
import { CreateTrackModal } from '@features/create-track';
import { TracksSort, GenreFilter, ArtistFilter, Search, TrackList } from '@pages/tracks';
import type { SortField, SortOrder } from '@pages/tracks/model/schema';
import { Button } from '@shared/ui/button';
import { PagePagination } from '@shared/ui/page-pagination';
import { ArrowDown01, FunnelPlus, HeadphoneOff, Music } from 'lucide-react';
import { Loader } from '@shared/ui/loader';

export const TracksPage = () => {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<{ by: SortField; order: SortOrder }>();
  const [genre, setGenre] = useState<string>();
  const [artist, setArtist] = useState<string>();
  const [search, setSearch] = useState<string>();

  const {
    data: { data: tracks, meta } = {},
    error,
    isFetching,
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
    <div className="container flex flex-col gap-4 py-4">
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <Music className="flex-shrink-0 flex-grow-0 w-[1.5rem] h-[1.5rem]" />
          <h1 className="text-3xl font-bold">Music Tracks</h1>
        </div>
        <CreateTrackModal />
      </div>

      <Search search={search} onChange={setSearch} />

      <div className="flex items-center self-end gap-2">
        <ArrowDown01 />
        <TracksSort sortOptions={sort} onChange={setSort} />
      </div>

      <div className="flex items-center self-end flex-wrap gap-2">
        <FunnelPlus />
        <GenreFilter onChange={setGenre} />
        <ArtistFilter artist={artist} onChange={setArtist} />
      </div>

      <div className="relative">
        {isFetching && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Loader />
          </div>
        )}

        {tracks && tracks.length !== 0 && (
          <div className="flex flex-col gap-4">
            <TrackList tracks={tracks} />
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
