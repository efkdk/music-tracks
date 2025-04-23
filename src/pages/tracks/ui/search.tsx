import { Input } from '@shared/ui/input';
import { useEffect, useState } from 'react';
import { useDebounce } from '../lib/hooks';

export const Search = ({
  search,
  onChange,
}: {
  search: string | undefined;
  onChange: (value: string) => void;
}) => {
  const [value, setValue] = useState<string>(search || '');
  const debouncedValue = useDebounce<string>(value, 1000);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <Input
      placeholder="Search by title, artist or album..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
