import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Flex,
  } from "@chakra-ui/react";
  import React, { useState, useEffect } from "react";
  import {useSelector } from "react-redux";
  import FollowingCard from "./FollowingCard";
  
  export const FollowingModal = ({ isOpen: isFgOpen, onClose: onFgClose,myProfile,userB }) => {
    // let img;
    const [img, SetImg] = useState("");
  
    const { user } = useSelector((state) => {
      return state.user;
    });
  
    // console.log(user?.followings);
  
    return (
      <>
        <Modal
          isOpen={isFgOpen}
          onClose={onFgClose}
          size={{ base: "sm", md: "lg" }}
        >
          <ModalOverlay/>
          <ModalContent bg={"black"}>
            <ModalHeader>Followings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {
              myProfile === true &&
              user?.followings?.length > 0 ? (
                user.followings.map((item) => (
                    <Flex pb={4}> 
                  <FollowingCard
                    followers={item?.followers.length}
                    key={item?._id}
                    name={item?.username}
                    avatar={item?.avatar?.url}
                    userId={item?._id}

                  />
                  </Flex>
                ))
              ) : (
                myProfile === true && <Text>No Followers</Text>
              )}
               {
              myProfile === false &&
              userB?.followings?.length > 0 ? (
                userB.followings.map((item) => (
                    <Flex pb={4}> 
                  <FollowingCard
                    followers={item?.followers.length}
                    key={item?._id}
                    name={item?.username}
                    avatar={item?.avatar?.url}
                    userId={item?._id}
                  />
                  </Flex>
                ))
              ) : (
                myProfile === false && <Text>No Followers</Text>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  