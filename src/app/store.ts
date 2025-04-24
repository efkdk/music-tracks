import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { playerReducer } from '@features/player';
import { tracksApi } from '@shared/model/api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  [tracksApi.reducerPath]: tracksApi.reducer,
  player: playerReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tracksApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
