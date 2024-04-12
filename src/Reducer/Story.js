import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    newStoryRequest: (state) => {
      state.loading = true;
    },
    newStorySuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    newStoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
    },
    clearMessage: (state, action) => {
      state.message = null;
    },
  },
});

export { storySlice };
export const {  
    newStoryRequest,
    newStorySuccess,
    newStoryFailure,
  } = storySlice.actions;