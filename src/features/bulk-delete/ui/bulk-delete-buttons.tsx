import { FC, useState } from 'react';
import { ITrackResponse } from '@entities/track/model/schema';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import {
  clearSelection,
  selectAll,
  selectSelectedIds,
  BulkDeleteModal,
} from '@features/bulk-delete';
import { Button } from '@shared/ui/button';

type BulkDeleteButtonsProps = { tracks: ITrackResponse[] };

export const BulkDeleteButtons: FC<BulkDeleteButtonsProps> = ({ tracks }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => selectSelectedIds(state));

  const handleClear = () => {
    dispatch(clearSelection());
  };

  const handleSelectAll = () => {
    const allIds = tracks.map((t) => t.id);
    dispatch(selectAll(allIds));
  };

  return (
    <div className="flex flex-col gap-2 self-end">
      <p className="text-right border-b border-gray-200 pb-2 font-semibold">Bulk Delete</p>
      <div className="flex gap-2">
        <Button data-testid="select-all" onClick={handleSelectAll}>
          Select All
        </Button>
        <Button
          data-testid="bulk-delete-button"
          variant="destructive"
          onClick={() => setIsModal(true)}
        >
          Delete Selected ({selectedIds.length})
        </Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>
      <BulkDeleteModal isOpen={isModal} setIsOpen={setIsModal} />
    </div>
  );
};
