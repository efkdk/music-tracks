import { useGetGenresQuery } from '@entities/track/model/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select';
import { GenreFilterProps } from '@pages/tracks/model/schema';

export const GenreFilter = ({ filters, onChange }: GenreFilterProps) => {
  const { data: genres } = useGetGenresQuery();

  if (!genres) return null;

  return (
    <Select
      onValueChange={(value) => {
        onChange({ ...filters, genre: value });
      }}
    >
      <SelectTrigger className="w-[10rem]">
        <SelectValue placeholder="Filter by..." />
      </SelectTrigger>
      <SelectContent>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
