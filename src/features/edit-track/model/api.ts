import { ITrack, ITrackResponse } from '@entities/track/model/schema';
import { tracksApi } from '@shared/model/api';

const editTrackExtendedApi = tracksApi.injectEndpoints({
  endpoints: (build) => ({
    updateTrack: build.mutation<ITrackResponse, { id: string; body: Partial<ITrack> }>({
      query: ({ id, body }) => ({
        url: `tracks/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['tracks'],
    }),
  }),
});

export const { useUpdateTrackMutation } = editTrackExtendedApi;
