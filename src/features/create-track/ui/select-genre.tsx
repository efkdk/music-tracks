import { useGetGenresQuery } from "@entities/track/model/api";

export const SelectGenre = ({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (genres: string[]) => void;
}) => {
  const { data: genres = [] } = useGetGenresQuery();

  const handleAdd = (genre: string) => {
    const newGenre = genres.find((g) => g === genre);
    if (newGenre && !selected.some((g) => g === genre)) {
      onChange([...selected, genre]);
    }
  };

  const handleRemove = (genre: string) => {
    onChange(selected.filter((g) => g !== genre));
  };

  const availableGenres = genres.filter((g) => !selected.find((s) => s === g));

  return (
    <div className="flex flex-wrap gap-2">
      {selected.map((genre) => (
        <span
          key={genre}
          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
        >
          {genre}
          <button
            type="button"
            onClick={() => handleRemove(genre)}
            className="text-red-500 hover:text-red-700 font-bold ml-1"
          >
            ×
          </button>
        </span>
      ))}

      <select
        onChange={(e) => handleAdd(e.target.value)}
        value=""
        className="border px-2 py-1 rounded text-sm"
      >
        <option value="" disabled>
          + Add genre
        </option>
        {availableGenres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  );
};
