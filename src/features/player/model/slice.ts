import { ITrackResponse } from '@entities/track/model/schema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
  currentTrack: ITrackResponse | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  trackList: ITrackResponse[];
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  volume: 1,
  progress: 0,
  trackList: [],
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack(state, action: PayloadAction<ITrackResponse>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    pauseTrack(state) {
      state.isPlaying = false;
    },
    resumeTrack(state) {
      state.isPlaying = true;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    setTrackList(state, action: PayloadAction<ITrackResponse[]>) {
      state.trackList = action.payload;
    },
    playNextTrack(state) {
      if (!state.currentTrack || !state.trackList.length) return;
      const currentIndex = state.trackList.findIndex((t) => t.id === state.currentTrack?.id);
      const nextTrack = state.trackList[currentIndex + 1];
      if (nextTrack) {
        state.currentTrack = nextTrack;
        state.isPlaying = true;
      }
    },
    playPrevTrack(state) {
      if (!state.currentTrack || !state.trackList.length) return;
      const currentIndex = state.trackList.findIndex((t) => t.id === state.currentTrack?.id);
      const prevTrack = state.trackList[currentIndex - 1];
      if (prevTrack) {
        state.currentTrack = prevTrack;
        state.isPlaying = true;
      }
    },
  },
  selectors: {
    isLastTrackSelector(state) {
      const currentIndex = state.trackList.findIndex((t) => t.id === state.currentTrack?.id);
      return currentIndex + 1 === state.trackList.length;
    },
    isFirstTrackSelector(state) {
      const currentIndex = state.trackList.findIndex((t) => t.id === state.currentTrack?.id);
      return currentIndex === 0;
    },
  },
});

export const {
  playTrack,
  pauseTrack,
  resumeTrack,
  setVolume,
  setProgress,
  setTrackList,
  playNextTrack,
  playPrevTrack,
} = playerSlice.actions;

export const { isLastTrackSelector, isFirstTrackSelector } = playerSlice.selectors;

export const playerReducer = playerSlice.reducer;
