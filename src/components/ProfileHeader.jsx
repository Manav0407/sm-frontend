import {
  Avatar,
  AvatarGroup,
  Flex,
  VStack,
  Text,
  Button,
  Link
} from "@chakra-ui/react";
import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser, deleteMyProfile, followUnfollowUser, getUserProfile, loadUser } from "../Actions/User";
import { clearErrors } from "../Reducer/User";
import { useDisclosure } from "@chakra-ui/react";
import { FollowersModal } from "./FollowersModal";
import { FollowingModal } from "./FollowingModal";
import { useParams } from "react-router-dom";
import {Link as RouterLink} from "react-router-dom";

const ProfileHeader = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { error, user } = useSelector((state) => {
    return state.user;
  });

  const [follow,setFollow] = useState(false);
  const [myProfile,setMyProfile] = useState(false);

  useEffect(()=>{
    if(user?._id === params.id)
    {
      setMyProfile(true);
      dispatch(loadUser());
    }
    else{
      // console.log("asdsdadsasd")
      dispatch(getUserProfile(params.id));
    }
  },[params.id,user?._id])

  const {userB} = useSelector((state) => {
    return state.userProfile;
  });

  const [flag,setFlag] = useState(false);

  const followHandler = async()=>{
    setFollow(!follow);
    await dispatch(followUnfollowUser(userB?._id));
    dispatch(getUserProfile(params.id));
    setFlag(!flag); 
    // dispatch(getUserProfile(user?._id));
  }

  const deleteHandler = async()=>{
    // dispatch(clearErrors());
    dispatch(deleteMyProfile());
    dispatch(LogoutUser());
  }
  useEffect(()=>{
    if(userB)
    {
      userB?.followers.forEach((item)=>{
        if(item._id===user?._id)
        {
          setFollow(true);
        }
      })
    }
    else{
      setFollow(false);
    }
  },[user?._id])
 
  const {
    isOpen: isFrOpen,
    onOpen: onFrOpen,
    onClose: onFrClose,
  } = useDisclosure();

  const {
    isOpen: isFgOpen,
    onOpen: onFgOpen,
    onClose: onFgClose,
  } = useDisclosure();

  useEffect(() => {
    if (error) {
      dispatch(clearErrors(null));
    }
  }, [dispatch]);

  // console.log(user);
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar src={myProfile ? user?.avatar?.url : userB?.avatar?.url} />
      </AvatarGroup>

      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>{myProfile ? user?.username : userB?.username}</Text>

          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
          {
                myProfile ? 
                <Link
                as={RouterLink}
                to={"/editprofile"}
                >
                <Button >Edit Profile</Button>
                </Link>
                :(<Button onClick={followHandler}>{follow ? "Unfollow" : "Follow"}</Button>)
          }
          </Flex>
        </Flex>

        <Flex alignItems={"center"} gap={{ base: 1, md: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {myProfile ? user?.posts.length : userB?.posts?.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }} onClick={onFrOpen} cursor={"pointer"}>
            <Text as={"span"} fontWeight={"bold"} mr={1} >
              {myProfile ? user?.followers.length :userB?.followers.length}
            </Text>
            {isFrOpen ? (
              <FollowersModal isOpen={isFrOpen} onClose={onFrClose} myProfile={myProfile} userB={userB}/>
            ) : null}
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }} onClick={onFgOpen} cursor={"pointer"}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {myProfile ? user?.followings.length : userB?.followings.length}
            </Text>
            Followings
          </Text>
          {
            isFgOpen ? (
              <FollowingModal isOpen={isFgOpen} onClose={onFgClose} myProfile={myProfile} userB={userB}/>
            ) : null
          }
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {myProfile ? user?.username : userB?.username}
          </Text>
        </Flex>

        {
          params.id === user?._id ?
          (
        <Button 
          onClick={deleteHandler}
        >
          Delete Profile
        </Button>
          ):null
}
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
