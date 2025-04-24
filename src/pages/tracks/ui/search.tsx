import { SearchIcon } from 'lucide-react';
import { DebounceInput } from '@shared/ui/debounce-input';

export const Search = ({
  search,
  onChange,
}: {
  search: string | undefined;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <DebounceInput
        placeholder="Search by title, artist or album..."
        value={search}
        className="pl-9 w-full"
        onDebouncedChange={onChange}
      />
    </div>
  );
};
