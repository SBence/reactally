import { configureStore } from "@reduxjs/toolkit";
import accentColorSlice from "./slices/accentColorSlice";
import countersSlice from "./slices/countersSlice";

const savedState = localStorage.getItem("state");

export const store = configureStore({
  reducer: {
    accentColor: accentColorSlice,
    counters: countersSlice,
  },
  preloadedState: savedState ? JSON.parse(savedState) : undefined,
});

store.subscribe(() =>
  localStorage.setItem("state", JSON.stringify(store.getState()))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
