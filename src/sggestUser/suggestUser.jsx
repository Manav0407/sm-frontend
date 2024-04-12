import {
  Flex,
  VStack,
  Text,
  Box,
  Skeleton,
  SkeletonCircle,
  Link
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SuggestUserHeader from "./SuggestUserHeader";
import Suggest from "./Suggest";
import { getAllUsers, loadUser } from "../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import {Link as RouterLink} from "react-router-dom";
const SuggestUser = () => {
  const [avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => {
    return state.allUsers;
  });

  const { user } = useSelector((state) => {
    return state.user;
  });

  // await dispatch(loadUser());

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    dispatch(getAllUsers());
    dispatch(loadUser());
  }, [dispatch]);

  // console.log(user?.avatar?.url)
  useEffect(() => {
    setAvatar(user?.avatar?.url);
  }, [dispatch]);


  return (
    <>
      {isLoading &&
        [0, 1, 2, 3].map((_, index) => {
          return (
            <VStack px={4} gap={6}>
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"full"}
              >
                <Flex alignItems={"center"} gap={2}>
                  <SkeletonCircle size={"12"} />
                  <Skeleton>Manav0407</Skeleton>
                </Flex>
                <Skeleton>Log out</Skeleton>
              </Flex>

              {/* <SuggestUserHeader /> */}

              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"full"}
              >
                <Skeleton
                  fontSize={12}
                  fontWeight={"bold"}
                  color={"gray.500"}
                  mb={4}
                >
                  <Skeleton> Suggested for you</Skeleton>
                </Skeleton>
                <Skeleton
                  fontSize={12}
                  fontWeight={"bold"}
                  color={"blue.500"}
                  _hover={{ color: "gray.400" }}
                  cursor={"pointer"}
                >
                  <Skeleton>See All</Skeleton>
                </Skeleton>
              </Flex>
            </VStack>
          );
        })}

      {!isLoading && (
        <VStack px={4} gap={10}>
          <SuggestUserHeader avatar={avatar} />

          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
          >
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
              Suggested for you
            </Text>
            <Text
              fontSize={12}
              fontWeight={"bold"}
              color={"blue.500"}
              _hover={{ color: "gray.400" }}
              cursor={"pointer"}
            >
              See All
            </Text>
          </Flex>
          <Box
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
            maxH={500}
            overflowY={"scroll"}
            
          >
            {

              users && users?.length > 0 ? (
                users.map((item) =>
                  user?._id === item?._id ? null : (
                    <Box
                    mb={5}
                    m={4}
                    >
                    
                  <Suggest
                    key={item?._id}
                    userId={item?._id}
                    name={item?.username}
                    followers={item?.followers?.length}
                    avatar={item?.avatar?.url}
                    />
                    {/* </Link> */}
                    </Box>
                    )
                )
              ) : (
                <Text>No users found</Text>
              )
            }
          </Box>
        </VStack>
      )}
    </>
  );
};

export default SuggestUser;
