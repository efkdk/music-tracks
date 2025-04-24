import { ITrack, ITrackResponse } from '@entities/track/model/schema';
import { tracksApi } from '@shared/model/api';

const createTrackExtendedApi = tracksApi.injectEndpoints({
  endpoints: (build) => ({
    createTrack: build.mutation<ITrackResponse, ITrack>({
      query: (body) => ({ url: 'tracks', method: 'POST', body }),
      invalidatesTags: ['tracks'],
    }),
  }),
});

export const { useCreateTrackMutation } = createTrackExtendedApi;
