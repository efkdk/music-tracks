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
import { CreateTrackForm } from '@features/create-track';
import { Plus } from 'lucide-react';

export const CreateTrackModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">
          <Plus />
          <p>Create a new track</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new track</DialogTitle>
          <DialogDescription>
            Create your track metadata. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <CreateTrackForm closeModal={close} />
      </DialogContent>
    </Dialog>
  );
};
