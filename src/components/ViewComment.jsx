import React, { useState } from "react";
import {
  Flex,
  Avatar,
  Text,
  Link,
  VStack,
  Button,
  Box,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../Actions/Post";
import { getFollowingPosts } from "../Actions/User";

export const ViewComment = ({
  comment,
  name,
  avatar,
  isAccount,
  postId,
  commentId,
  userId,
}) => {
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();
  const deleteCommentHandler = async () => {

    await dispatch(deleteComment(postId, commentId));
    dispatch(getFollowingPosts());
  };

  console.log(isAccount );
  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
          <Avatar size={"md"} src={avatar} />
          <VStack spacing={2} alignItems={"flex-start"}>
            <Box fontSize={11} fontWeight={"bold"}>
              {name}
            </Box>

            <Flex
              fontSize={12}
              // color={"gray.500"}
            >
              {comment}
             
            </Flex>
          </VStack>
        </Flex>
        {userId === user?.user?._id ? (
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
              ) : null}
      </Flex>
    </>
  );
};
