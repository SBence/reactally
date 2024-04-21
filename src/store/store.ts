import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accentColorSlice from "./slices/accentColorSlice";
import countersSlice from "./slices/countersSlice";
import safeLoadJson from "../utils/safeLoadJson";
import isSavedState from "../types/predicates/isSavedState";

const savedStateJson = localStorage.getItem("state");

export const store = configureStore({
  reducer: combineReducers({
    accentColor: accentColorSlice,
    counters: countersSlice,
  }),
  preloadedState: savedStateJson
    ? safeLoadJson(savedStateJson, isSavedState)
    : undefined,
});

store.subscribe(() => {
  localStorage.setItem("state", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
