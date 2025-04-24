import { ITrackResponse } from '@entities/track/model/schema';
import { tracksApi } from '@shared/model/api';

const deleteTrackExtendedApi = tracksApi.injectEndpoints({
  endpoints: (build) => ({
    deleteTrackById: build.mutation<void, ITrackResponse['id']>({
      query: (id) => ({
        url: `tracks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tracks'],
    }),
  }),
});

export const { useDeleteTrackByIdMutation } = deleteTrackExtendedApi;
