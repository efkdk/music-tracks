import { useState } from 'react';
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

export const EditTrackModal = ({ track }: { track: ITrackResponse }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit">
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
