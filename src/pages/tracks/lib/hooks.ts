import { useState } from 'react';
import type { SortField, SortOrder } from '@pages/tracks/model/schema';

export const useTracksParams = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ by?: SortField; order?: SortOrder }>();
  const [genre, setGenre] = useState<string>();
  const [artist, setArtist] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [limit, setLimit] = useState(10);

  return {
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
  };
};
