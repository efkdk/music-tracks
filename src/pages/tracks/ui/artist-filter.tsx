import { Button } from '@shared/ui/button';
import { DebounceInput } from '@shared/ui/debounce-input';
import { X } from 'lucide-react';

export const ArtistFilter = ({
  artist,
  onChange,
}: {
  artist: string | undefined;
  onChange: (value?: string) => void;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <DebounceInput
        className="w-[8rem] sm:w-[10rem]"
        placeholder="Filter by artist"
        value={artist}
        onDebouncedChange={onChange}
      />
      {artist && (
        <Button onClick={() => onChange()} variant="destructive" size="sm">
          <X />
        </Button>
      )}
    </div>
  );
};
