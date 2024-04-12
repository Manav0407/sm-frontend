import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const likeSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    likeRequest: (state) => {
      state.loading = true;
    },
    likeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    likeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCommentRequest: (state) => {
      state.loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCommentRequest: (state) => {
      state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newPostRequest: (state) => {
      state.loading = true;
    },
    newPostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    newPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
    },
    followUnfollowRequest: (state) => {
      state.loading = true;
    },
    followUnfollowSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    followUnfollowFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forgotPasswordRequest: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProfileRequest: (state) => {
      state.loading = true;
    },
    deleteProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProfileFailure: (state, action) => {
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

const myPostSlice = createSlice({
  name: "myPost",
  initialState,
  reducers: {
    myPostRequest: (state) => {
      state.loading = true;
    },
    myPostSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    myPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },
});

const userPostSlice = createSlice({
  name: "userPost",
  initialState,
  reducers: {
    userPostRequest: (state) => {
      state.loading = true;
    },
    userPostSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    userPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },
});

export { likeSlice, myPostSlice,userPostSlice};

export const {
  myPostRequest,
  myPostSuccess,
  myPostFailure,
  clearError: clearMyPostError,
} = myPostSlice.actions;

export const {
  likeRequest,
  likeSuccess,
  likeFailure,
  clearError,
  clearMessage,
  addCommentSuccess,
  addCommentFailure,
  addCommentRequest,
  newPostSuccess,
  newPostFailure,
  newPostRequest,
  deleteCommentSuccess,
  deleteCommentFailure,
  deleteCommentRequest,
  followUnfollowRequest,
  followUnfollowSuccess,
  followUnfollowFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFailure,
  clearError: clearFollowUnfollowError,
  clearMessage: clearFollowUnfollowMessage,
} = likeSlice.actions;

export  const {
  userPostRequest,
  userPostSuccess,
  userPostFailure,
} =userPostSlice.actions;
