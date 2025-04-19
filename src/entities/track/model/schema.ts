import { z } from "zod";

export const TrackFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." }),
  artist: z
    .string()
    .min(2, { message: "Artist name must be at least 2 characters long." }),
  album: z
    .string()
    .optional()
    .refine((value) => !value || value.length > 2, {
      message: "Album title must be at least 2 characters long.",
    }),
  genres: z.string().array().optional(),
  coverImage: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        try {
          const url = new URL(value);
          return url.protocol === "https:";
        } catch {
          return false;
        }
      },
      { message: "Provide correct url for cover image." }
    ),
});

export type TrackFormState = z.infer<typeof TrackFormSchema>;

export interface ITrackResponse {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genres?: string[];
  slug: string;
  coverImage?: string;
  audioFile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITrack {
  title: string;
  artist: string;
  album?: string;
  genres?: string[];
  coverImage?: string;
  audioFile?: string;
}

export interface ITracksMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
