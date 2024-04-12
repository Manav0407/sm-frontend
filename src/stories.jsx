import { Box, HStack, Text, Image, Flex, border } from "@chakra-ui/react";
import React from "react";
import storyImage from "./download.jpg";
import { StoryModal } from "./components/story/StoryModal";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingStories, getMyFollowings } from "./Actions/User";
import { useEffect } from "react";
import StoryItem from "./components/story/StoryItem";
import MyStoryModal from "./components/story/MyStoryModal";
const Stories = () => {
  const dispatch = useDispatch();
  const image = "E:/MERN/socialMedia/sm/src/final.png";

  const { user } = useSelector((state) => {
    return state.user;
  });
  // console.log(user);

  useEffect(() => {
    dispatch(getFollowingStories());
    dispatch(getMyFollowings());
  }, [dispatch]);

  const { users } = useSelector((state) => {
    return state.allUsers;
  });

  const {followings} =useSelector((state)=>{
    return state.postOfFollowing;
  })
  
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isMyOpen,
    onOpen: onMyOpen,
    onClose: onMyClose,
  } = useDisclosure();

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
          onClick={onMyOpen}
        >
          <Image src={user?.avatar?.url} boxSize={"100px"} />
        </Box>
        {isMyOpen && user?.story.length>0 ? (
          <MyStoryModal
            isOpen={isMyOpen}
            onClose={onMyClose}
            storyArr={user?.story}
            username={user?.username}
          />
        ) : null}
        <Text
          onClick={onAddOpen}
          cursor={"pointer"}
          _hover={{ color: "blue.300" }}
        >
          add story
        </Text>
      </Flex>
      {isAddOpen ? (
        <StoryModal isOpen={isAddOpen} onClose={onAddClose} />
      ) : null}
      {followings?.length > 0
        ? followings &&
          followings.map((item, index) =>
            // console.log(item),
            item?.story.length > 0 && item?._id !== user?._id  
            
            ? (
              <StoryItem
                key={item?._id}
                username={item?.username}
                avatar={item?.avatar?.url}
                storyArr={item?.story}
              />
            ) : null
          )
        : null}
    </>
  );
};

export default Stories;
