import axios from "axios";
import {
  likeRequest,
  likeSuccess,
  likeFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  newPostRequest,
  newPostSuccess,
  newPostFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure,
  clearError,
  clearMessage,
} from "../Reducer/Post";

export const likePost = (postId) => async (dispatch) => {
  try {
    // console.log(postId);
    dispatch(likeRequest());
    const { data } = await axios.get(`https://socialmedia-banckend.onrender.com/api/v1/post/${postId}`);
    dispatch(likeSuccess(data.message));
  } catch (error) {
    dispatch(likeFailure(error));
  }
};

export const addComment = (postId, comment) => async (dispatch) => {
  try {
    // console.log(postId);
    dispatch(addCommentRequest());
    // console.log(postId);
    const { data } = await axios.put(
      `https://socialmedia-banckend.onrender.com/api/v1/post/comment/${postId}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    // console.log(data);
    dispatch(addCommentSuccess(data.message));
  } catch (error) {
    dispatch(addCommentFailure(error));
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    // console.log(postId);
    dispatch(deleteCommentRequest());
    // console.log(postId);
    const { data } = await axios.delete(
      `https://socialmedia-banckend.onrender.com/api/v1/post/comment/${postId}`,
      {
        data:{commentId},
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );  
    // console.log(data);
    dispatch(deleteCommentSuccess(data.message));
  } catch (error) {
    dispatch(deleteCommentFailure(error));
  }
};

export const newPost = (caption, image) => async (dispatch) => {
  try {
    // console.log("bc");
    dispatch(newPostRequest());
    const { data } = await axios.post(
      "https://socialmedia-banckend.onrender.com/api/v1/post/upload",
      {
        caption,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    dispatch(newPostSuccess(data.message));
  } catch (error) {
    dispatch(newPostFailure(error));
  }
};
