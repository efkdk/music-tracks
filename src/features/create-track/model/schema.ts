import { z } from "zod";

export const CreateTrackFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." }),
  artist: z
    .string()
    .min(2, { message: "Artist name must be at least 2 characters long." }),
  album: z
    .string()
    .min(2, { message: "Album title must be at least 2 characters long." })
    .optional(),
  genres: z.string().array().optional(),
  coverImage: z.string().optional(),
});

export type CreateTrackFormState = z.infer<typeof CreateTrackFormSchema>;
