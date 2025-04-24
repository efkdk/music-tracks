import { ITrackResponse } from '@entities/track/model/schema';
import { tracksApi } from '@shared/model/api';

const uploadFileExtendedApi = tracksApi.injectEndpoints({
  endpoints: (build) => ({
    uploadAudioFile: build.mutation<ITrackResponse, { id: ITrackResponse['id']; body: FormData }>({
      query: ({ id, body }) => ({
        url: `tracks/${id}/upload`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['tracks'],
    }),
  }),
});

export const { useUploadAudioFileMutation } = uploadFileExtendedApi;
