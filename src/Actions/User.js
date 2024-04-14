import axios from "axios";
import {
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  RegisterRequest,
  RegisterSuccess,
  RegisterFailure,
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFailure,
  postOfFollowingRequest,
  postOfFollowingSuccess,
  postOfFollowingFailure,
  clearErrors,
  allUsersRequest,
  allUsersSuccess,
  allUsersFailure,
  LogoutUserRequest,
  LogoutUserSuccess,
  LogoutUserFailure,
  storyOfFollowingRequest,
  storyOfFollowingSuccess,
  storyOfFollowingFailure,
  userProfileRequest,
  userProfileSuccess,
  userProfileFailure,
  myFollowingsRequest,
  myFollowingsSuccess,
  myFollowingsFailure,
} from "../Reducer/User";

import {
followUnfollowRequest,
followUnfollowSuccess,
followUnfollowFailure,
userPostRequest,
userPostSuccess,
userPostFailure,
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
deleteCommentRequest,
deleteProfileSuccess,
deleteProfileRequest,
deleteProfileFailure,

} from "../Reducer/Post";

import { myPostRequest, myPostFailure, myPostSuccess } from "../Reducer/Post";
import { setAuthenticationHeaders } from "../utils/authentication";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
// import { Toast } from "@chakra-ui/react";

// import { postOfFollowingSlice } from "../Reducer/User";

export const loginUser = (email, password) => async (dispatch) => {

  try {
    dispatch(LoginRequest());
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/login",
      {
        email,
        password, 
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
       withCredentials: true,
      }
    );
    // console.log(data)
    // console.log(data.user);
    if(data?.success === true)
    {
      localStorage.setItem("jwt",data?.token);
      setAuthenticationHeaders(data?.token);
    }
    dispatch(LoginSuccess());
    // console.log(data.message)
  } catch (error) {
    console.log(error)
    // dispatch(LoginFailure(error?.response.data.message));
    // console.log(error);
  }
};

export const LogoutUser = () => async (dispatch) => {
  try {
    console.log("action");
    dispatch(LogoutUserRequest());
    localStorage.removeItem("jwt");
    // await axios.get("https://socialmedia-banckend.onrender.com/api/v1/logout");
    dispatch(LogoutUserSuccess());
  } catch (error) {
    dispatch(LogoutUserFailure(error.response.data.message));
    // console.log(error.response.data.message);
  }
};

export const registerUser = (username,email,password,avatar) => async (dispatch) => {
  try {
    dispatch(RegisterRequest());
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/register",
      {
        username,
        email,
        password,
        avatar,
      },
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //   },
      //   withCredentials: true,
      // }
    );
    // console.log(data);
    if(data.success === true) {
      <Navigate to={"/login"}/>
    }
    dispatch(RegisterSuccess(data.message));
    // toast(data.message);
  } catch (error) {
    dispatch(RegisterFailure(error.response.data.message));
    // console.log(error)
  }
};

export const updateProfile = (username,email,avatar) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const { data } = await axios.put(
      "http://localhost:4000/api/v1/update/profile",
      {
        username,
        email,
        avatar,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    // console.log(data.user);
    dispatch(updateProfileSuccess(data.message));
  } catch (error) {
    dispatch(updateProfileFailure(error.message));
  }
};

export const updatePassword = (oldpassword,newpassword) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const { data } = await axios.put(
      "http://localhost:4000/api/v1/update/password",
      {
        oldpassword,
        newpassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
       withCredentials: true,
      }
    );
    // console.log(data.user);
    dispatch(updatePasswordSuccess(data.message));
  } catch (error) {
    dispatch(updatePasswordFailure(error.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/forgot/password",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      },
    );
    // console.log(data.user);
    dispatch(forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgotPasswordFailure(error.message));
  }
};

export const resetPassword = (id,password) => async (dispatch) => {
  try {
    // console.log(id);
    // console.log(password);
    dispatch(resetPasswordRequest());
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/password/reset/${id}`,
      {
         password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      },
    );
    // console.log(data.user);
    dispatch(resetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(resetPasswordFailure(error.message));
  }
};


export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get("http://localhost:4000/api/v1/me");
    // console.log(data.user);
    dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(LoadUserFailure(error));
    // console.log(error)
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch(postOfFollowingRequest());

    const { data } = await axios.get("http://localhost:4000/api/v1/posts");

    dispatch(postOfFollowingSuccess(data.posts));
  } catch (error) {
    dispatch(postOfFollowingFailure(error));
  }
};

export const getMyFollowings = () => async (dispatch) => {
  try {
    dispatch(myFollowingsRequest());

    const { data } = await axios.get("http://localhost:4000/api/v1/my/followings");

    dispatch(myFollowingsSuccess(data.followings));
  } catch (error) {
    dispatch(myFollowingsFailure(error.message));
  }
};

export const getFollowingStories = () => async (dispatch) => {
  try {
    // console.log("thay che")
    dispatch(storyOfFollowingRequest());
    const { data } = await axios.get("http://localhost:4000/api/v1/stories");
    // console.log(data.story);
    dispatch(storyOfFollowingSuccess(data.story));
  } catch (error) {
    dispatch(storyOfFollowingFailure(error));
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch(myPostRequest());

    const { data } = await axios.get("http://localhost:4000/api/v1/my/posts");

    dispatch(myPostSuccess(data.posts));
  } catch (error) {
    dispatch(myPostFailure(error));
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch(userPostRequest());

    const { data } = await axios.get(`http://localhost:4000/api/v1/userposts/${id}`);

    dispatch(userPostSuccess(data.posts));
  } catch (error) {
    dispatch(userPostFailure(error.message));
  }
};


export const getAllUsers = (username="") => async (dispatch) => {
  try {
    dispatch(allUsersRequest());

    const { data } = await axios.get(`http://localhost:4000/api/v1/users?username=${username}`);
    // console.log(data);
    dispatch(allUsersSuccess(data.users));
  } catch (error) {
    dispatch(allUsersFailure(error));
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch(userProfileRequest());

    const { data } = await axios.get(`http://localhost:4000/api/v1/user/${id}`);
    // console.log(data);
    dispatch(userProfileSuccess(data.user));
  } catch (error) {
    dispatch(userProfileFailure(error));
  }
};
export const followUnfollowUser = (userId) => async (dispatch) => {
  try {
    dispatch(followUnfollowRequest());

    const { data } = await axios.get(`http://localhost:4000/api/v1/follow/${userId}`);
    // console.log(data);
    dispatch(followUnfollowSuccess(data.message));
  } catch (error) {
    dispatch(followUnfollowFailure(error.message));
  }
};

export const deleteMyProfile = () => async (dispatch) => {
  try {
    // console.log("thay che")
    dispatch(deleteProfileRequest());
    const { data } = await axios.delete("http://localhost:4000/api/v1/delete/profile");
    // console.log(data.story);
    dispatch(deleteProfileSuccess(data.message));
  } catch (error) {
    dispatch(deleteProfileFailure(error));
    console.log(error.message);
  }
};
