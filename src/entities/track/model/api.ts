import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITrack, ITracksMeta } from "@entities/track/model/types";
import { API_URL } from "@shared/lib/constants";

export const tracksApi = createApi({
  reducerPath: "trackApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["tracks"],
  endpoints: (build) => ({
    getTracks: build.query<{ data: ITrack[]; meta: ITracksMeta }, void>({
      query: () => "tracks",
      providesTags: ["tracks"],
    }),
    getGenres: build.query<string[], void>({ query: () => "genres" }),
  }),
});

export const { useGetTracksQuery, useGetGenresQuery } = tracksApi;
