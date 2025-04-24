import { useCreateTrackMutation } from '@shared/model/api';
import { TrackForm } from '@entities/track';
import { ITrack } from '@entities/track/model/schema';

export const CreateTrackForm = ({ closeModal }: { closeModal: () => void }) => {
  const [createTrack, { isLoading }] = useCreateTrackMutation();

  const defaultValues = {
    title: '',
    album: '',
    artist: '',
    coverImage: '',
    genres: [],
  };

  async function onSubmit(values: ITrack) {
    try {
      await createTrack(values).unwrap();
      closeModal();
    } catch (e) {
      console.error('Failed to create new track', e);
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
