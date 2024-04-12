import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Stories from "react-insta-stories";
import ViewStoryModal from "./ViewStoryModal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFollowingStories } from "../../Actions/User";

const StoryItem = ({ username, avatar, storyArr }) => {
  // console.log(storyImage)
  const dispatch = useDispatch();

  const {user} =useSelector((state)=>{
    return state.user;
  })


  const { story } = useSelector((state) => {
    return state.storyOfFollowing;
  });
  // console.log(storyArr);
  const arr = [];

  useEffect(() => {
    dispatch(getFollowingStories());
  }, [dispatch]);
  // console.log(storyArr);

  if (storyArr.length > 0) {
    for (let i = 0; i < storyArr?.length; i++) {
        arr.push(storyArr[i]?.image?.url);
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Box
          w={"75px"}
          h={"75px"}
          borderRadius={"100%"}
          border={"3px dashed red"}
          ml={"10px"}
          overflow={"hidden"}
          cursor={"pointer"}
          onClick={onOpen}
        >
          {isOpen && storyArr.length>0 ? (
            <ViewStoryModal
              isOpen={isOpen}
              onClose={onClose}
              storyArr={arr}
              username={username}
            />
          ) : null}
          <Image src={avatar} boxSize={"100px"} />
          {/* <Image src={require(item.img)} p={0} m={0}/> */}
        </Box>
        <Text>{username}</Text>
      </Flex>
    </>
  );
};

export default StoryItem;
