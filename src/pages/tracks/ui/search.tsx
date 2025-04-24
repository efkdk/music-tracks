import { Input } from '@shared/ui/input';
import { useEffect, useState } from 'react';
import { useDebounce } from '../lib/hooks';
import { SearchIcon } from 'lucide-react';

export const Search = ({
  search,
  onChange,
}: {
  search: string | undefined;
  onChange: (value: string) => void;
}) => {
  const [value, setValue] = useState<string>(search || '');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by title, artist or album..."
        value={value}
        className="pl-9 w-full"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
