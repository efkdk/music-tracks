import { useGetGenresQuery } from '@entities/track/model/api';
import { Button } from '@shared/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select';
import { X } from 'lucide-react';

export const GenreFilter = ({
  genre,
  onChange,
}: {
  genre: string | undefined;
  onChange: (value?: string) => void;
}) => {
  const { data: genres } = useGetGenresQuery();

  if (!genres) return null;

  return (
    <Select
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
};
