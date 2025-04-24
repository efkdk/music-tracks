import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select';

export const SelectLimit = ({
  limit,
  onChange,
}: {
  limit: number | undefined;
  onChange: (limit: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span>Tracks per page:</span>
      <Select
        onValueChange={(value) => onChange(parseInt(value))}
        value={limit ? limit.toString() : '10'}
      >
        <SelectTrigger className="w-[5rem]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
