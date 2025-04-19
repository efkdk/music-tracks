import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { CreateTrackForm } from "./create-track-form";

export const CreateTrackModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Create a track</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new track</DialogTitle>
          <DialogDescription>
            Create your track metadata. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <CreateTrackForm />
      </DialogContent>
    </Dialog>
  );
};
