import React from 'react'
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
  import { useSelector } from 'react-redux';
import Stories from 'react-insta-stories';


const MyStoryModal = ({ isOpen:isMyOpen,onOpen:onMyOpen,onClose:onMyClose,storyArr,username} ) => {

  // console.log(storyArr);
  const arr = [];
  storyArr.forEach((item) => {
    arr.push(item?.image?.url);
  });
  return (
   <>
   <Modal isOpen={isMyOpen} onClose={onMyClose}>
        <ModalOverlay />
        <ModalContent bg={"black"}>
          <ModalHeader>{username}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                {/* <Stories/> */}
                {/* <Text>dsaasd</Text> */}
                <Stories
                    stories={arr}
                    defaultInterval={2500}
                    width={["sm", "md", "lg", "xl"]}
                    height={500}
		/>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MyStoryModal;