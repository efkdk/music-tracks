import { FC } from 'react';
import { Checkbox } from '@shared/ui/checkbox';
import { selectSelectedIds, toggleTrack } from '@features/bulk-delete';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';

type DeleteCheckboxProps = { trackId: string; className?: string };

export const DeleteCheckbox: FC<DeleteCheckboxProps> = ({ trackId, className }) => {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => selectSelectedIds(state));

  const handleChange = () => {
    dispatch(toggleTrack(trackId));
  };

  return (
    <Checkbox
      checked={selectedIds.includes(trackId)}
      onCheckedChange={handleChange}
      className={className}
    />
  );
};
