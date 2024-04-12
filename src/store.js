import { configureStore} from "@reduxjs/toolkit";
import {
  userSlice,
  postOfFollowingSlice,
  allUsersSlice,
  storyOfFollowingSlice,
  userProfileSlice,
} from "./Reducer/User";
import { likeSlice, myPostSlice, userPostSlice } from "./Reducer/Post";
import { storySlice } from "./Reducer/Story";


const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    postOfFollowing: postOfFollowingSlice.reducer,
    allUsers: allUsersSlice.reducer,
    post: likeSlice.reducer,
    myPost: myPostSlice.reducer,
    story: storySlice.reducer,
    storyOfFollowing: storyOfFollowingSlice.reducer,
    userPost: userPostSlice.reducer,
    userProfile: userProfileSlice.reducer,
    },
});

export default store;
