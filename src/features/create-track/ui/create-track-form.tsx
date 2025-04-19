import { useCreateTrackMutation } from "@entities/track/model/api";
import { TrackForm } from "@entities/track";
import { TrackFormState } from "@entities/track/model/schema";

export const CreateTrackForm = ({ closeModal }: { closeModal: () => void }) => {
  const [createTrack, { isLoading }] = useCreateTrackMutation();

  const defaultValues = {
    title: "",
    album: "",
    artist: "",
    coverImage: "",
    genres: [],
  };

  async function onSubmit(values: TrackFormState) {
    const response = await createTrack(values);
    if ("data" in response) {
      closeModal();
    }
  }

  return (
    <TrackForm
      defaultValues={defaultValues}
      mode="create"
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};
