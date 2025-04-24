import { useCreateTrackMutation } from '@features/create-track/model/api';
import { TrackForm } from '@entities/track';
import { ITrack } from '@entities/track/model/schema';
import { useToast } from '@shared/lib/hooks';
import { getApiErrorMessage } from '@shared/lib/helpers';

export const CreateTrackForm = ({ closeModal }: { closeModal: () => void }) => {
  const [createTrack, { isLoading }] = useCreateTrackMutation();
  const { success, error } = useToast();

  const defaultValues = {
    title: '',
    album: '',
    artist: '',
    coverImage: '',
    genres: [],
  };

  async function onSubmit(values: ITrack) {
    try {
      const response = await createTrack(values).unwrap();
      closeModal();
      success(`Created new track: ${response.title}`);
    } catch (e) {
      const errorMsg = getApiErrorMessage(e);
      error(`Failed to create new track: ${errorMsg}`);
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
