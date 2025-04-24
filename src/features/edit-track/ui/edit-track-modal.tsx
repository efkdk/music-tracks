import { useState, FC } from 'react';
import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';
import { EditTrackForm } from '@features/edit-track';
import { ITrackResponse } from '@entities/track/model/schema';
import { Edit2 } from 'lucide-react';

type EditTrackModalProps = { track: ITrackResponse };

export const EditTrackModal: FC<EditTrackModalProps> = ({ track }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = () => setIsOpen(false);

  return (
    <Dialog data-testid="confirm-dialog" open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button data-testid={`edit-track-${track.id}`} variant="outline" className="w-fit">
          <Edit2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit track metadata</DialogTitle>
          <DialogDescription>
            Change track metadata. Click update when you're done.
          </DialogDescription>
        </DialogHeader>

        <EditTrackForm track={track} closeModal={close} />
      </DialogContent>
    </Dialog>
  );
};
