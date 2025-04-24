import { memo, FC } from 'react';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select';
import type { SortField, SortOrder, TracksSortProps } from '@pages/tracks/model/schema';
import { Button } from '@shared/ui/button';

export const TracksSort: FC<TracksSortProps> = memo(({ sortOptions, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        onValueChange={(val) => {
          onChange({
            by: val as SortField,
            order: sortOptions?.order || 'asc',
          });
        }}
        value={sortOptions?.by || ''}
      >
        <SelectTrigger className="w-[7rem] sm:w-[10rem]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="artist">Artist</SelectItem>
          <SelectItem value="album">Album</SelectItem>
          <SelectItem value="createdAt">Created At</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(val) => {
          onChange({
            by: sortOptions?.by || 'title',
            order: val as SortOrder,
          });
        }}
        value={sortOptions?.order || ''}
      >
        <SelectTrigger className="w-[7rem] sm:w-[10rem]">
          <SelectValue placeholder="Sort order..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>

      {sortOptions && (
        <Button onClick={() => onChange()} variant="destructive" size="sm">
          <X />
        </Button>
      )}
    </div>
  );
});
