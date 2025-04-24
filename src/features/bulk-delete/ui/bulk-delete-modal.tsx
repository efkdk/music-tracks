import { FC } from 'react';
import { Loader2, Trash } from 'lucide-react';
import { useDeleteTracksByIdsMutation } from '@features/bulk-delete/model/api';
import { selectSelectedIds } from '@features/bulk-delete/model/slice';
import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@shared/ui/dialog';
import { useAppSelector, useToast } from '@shared/lib/hooks';
import { getApiErrorMessage } from '@shared/lib/helpers';

type BulkDeleteModalProps = { isOpen: boolean; setIsOpen: (v: boolean) => void };

export const BulkDeleteModal: FC<BulkDeleteModalProps> = ({ isOpen, setIsOpen }) => {
  const [deleteTracksByIds, { isLoading }] = useDeleteTracksByIdsMutation();
  const selectedIds = useAppSelector((state) => selectSelectedIds(state));
  const { success, warning, error } = useToast();

  async function handleDelete() {
    try {
      const response = await deleteTracksByIds({ ids: selectedIds }).unwrap();
      setIsOpen(false);
      success(`Deleted selected tracks.`);
      if (response.failed.length !== 0) {
        warning(`Failed to delete some tracks.`);
      }
    } catch (e) {
      const errorMsg = getApiErrorMessage(e);
      error(`Failed to delete tracks: ${errorMsg}`);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Delete all selected tracks?</DialogTitle>
          <DialogDescription className="text-base">
            Once deleted, these tracks are gone forever. Please confirm if you're absolutely sure.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 self-end">
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="destructive" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin size-4 mr-2" />
            ) : (
              <Trash className="size-4 mr-2" />
            )}
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
