import React, { useState ,useEffect} from 'react'
import { Flex,Avatar,Text,Link,VStack, Button,Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { followUnfollowUser,loadUser,getUserProfile,getMyPosts } from '../Actions/User';
import { useParams } from 'react-router-dom';
const FollowingCard = ({name,followers,avatar,userId}) => {
    const [isFollow,setIsFollow]=useState(false);

    const {user} = useSelector((state)=>{
        return state.user;
    })

    const dispatch = useDispatch();
    const params =useParams();
    // console.log(userId);
    useEffect(() => {
        if (user?._id === params?.id) {
          // console.log(1);
          dispatch(getMyPosts());
        } else {
        //   console.log(2);
        //   dispatch(getUserPosts(params.id));
          dispatch(getUserProfile(params.id));
          dispatch(loadUser());
        }
      }, [dispatch, user?._id, params.id]);


      useEffect(()=>{
        if(user)
        {
            user?.followings.forEach((item)=>{
              if(item._id===userId)
              {
                setIsFollow(true);
              }
            })
        }
        else{
            setIsFollow(false);
        }
      },[userId,user]);

    const followHandler = async()=>{
        setIsFollow(!isFollow);
        await dispatch(followUnfollowUser(userId));
        dispatch(loadUser());
    }
  return (
    <>
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
    <Flex alignItems={"center"} gap={2}>
        <Avatar size={"md"} src={avatar} mr={4}/>
        <VStack spacing={2} alignItems={"flex-start"}>
            <Box
                fontSize={12}
                fontWeight = {"bold"}
            >
                {name}
            </Box>

            <Box
                fontSize={11}
                color={"gray.500"}
            >
                {followers} followers
            </Box>

        </VStack>

    </Flex>
    <Button alignItems={"flex-end"}
        fontSize = {13}
        bg={"transparent"}
        p={0}
        h={"max-content"}
        fontWeight={"md"}
        color={"blue.400"}
        cursor={"pointer"}
        _hover={{color : "white"}}
        onClick= {followHandler}
        >
            {isFollow ? "Unfollow" : "Follow"}

    </Button>   
</Flex>
</>
  )
}

export default FollowingCard