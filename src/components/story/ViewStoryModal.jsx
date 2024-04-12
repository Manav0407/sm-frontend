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


const ViewStoryModal = ({ isOpen,onOpen,onClose,storyArr,username} ) => {

  // console.log(story);
  return (
   <>
   <Modal isOpen={storyArr.length>0 && isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"black"}>
          <ModalHeader>{username}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                {/* <Stories/> */}
                {/* <Text>dsaasd</Text> */}
                <Stories
                    stories={storyArr}
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

export default ViewStoryModal;