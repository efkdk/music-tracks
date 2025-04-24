import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ITrackResponse } from '@entities/track/model/schema';
import type { ITracksMeta, ITracksParams } from '@shared/model/schema';
import { API_URL } from '@shared/lib/constants';
import { setTrackList } from '@features/player';

export const tracksApi = createApi({
  reducerPath: 'trackApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['tracks'],
  endpoints: (build) => ({
    getTracks: build.query<{ data: ITrackResponse[]; meta: ITracksMeta }, ITracksParams | void>({
      query: (params) => ({
        url: 'tracks',
        params: params ?? undefined,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const tracksWithAudio = data.data.filter((track) => track.audioFile);

          dispatch(setTrackList(tracksWithAudio));
        } catch (e) {
          console.error('Failed to fetch tracks:', e);
        }
      },
      providesTags: ['tracks'],
    }),
  }),
});

export const { useGetTracksQuery } = tracksApi;
