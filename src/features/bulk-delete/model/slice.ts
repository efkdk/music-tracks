import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedTracksState {
  isBulkDelete: boolean;
  selectedIds: string[];
}

const initialState: SelectedTracksState = {
  isBulkDelete: false,
  selectedIds: [],
};

const selectedTracksSlice = createSlice({
  name: 'selectedTracks',
  initialState,
  reducers: {
    setIsBulkDelete(state, action: PayloadAction<boolean>) {
      state.isBulkDelete = action.payload;
    },
    toggleTrack(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((trackId) => trackId !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    selectAll(state, action: PayloadAction<string[]>) {
      state.selectedIds = action.payload;
    },
    clearSelection(state) {
      state.selectedIds = [];
    },
  },
  selectors: {
    selectSelectedIds: (state) => state.selectedIds,
    selectIsBulkDelete: (state) => state.isBulkDelete,
  },
});

export const { setIsBulkDelete, toggleTrack, selectAll, clearSelection } =
  selectedTracksSlice.actions;
export const { selectSelectedIds, selectIsBulkDelete } = selectedTracksSlice.selectors;
export const selectedTracksReducer = selectedTracksSlice.reducer;
