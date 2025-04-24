import { FC } from 'react';
import { TrackForm } from '@entities/track';
import { ITrack, ITrackResponse } from '@entities/track/model/schema';
import { useUpdateTrackMutation } from '@features/edit-track/model/api';
import { useToast } from '@shared/lib/hooks';
import { getApiErrorMessage } from '@shared/lib/helpers';

type EditTrackFormProps = {
  track: ITrackResponse;
  closeModal: () => void;
};

export const EditTrackForm: FC<EditTrackFormProps> = ({ track, closeModal }) => {
  const [updateTrack, { isLoading }] = useUpdateTrackMutation();
  const { success, error } = useToast();

  async function onSubmit(values: ITrack) {
    try {
      const response = await updateTrack({ id: track.id, body: values }).unwrap();
      closeModal();
      success(`Updated ${response.title} track`);
    } catch (e) {
      const errorMsg = getApiErrorMessage(e);
      error(`Failed to update ${track.title} track: ${errorMsg}`);
    }
  }

  return <TrackForm defaultValues={track} mode="edit" onSubmit={onSubmit} isLoading={isLoading} />;
};
