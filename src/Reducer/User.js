import { createSlice } from "@reduxjs/toolkit";

const initialState = {

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoginRequest: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
        // message : action.payload,
        isAuthenticated: true,
      };
    },
    LoginFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
        error : action.payload,
        isAuthenticated: false,
      };
    },
    RegisterRequest: (state) => {
      state.loading = true;
    },
    RegisterSuccess: (state, action) => {
      // console.log(action.payload);
      return {
        ...state,
        loading: false,
        message: action.payload,
        isAuthenticated: true,
      };
    },
    RegisterFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    },

    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    },
    LoadUserFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: false,
      };
    },

    LogoutUserRequest: (state) => {
      state.loading = true;
    },
    LogoutUserSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    LogoutUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    },
  },
});

const postOfFollowingSlice = createSlice({
  name: "postOfFollowing",
  initialState,
  reducers: {
    postOfFollowingRequest: (state) => {
      state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    postOfFollowingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    myFollowingsRequest: (state) => {
      state.loading = true;
    },
    myFollowingsSuccess: (state, action) => {
      state.loading = false;
      state.followings = action.payload;
    },
    myFollowingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

const storyOfFollowingSlice = createSlice({
  name: "storyOfFollowing",
  initialState,
  reducers: {
    storyOfFollowingRequest: (state) => {
      state.loading = true;
    },
    storyOfFollowingSuccess: (state, action) => {
      state.loading = false;
      state.story = action.payload;
    },
    storyOfFollowingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    storyClearErrors: (state) => {
      state.error = null;
    },
  },
});

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    allUsersclearErrors: (state) => {
      state.error = null;
    },
  },
});

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    userProfileRequest: (state) => {
      state.loading = true;
    },
    userProfileSuccess: (state, action) => {
      state.loading = false;
      state.userB = action.payload;
    },
    userProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userProfileclearErrors: (state) => {
      state.error = null;
    },
  },
});
export {
  userSlice,
  postOfFollowingSlice,
  allUsersSlice,
  storyOfFollowingSlice,
  userProfileSlice,
};
export const {
  allUsersRequest,
  allUsersSuccess,
  allUsersFailure,
  allUsersclearErrors,
} = allUsersSlice.actions;
export const {
  postOfFollowingRequest,
  postOfFollowingSuccess,
  postOfFollowingFailure,
  myFollowingsRequest,
  myFollowingsSuccess,
  myFollowingsFailure,
  clearErrors,
} = postOfFollowingSlice.actions;

export const {
  storyOfFollowingRequest,
  storyOfFollowingSuccess,
  storyOfFollowingFailure,
  storyClearErrors,
} = storyOfFollowingSlice.actions;

export const {
  userProfileRequest,
  userProfileSuccess,
  userProfileFailure,
  userProfileclearErrors,
}= userProfileSlice.actions;

export const {
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  RegisterRequest,
  RegisterSuccess,
  RegisterFailure,
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFailure,
  LogoutUserRequest,
  LogoutUserSuccess,
  LogoutUserFailure,
} = userSlice.actions;
