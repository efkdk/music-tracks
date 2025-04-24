import { useEffect, useState, FC } from 'react';
import { Input } from '@shared/ui/input';
import { useDebounce } from '@shared/lib/hooks';

type DebounceInputProps = {
  value: string | undefined;
  onDebouncedChange: (value: string) => void;
  delay?: number;
  className?: string;
} & React.ComponentProps<'input'>;

export const DebounceInput: FC<DebounceInputProps> = ({
  value,
  onDebouncedChange,
  delay = 500,
  className,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(value || '');
  const debouncedValue = useDebounce<string>(inputValue, delay);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    onDebouncedChange(debouncedValue);
  }, [debouncedValue, onDebouncedChange]);

  return (
    <Input
      className={className || ''}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      {...props}
    />
  );
};
