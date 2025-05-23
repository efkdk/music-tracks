import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useUploadAudioFileMutation } from '@features/upload-file/model/api';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@shared/ui/form';
import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/button';
import { useToast } from '@shared/lib/hooks';
import { getApiErrorMessage } from '@shared/lib/helpers';

type UploadFileFormValues = {
  file: FileList;
};

type UploadFileFormProps = {
  trackId: string;
  closeModal: () => void;
};

// I can't receive these constants from backend, so I hardcoded them.
const ACCEPTED_AUDIO_TYPES = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav'];
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

export const UploadFileForm: FC<UploadFileFormProps> = ({ trackId, closeModal }) => {
  const [uploadFile, { isLoading }] = useUploadAudioFileMutation();
  const { success, error } = useToast();

  const form = useForm<UploadFileFormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: UploadFileFormValues) {
    const file = values.file[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadFile({
        id: trackId,
        body: formData,
      }).unwrap();

      closeModal();
      success(`Uploaded audio file for ${response.title} track`);
    } catch (e) {
      const errorMsg = getApiErrorMessage(e);
      error(`Failed to upload audio file for track: ${errorMsg}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <FormField
          name="file"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Upload an audio file.</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="w-fit hover:cursor-pointer"
                  accept={ACCEPTED_AUDIO_TYPES.join(',')}
                  {...register('file', {
                    required: 'File is required.',
                    validate: {
                      isAudio: (files) =>
                        (files[0] && ACCEPTED_AUDIO_TYPES.includes(files[0].type)) ||
                        'Allowed only .mp3, .wav, .mpeg files.',
                      maxSize: (files) =>
                        (files[0] && files[0].size <= MAX_FILE_SIZE) ||
                        `Max file size - ${MAX_FILE_SIZE_MB}MB.`,
                    },
                  })}
                />
              </FormControl>
              {errors.file && <p className="text-red-500">{errors.file.message}</p>}
            </FormItem>
          )}
        />
        <Button
          data-testid={`upload-track-${trackId}`}
          className="self-end"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </Form>
  );
};
