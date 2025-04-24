import { ITrackResponse } from '@entities/track/model/schema';
import { tracksApi } from '@shared/model/api';

const deleteFileExtendedApi = tracksApi.injectEndpoints({
  endpoints: (build) => ({
    deleteAudioFile: build.mutation<ITrackResponse, ITrackResponse['id']>({
      query: (id) => ({
        url: `tracks/${id}/file`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tracks'],
    }),
  }),
});

export const { useDeleteAudioFileMutation } = deleteFileExtendedApi;
