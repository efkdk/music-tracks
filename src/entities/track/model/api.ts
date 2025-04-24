import { tracksApi } from '@shared/model/api';

const createTrackExtendedApi = tracksApi.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<string[], void>({ query: () => 'genres' }),
  }),
});

export const { useGetGenresQuery } = createTrackExtendedApi;
