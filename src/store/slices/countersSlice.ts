import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Counters } from "../../types/Counters";

const DEFAULT_COUNTER = {
  name: "",
  count: 0,
};

const name = "counters";
const initialState: Counters = {};

export const countersSlice = createSlice({
  name,
  initialState,
  reducers: {
    addNew: (state) => {
      state[uuidv4()] = DEFAULT_COUNTER;
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      delete state[action.payload.id];
    },
    setName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state[action.payload.id].name = action.payload.name;
    },
    increment: (state, action: PayloadAction<{ id: string }>) => {
      state[action.payload.id].count += 1;
    },
    decrement: (state, action: PayloadAction<{ id: string }>) => {
      state[action.payload.id].count -= 1;
    },
    reset: (state, action: PayloadAction<{ id: string }>) => {
      state[action.payload.id].count = 0;
    },
    appendSet: (state, action: PayloadAction<{ counters: Counters }>) => {
      return { ...state, ...action.payload.counters };
    },
    removeAll: () => {
      return initialState;
    },
  },
});

export const {
  addNew,
  remove,
  setName,
  increment,
  decrement,
  reset,
  appendSet,
  removeAll,
} = countersSlice.actions;
export default countersSlice.reducer;
