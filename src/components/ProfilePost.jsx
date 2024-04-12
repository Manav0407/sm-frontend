import {
  GridItem,
  Flex,
  Text,
  Image,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Box,
  Avatar,
  Divider,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "./Comment";
import Footer from "../Posts/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts, getMyPosts } from "../Actions/User";

const ProfilePost = ({
  likes,
  img,
  like,
  comment,
  commentsArr,
  postId,
  userId,
  isAccount =true,
}) => {

  // console.log(postId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useSelector((state) => {
    return state.user;
  });

  // console.log(user);

  

  const dispatch = useDispatch();

  const theme = localStorage.getItem("chakra-ui-color-mode");
  const [colorMode, setColorMode] = useState(theme);
  useEffect(() => {
    setColorMode(localStorage.getItem("chakra-ui-color-mode"));
  }, [localStorage.getItem("chakra-ui-color-mode")]);
  return (
    <>
      {" "}
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} color={"white"} />
              <Text fontWeight={"bold"} ml={2} color={"white"}>
                {like}
                
              </Text>
            </Flex>

            <Flex>
              <FaComment size={20} color={"white"} />
              <Text fontWeight={"bold"} ml={2} color={"white"}>
                {comment}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image src={img} objectFit={"fill"} aspectRatio={1} />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            bg={() => {
              if (colorMode === "dark") {
                return "black";
              } else {
                return "white";
              }
            }}
            pb={5}
          >
            <Flex
              gap={4}
              // w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                maxW={"500px"}
              >
                <Image src={img} alt="post" objectFit={"fill"} />
              </Box>
              <Flex
                flex={1}
                flexDirection={"column"}
                px={10}
                display={{ base: "flex", md: "flex" }}
                maxW={500}
                // overflow={"hidden"}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  display={{ base: "none", md: "flex" }}
                >
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={user?.avatar?.url} size={"sm"} name={user?.username} />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {user?.username}
                    </Text>
                  </Flex>
                  <Box
                    _hover={{ bg: "whiteAlpha.300", color: "red" }}
                    borderRadius={4}
                    p={1}
                  >
                    <MdDelete size={20} />
                  </Box>
                </Flex>
                <Divider py={4} color={"gray.300"} display={{ base: "none" }} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                  py={4}
                  display={{ base: "none", md: "block" }}
                >
                  {/* {console.log(commentsArr)} */}
                  {commentsArr?.length > 0
                    ? commentsArr.map((cmt) => (
                      // console.log(cmt._id),
                        <Flex pb={4}>
                          <Comment
                            key={cmt?._id}
                            commentId={cmt?._id}
                            dp={cmt?.user?.avatar?.url}
                            username={cmt?.user?.username}
                            text={cmt?.comment}
                            userId={cmt?.user?._id}
                            postId={postId}
                            commentArr = {commentsArr}
                            isAccount={isAccount}
                          />
                        </Flex>
                      ))
                    : null}
                </VStack>
                <Divider my={4} bg={"gray.800"} display={{ base: "none" }} />
                <Footer isProfilePage={true} likes={likes} postId={postId} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
