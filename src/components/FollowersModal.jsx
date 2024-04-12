import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {useSelector ,useDispatch} from "react-redux";
import FollowerCard from "./FollowerCard";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../Actions/User";

export const FollowersModal = ({ isOpen: isFrOpen, onClose: onFrClose,myProfile,userB }) => {
  // let img;

  const { user } = useSelector((state) => {
    return state.user;
  });

  const params = useParams()

  const dispatch = useDispatch();

  return (
    <>
      <Modal
        isOpen={isFrOpen}
        onClose={onFrClose}
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay/>
        <ModalContent bg={"black"}>
          <ModalHeader>Followers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
            
            myProfile === true && 
            user?.followers?.length > 0 ? (
              user.followers.map((item) => (
                <Flex pb={4}>
                <FollowerCard
                  followers={item?.followers.length}
                  key={item?._id}
                  name={item?.username}
                  avatar={item?.avatar?.url}
                  userId={item?._id}
                  onClose={onFrClose}
                />
                </Flex>
              ))
            ) : (
              myProfile === true && <Text>No Followers</Text>
            )}
             {
            myProfile === false &&
            userB?.followers?.length >  0 ? (
              userB.followers.map((item) => (
                <Flex pb={4}>
                <FollowerCard
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
