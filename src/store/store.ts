import { configureStore } from "@reduxjs/toolkit";
import accentColorSlice from "./slices/accentColorSlice";
import countersSlice from "./slices/countersSlice";

export const store = configureStore({
  reducer: {
    accentColor: accentColorSlice,
    counters: countersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
