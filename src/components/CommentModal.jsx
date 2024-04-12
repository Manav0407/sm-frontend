import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Image,
  VStack,
  Box,
  Avatar,
  Text,
  Divider,
  useToast,
} from "@chakra-ui/react";
import React, { useState,useEffect } from "react";
import Footer from "../Posts/Footer";
import { createRoutesFromChildren } from "react-router-dom";
import { ViewComment } from "./ViewComment";
import { useDispatch, useSelector } from "react-redux";


export const CommentModal = ({
  isOpen: isComOpen,
  onClose: onComClose,
  commentArr,
  posts,
  commentId,
  likes,
  postId,
  isAccount,
  userId
}) => {
  
  const [img, SetImg] = useState("");
  
  const {user} = useSelector((state)=>{
    return state.user;
  })

  useEffect(()=>{
    posts.forEach((element) => {
      if (element._id === postId) {
        SetImg(element?.image.url)
      }
    })
  },[commentId,postId]);

  const dispatch = useDispatch();

  const toast = useToast();
  const {message} = useSelector((state)=>{
    return state.post;
  })

 
  // console.log(isAccount);

  return (
    <>
      <Modal
        isOpen={isComOpen}
        onClose={onComClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
            >
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image
                  src={img}
                  alt="post"
                  h={{ base: "50vh", sm: "60vh", md: "80vh" }}
                  objectFit={"cover"}
                />
              </Box>
              <Flex
                flex={1}
                flexDirection={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={user.avatar.url} size={"sm"} name="manav" />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {user.username}
                    </Text>
                  </Flex>
                  <Box
                    _hover={{ bg: "whiteAlpha.300", color: "red" }}
                    borderRadius={4}
                    p={1}
                  >
                    {/* <MdDelete size={20} /> */}
                  </Box>
                </Flex>

                <Divider py={4} color={"gray.300"} />

                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {/* {console.log(commentArr)} */}
                  {commentArr?.map((item) => (
                    <Flex pb={4}>
                    <ViewComment
                     key={item?._id}
                      name={item?.user?.username}
                      avatar={item?.user?.avatar?.url}
                      comment={item?.comment}
                      isAccount = {isAccount}
                      userId={item?.user?._id}
                      postId={postId}
                      commentId={item?._id}
                    />
                    </Flex>
                  ))}
                </VStack>

                <Divider my={4} bg={"gray.800"} />

                <Footer isProfilePage={true} likes={likes} postId={postId}/>
                
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
