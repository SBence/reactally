import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "accentColor";
const initialState = "#20c997";

export const accentColorSlice = createSlice({
  name,
  initialState,
  reducers: {
    changeTo: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { changeTo } = accentColorSlice.actions;
export default accentColorSlice.reducer;
