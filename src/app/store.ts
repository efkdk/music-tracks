import { configureStore } from "@reduxjs/toolkit";
import { tracksApi } from "@entities/track/model/api";

export const store = configureStore({
  reducer: {
    [tracksApi.reducerPath]: tracksApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tracksApi.middleware),
});
