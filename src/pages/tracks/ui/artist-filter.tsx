import { memo, FC } from 'react';
import { X } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { DebounceInput } from '@shared/ui/debounce-input';

type ArtistFilterProps = { artist?: string; onChange: (value?: string) => void };

export const ArtistFilter: FC<ArtistFilterProps> = memo(({ artist, onChange }) => {
  return (
    <div className="flex gap-2 items-center">
      <DebounceInput
        data-testid="filter-artist"
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
});
