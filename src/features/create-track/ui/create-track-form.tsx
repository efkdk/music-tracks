import { useCreateTrackMutation } from '@entities/track/model/api';
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
    const response = await createTrack(values);
    if ('data' in response) {
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
