import { DebounceInput } from '@shared/ui/debounce-input';

export const ArtistFilter = ({
  artist,
  onChange,
}: {
  artist: string | undefined;
  onChange: (value: string) => void;
}) => {
  return (
    <DebounceInput
      className="w-[8rem] sm:w-[10rem]"
      placeholder="Filter by artist"
      value={artist}
      onDebouncedChange={onChange}
    />
  );
};
