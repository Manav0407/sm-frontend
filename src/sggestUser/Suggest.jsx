import React, { useState, useEffect } from "react";
import {
  Flex,
  Avatar,
  Text,
  Link,
  VStack,
  Button,
  Box,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnfollowUser,
  getAllUsers,
  getFollowingPosts,
} from "../Actions/User";
import { Path } from "react-router-dom";

const Suggest = ({ followers, name, avatar, userId }) => {
  const { user } = useSelector((state) => {
    return state.user;
  });


  const dispatch = useDispatch();

  const followHandler = async () => {
    setIsFollow(!isFollow);
    await dispatch(followUnfollowUser(userId));
    dispatch(getAllUsers());
    dispatch(getFollowingPosts());
  };


  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    if (user) {
      user?.followings?.forEach((item) => {
        if (item?._id === userId) {
          setIsFollow(true);
        }
      });
    } else {
      setIsFollow(false);
    }
  }, [user?._id]);

  return (
    <>
    {
        !isFollow  && (
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Link as={RouterLink} to={`/${userId}`}>
          <Flex alignItems={"center"} gap={2}>
            <Avatar size={"md"} src={avatar} />
            <VStack spacing={2} alignItems={"flex-start"}>
              <Box fontSize={12} fontWeight={"bold"}>
                {name}
              </Box>

              <Box fontSize={11} color={"gray.500"}>
                {followers} followers
              </Box>
            </VStack>
          </Flex>
        </Link>
        <Button
          alignItems={"flex-end"}
          fontSize={13}
          bg={"transparent"}
          p={0}
          h={"max-content"}
          fontWeight={"md"}
          color={"blue.400"}
          cursor={"pointer"}
          _hover={{ color: "white" }}
          onClick={followHandler}
        >
          {isFollow ? "Unfollow" : "Follow"}
        </Button>
      </Flex>
        )
}
    </>
  );
};

export default Suggest;
