import { useState } from 'react';
import { FileAudio } from 'lucide-react';
import { UploadFileForm } from '@features/upload-file';
import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';
import { ITrackResponse } from '@entities/track/model/schema';

export const UploadFileModal = ({ trackId }: { trackId: ITrackResponse['id'] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit">
          <FileAudio />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload file for track</DialogTitle>
          <DialogDescription>Supported files (audio files)</DialogDescription>
        </DialogHeader>

        <UploadFileForm trackId={trackId} closeModal={close} />
      </DialogContent>
    </Dialog>
  );
};
