import { useGetGenresQuery } from '@entities/track/model/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select';

export const GenreFilter = ({ onChange }: { onChange: (value: string) => void }) => {
  const { data: genres } = useGetGenresQuery();

  if (!genres) return null;

  return (
    <Select
      onValueChange={(value) => {
        onChange(value);
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
