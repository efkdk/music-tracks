import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ITrack,
  ITrackResponse,
  ITracksMeta,
  ITracksParams,
} from '@entities/track/model/schema';
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

    createTrack: build.mutation<ITrackResponse, ITrack>({
      query: (body) => ({ url: 'tracks', method: 'POST', body }),
      invalidatesTags: ['tracks'],
    }),

    updateTrack: build.mutation<ITrackResponse, { id: string; body: Partial<ITrack> }>({
      query: ({ id, body }) => ({
        url: `tracks/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['tracks'],
    }),

    deleteTrackById: build.mutation<void, ITrackResponse['id']>({
      query: (id) => ({
        url: `tracks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tracks'],
    }),

    uploadAudioFile: build.mutation<ITrackResponse, { id: ITrackResponse['id']; body: FormData }>({
      query: ({ id, body }) => ({
        url: `tracks/${id}/upload`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['tracks'],
    }),

    deleteAudioFile: build.mutation<ITrackResponse, ITrackResponse['id']>({
      query: (id) => ({
        url: `tracks/${id}/file`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tracks'],
    }),

    getGenres: build.query<string[], void>({ query: () => 'genres' }),
  }),
});

export const {
  useGetTracksQuery,
  useCreateTrackMutation,
  useUpdateTrackMutation,
  useDeleteTrackByIdMutation,
  useUploadAudioFileMutation,
  useDeleteAudioFileMutation,
  useGetGenresQuery,
} = tracksApi;
