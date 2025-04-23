import { Input } from '@shared/ui/input';

export const ArtistFilter = ({
  artist,
  onChange,
}: {
  artist: string | undefined;
  onChange: (value: string) => void;
}) => {
  return (
    <Input placeholder="Artist" value={artist || ''} onChange={(e) => onChange(e.target.value)} />
  );
};
