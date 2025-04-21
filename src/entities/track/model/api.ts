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
    getTracks: build.query<ITrackResponse[], void>({
      query: () => "tracks",
      providesTags: ["tracks"],
      transformResponse: (response: {
        data: ITrackResponse[];
        meta: ITracksMeta;
      }) => {
        return response.data;
      },
    }),
    createTrack: build.mutation<ITrackResponse, ITrack>({
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
    deleteTrackById: build.mutation<void, ITrackResponse["id"]>({
      query: (id) => ({
        url: `tracks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tracks"],
    }),
    uploadAudioFile: build.mutation<
      ITrackResponse,
      { id: ITrackResponse["id"]; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `tracks/${id}/upload`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["tracks"],
    }),
    deleteAudioFile: build.mutation<ITrackResponse, ITrackResponse["id"]>({
      query: (id) => ({
        url: `tracks/${id}/file`,
        method: "DELETE",
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
  useDeleteTrackByIdMutation,
  useUploadAudioFileMutation,
  useDeleteAudioFileMutation,
  useGetGenresQuery,
} = tracksApi;
