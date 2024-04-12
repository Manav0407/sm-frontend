import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../Actions/Post";
import { getMyPosts, getUserPosts } from "../Actions/User";
import { getFollowingPosts } from "../Actions/User";
import { useParams } from "react-router-dom";
const Comment = ({
  createdAt,
  username,
  dp,
  text,
  // isAccount,
  postId,
  commentId,
  userId,
  commentArr,
}) => {

  // console.log("p",postId);
  // console.log("c",commentId);
  // console.log("d",commentArr);

  const dispatch = useDispatch();
  const params = useParams();
  // console.log(isAccount);
  
  const {user } =useSelector((state)=>{
    return state.user;
  })

  console.log(userId === params.id)

  console.log(userId)
  console.log(params.id)
  const deleteCommentHandler = () => {
    dispatch(deleteComment(postId, commentId));
      // console.log("my post");
      // dispatch(getFollowingPosts());
      dispatch(getMyPosts());
      dispatch(getFollowingPosts());
      dispatch(getUserPosts(params.id));
  }

  return (
    <>
      <Flex
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex gap={4} direction={"row"}>
          <Avatar src={dp} name={username} size={"sm"} />
          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex gap={2}>
              <Text fontWeight={"bold"} fontSize={12}>
                {username}
              </Text>
              <Text fontSize={12}>{text}</Text>
              <Text fontSize={12} color={"gray"}>
                {/* {createdAt} */}
              </Text>
            </Flex>
          </Flex>
        </Flex>
{
  
      (userId === user?._id) && (
        <Box
          _hover={{ bg: "whiteAlpha.300", color: "red" }}
          borderRadius={4}
          p={1}
          ml={200}
          cursor={"pointer"}
          onClick={deleteCommentHandler}
        >
          <MdDelete size={20} />
        </Box>
      )
}
      </Flex>
    </>
  );
};

export default Comment;
