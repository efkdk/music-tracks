import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTrackFormSchema,
  CreateTrackFormState,
} from "@features/create-track";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { SelectGenre } from "./select-genre";
import { useState } from "react";

export const CreateTrackForm = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const form = useForm<CreateTrackFormState>({
    resolver: zodResolver(CreateTrackFormSchema),
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      coverImage: "",
    },
  });

  function onSubmit(values: CreateTrackFormState) {
    console.log({ ...values, genres: selectedGenres });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Track title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="album"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Album</FormLabel>
              <FormControl>
                <Input placeholder="Album title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input placeholder="Artist name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Provide url for cover image..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SelectGenre selected={selectedGenres} onChange={setSelectedGenres} />
        <Button type="submit" variant={"outline"}>
          Create a new track
        </Button>
      </form>
    </Form>
  );
};
