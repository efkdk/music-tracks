import { FC, memo } from 'react';
import { ArrowDown01, FunnelPlus } from 'lucide-react';
import { TracksSort, GenreFilter, ArtistFilter, Search, SelectLimit } from '@pages/tracks';
import { SortField, SortOrder } from '@pages/tracks/model/schema';

type TrackFiltersProps = {
  search?: string;
  onSearchChange: (v: string) => void;
  sort?: { by?: SortField; order?: SortOrder };
  onSortChange: (v?: { by?: SortField; order?: SortOrder }) => void;
  genre?: string;
  onGenreChange: (v?: string) => void;
  artist?: string;
  onArtistChange: (v?: string) => void;
  limit: number;
  onLimitChange: (v: number) => void;
};

export const TracksFilters: FC<TrackFiltersProps> = memo(
  ({
    search,
    onSearchChange,
    sort,
    onSortChange,
    genre,
    onGenreChange,
    artist,
    onArtistChange,
    limit,
    onLimitChange,
  }) => {
    return (
      <div className="flex flex-col gap-2">
        <Search search={search} onChange={onSearchChange} />

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <ArrowDown01 />
            <TracksSort sortOptions={sort} onChange={onSortChange} />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <FunnelPlus />
            <GenreFilter genre={genre} onChange={onGenreChange} />
            <ArtistFilter artist={artist} onChange={onArtistChange} />
          </div>

          <SelectLimit limit={limit} onChange={onLimitChange} />
        </div>
      </div>
    );
  },
);
