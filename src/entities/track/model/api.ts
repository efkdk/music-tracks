import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ITrack,
  ITrackResponse,
  ITracksMeta,
} from "@entities/track/model/schema";
import { API_URL } from "@shared/lib/constants";

export const tracksApi = createApi({
  reducerPath: "trackApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["tracks"],
  endpoints: (build) => ({
    getTracks: build.query<{ data: ITrackResponse[]; meta: ITracksMeta }, void>(
      {
        query: () => "tracks",
        providesTags: ["tracks"],
      }
    ),
    createTrack: build.mutation<ITrackResponse, void>({
      query: (body) => ({ url: "tracks", method: "POST", body }),
      invalidatesTags: ["tracks"],
    }),
    updateTrack: build.mutation<
      ITrackResponse,
      { id: string; body: Partial<ITrack> }
    >({
      query: ({ id, body }) => ({
        url: `tracks/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["tracks"],
    }),
    getGenres: build.query<string[], void>({ query: () => "genres" }),
  }),
});

export const {
  useGetTracksQuery,
  useCreateTrackMutation,
  useUpdateTrackMutation,
  useGetGenresQuery,
} = tracksApi;
