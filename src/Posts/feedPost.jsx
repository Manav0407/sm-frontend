import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { followUnfollowUser } from "../Actions/User";

const FeedPost = ({
  img,
  username,
  avatar,
  postId,
  likes,
  commentArr,
  commentId,
  userId,
  posts,
  createdDate,
  ownerId,
  isAccount = false,
  userAvatar,
}) => {
  const date1 = new Date(createdDate);
  const date2 = new Date();

  let days = (date2.getTime() - date1.getTime()) / 86400000;
  days = Math.floor(days);
  let dayss;
  if (days > 0) {
    dayss = days;
  } else {
    dayss = null;
  }

  const dispatch = useDispatch();
  // console.log(userAvatar);

  return (
    <>
      <Box>
        <Header
          username={username}
          avatar={avatar}
          dayss={dayss}
          ownerId={ownerId}
          userAvatar={userAvatar}
        />
        <Main img={img} />
        <Footer
          username={username}
          postId={postId}
          likes={likes}
          commentArr={commentArr}
          commentId={commentId}
          userId={userId}
          posts={posts}
          isAccount={isAccount}
        />
      </Box>
    </>
  );
};

export default FeedPost;
