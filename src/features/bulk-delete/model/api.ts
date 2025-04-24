import { clearSelection } from '@features/bulk-delete';
import { tracksApi } from '@shared/model/api';

const deleteTracksExtendedApi = tracksApi.injectEndpoints({
  endpoints: (build) => ({
    deleteTracksByIds: build.mutation<{ success: string[]; failed: string[] }, { ids: string[] }>({
      query: (body) => ({
        url: 'tracks/delete',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['tracks'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(clearSelection());
        } catch (e) {
          console.error('Failed to fetch tracks:', e);
        }
      },
    }),
  }),
});

export const { useDeleteTracksByIdsMutation } = deleteTracksExtendedApi;
