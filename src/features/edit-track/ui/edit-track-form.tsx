import { useUpdateTrackMutation } from '@shared/model/api';
import { TrackForm } from '@entities/track';
import { ITrack, ITrackResponse } from '@entities/track/model/schema';

export const EditTrackForm = ({
  track,
  closeModal,
}: {
  track: ITrackResponse;
  closeModal: () => void;
}) => {
  const [updateTrack, { isLoading }] = useUpdateTrackMutation();

  async function onSubmit(values: ITrack) {
    try {
      await updateTrack({ id: track.id, body: values }).unwrap();
      closeModal();
    } catch (e) {
      console.error('Failed to edit track:', e);
    }
  }

  return <TrackForm defaultValues={track} mode="edit" onSubmit={onSubmit} isLoading={isLoading} />;
};
