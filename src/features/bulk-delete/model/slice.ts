import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedTracksState {
  selectedIds: string[];
}

const initialState: SelectedTracksState = {
  selectedIds: [],
};

const selectedTracksSlice = createSlice({
  name: 'selectedTracks',
  initialState,
  reducers: {
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
  },
});

export const { toggleTrack, selectAll, clearSelection } = selectedTracksSlice.actions;
export const { selectSelectedIds } = selectedTracksSlice.selectors;
export const selectedTracksReducer = selectedTracksSlice.reducer;
