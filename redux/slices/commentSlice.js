import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
});

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export { commentReducer, commentActions };
