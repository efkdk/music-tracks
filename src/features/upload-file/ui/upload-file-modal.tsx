import { useState, FC } from 'react';
import { FileAudio } from 'lucide-react';
import { ITrackResponse } from '@entities/track/model/schema';
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

type UploadFileModalProps = { trackId: ITrackResponse['id'] };

export const UploadFileModal: FC<UploadFileModalProps> = ({ trackId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <Dialog data-testid="confirm-dialog" open={isOpen} onOpenChange={setIsOpen}>
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
