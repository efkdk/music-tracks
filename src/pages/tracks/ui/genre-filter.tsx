import { FC, memo } from 'react';
import { X } from 'lucide-react';
import { useGetGenresQuery } from '@entities/track/model/api';
import { Button } from '@shared/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select';

type GenreFilterProps = { genre?: string; onChange: (value?: string) => void };

export const GenreFilter: FC<GenreFilterProps> = memo(({ genre, onChange }) => {
  const { data: genres } = useGetGenresQuery();

  if (!genres) return null;

  return (
    <Select
      data-testid="filter-genre"
      value={genre || ''}
      onValueChange={(value) => {
        onChange(value);
      }}
    >
      <SelectTrigger className="w-[7rem] sm:w-[10rem]">
        <SelectValue placeholder="Filter by..." />
      </SelectTrigger>
      <SelectContent>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
      {genre && (
        <Button onClick={() => onChange()} variant="destructive" size="sm">
          <X />
        </Button>
      )}
    </Select>
  );
});
