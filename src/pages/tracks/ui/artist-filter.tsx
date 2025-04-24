import { Input } from '@shared/ui/input';
import { useEffect, useState } from 'react';
import { useDebounce } from '../lib/hooks';

export const ArtistFilter = ({
  artist,
  onChange,
}: {
  artist: string | undefined;
  onChange: (value: string) => void;
}) => {
  const [value, setValue] = useState<string>(artist || '');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <Input
      className="w-[8rem] sm:w-[10rem]"
      placeholder="Filter by artist"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
