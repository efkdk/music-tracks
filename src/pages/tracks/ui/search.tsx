import { memo, FC } from 'react';
import { SearchIcon } from 'lucide-react';
import { DebounceInput } from '@shared/ui/debounce-input';

type SearchProps = { search: string | undefined; onChange: (value: string) => void };

export const Search: FC<SearchProps> = memo(({ search, onChange }) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <DebounceInput
        data-testid="search-input"
        placeholder="Search by title, artist or album..."
        value={search}
        className="pl-9 w-full"
        onDebouncedChange={onChange}
      />
    </div>
  );
});
