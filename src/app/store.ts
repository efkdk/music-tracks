import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { playerReducer } from '@features/player';
import { selectedTracksReducer } from '@features/bulk-delete';
import { tracksApi } from '@shared/model/api';

const rootReducer = combineReducers({
  [tracksApi.reducerPath]: tracksApi.reducer,
  player: playerReducer,
  selectedTracks: selectedTracksReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tracksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
