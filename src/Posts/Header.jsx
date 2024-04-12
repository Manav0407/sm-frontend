import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser, getFollowingPosts ,getUserProfile} from "../Actions/User";
import {Link as RooterLink} from "react-router-dom";
const Header = ({ username, dayss, ownerId ,userAvatar}) => {
  const { user } = useSelector((state) => {
    return state.user;
  });


  // console.log(userAvatar)
  // console.log(ownerId);
  const [follow,setFollow] = useState(false);
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    setAvatar(user?.avatar?.url);
  }, [user]);

  const dispatch = useDispatch();

  const followHandler = async () => {
    setFollow(!follow);
    await dispatch(followUnfollowUser(ownerId));
    dispatch(getFollowingPosts());
    dispatch(getUserProfile(ownerId));
  };

  useEffect(()=>{
    if(user)
    {
      user?.followings?.forEach((item)=>{
        if(item._id===ownerId)
        {
          setFollow(true);
        }
      })
    }
    else{
      setFollow(false);
    }
  },[ownerId,user])
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} mb={4}>
      <Flex gap={4} alignItems={"center"}>
        <Link 
        as={RooterLink}
        to={`/${ownerId}`}
        >
        <Avatar h={"60px"} w={"60px"} src={userAvatar} />
        </Link>
        <Link 
        as={RooterLink}
        to={`/${ownerId}`}
        >
        <Text fontSize={"large"}>{username}</Text>
        </Link>

        <Text fontSize={"small"} color={"gray"} mt={1}>
          {dayss}{dayss > 0 ? "d":null} 
        </Text>
      </Flex>
      <Flex>
        {
          user?._id !== ownerId ? (
        <Text
          _hover={{ color: "#eee" }}
          color={"blue.500 "}
          transition={"0.2s ease-in-out"}
          cursor={"pointer"}
          onClick={followHandler}
        >
          {follow === true ? "Unfollow" : "Follow" }
        </Text>
          )
          : null
}
      </Flex>
    </Flex>
  );
};

export default Header;
