import { useUpdateTrackMutation } from "@entities/track/model/api";
import { TrackForm } from "@entities/track";
import { ITrack, ITrackResponse } from "@entities/track/model/schema";

export const EditTrackForm = ({
  track,
  closeModal,
}: {
  track: ITrackResponse;
  closeModal: () => void;
}) => {
  const [updateTrack, { isLoading }] = useUpdateTrackMutation();

  async function onSubmit(values: ITrack) {
    const response = await updateTrack({ id: track.id, body: values });
    if ("data" in response) {
      closeModal();
    }
  }

  return (
    <TrackForm
      defaultValues={track}
      mode="edit"
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};
