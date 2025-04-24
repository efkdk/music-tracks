import { useState } from 'react';
import { FileX, Loader2 } from 'lucide-react';
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
import { useDeleteAudioFileMutation } from '@shared/model/api';

type DeleteFileModalProps = Pick<ITrackResponse, 'id' | 'title'>;

export const DeleteFileModal = ({ title, id }: DeleteFileModalProps) => {
  const [deleteAudioFileById, { isLoading }] = useDeleteAudioFileMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDelete() {
    try {
      await deleteAudioFileById(id).unwrap();
      console.log('file successfully deleted');
      setIsOpen(false);
    } catch (e) {
      console.error('Failed to delete file:', e);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-fit">
          <FileX />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Delete audio file for <span className="underline">{title}</span> track?
          </DialogTitle>
          <DialogDescription className="text-base">
            Once deleted, this audio file is gone forever. Please confirm if you're absolutely sure.
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
              <FileX className="size-4 mr-2" />
            )}
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
