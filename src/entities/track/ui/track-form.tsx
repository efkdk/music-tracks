import { FC } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrackFormSchema, ITrack } from '@entities/track/model/schema';
import { SelectGenre } from '@entities/track/ui/select-genre';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form';
import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/button';

type TrackFormProps = {
  mode: 'create' | 'edit';
  onSubmit: (values: ITrack) => void;
  defaultValues: DefaultValues<ITrack>;
  isLoading?: boolean;
};

export const TrackForm: FC<TrackFormProps> = ({ defaultValues, onSubmit, isLoading, mode }) => {
  const form = useForm<ITrack>({
    resolver: zodResolver(TrackFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        data-testid="track-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input data-testid="input-title" placeholder="Track title..." {...field} />
              </FormControl>
              <FormMessage data-testid="error-title" />
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
                <Input data-testid="input-album" placeholder="Album title..." {...field} />
              </FormControl>
              <FormMessage data-testid="error-album" />
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
                <Input data-testid="input-artist" placeholder="Artist name..." {...field} />
              </FormControl>
              <FormMessage data-testid="error-artist" />
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
                  data-testid="input-cover-image"
                  placeholder="Provide url for cover image..."
                  {...field}
                />
              </FormControl>
              <FormMessage data-testid="error-coverImage" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="select-genre">Genres</FormLabel>
              <FormControl>
                <SelectGenre
                  data-testid="genre-selector"
                  selected={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage data-testid="error-genre" />
            </FormItem>
          )}
        />

        <Button
          data-testid="submit-button"
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-fit self-end"
        >
          {isLoading
            ? mode === 'create'
              ? 'Creating...'
              : 'Updating...'
            : mode === 'create'
              ? 'Create a new track'
              : 'Update track metadata'}
        </Button>
      </form>
    </Form>
  );
};
