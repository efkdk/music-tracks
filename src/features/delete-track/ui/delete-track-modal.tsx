import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@shared/ui/dialog';
import { ITrackResponse } from '@entities/track/model/schema';
import { useDeleteTrackByIdMutation } from '@shared/model/api';

type DeleteTrackModalProps = Pick<ITrackResponse, 'id' | 'title'>;

export const DeleteTrackModal = ({ title, id }: DeleteTrackModalProps) => {
  const [deleteTrackById, { isLoading }] = useDeleteTrackByIdMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDelete() {
    const response = await deleteTrackById(id);
    if (!('error' in response)) {
      console.log('successfully deleted');
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-fit">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Delete <span className="underline">{title}</span> track?
          </DialogTitle>
          <DialogDescription className="text-base">
            Once deleted, this track is gone forever. Please confirm if you're absolutely sure.
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
              <Trash2 className="size-4 mr-2" />
            )}
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
