import React, { useState ,useEffect} from 'react'
import { Flex,Avatar,Text,Link,VStack, Button,Box } from '@chakra-ui/react';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { followUnfollowUser, getMyPosts,getUserPosts,getUserProfile, loadUser } from '../Actions/User';
import { useParams } from 'react-router-dom';
const FollowerCard = ({name,followers,avatar,userId}) => {
    const [isFollow,setIsFollow]=useState(false);

    const {user} = useSelector((state)=>{
        return state.user;
    })

    // console.log(userId);
    const dispatch = useDispatch();
    const params = useParams();

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
        // dispatch(getUserProfile(userId));
        dispatch(loadUser());
    }
  return (
    <>
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
    <Flex alignItems={"center"} gap={2}>
        <Link
        as={RouterLink}
        to={`/${userId}`}
        >
        <Avatar size={"md"} src={avatar} mr={4} />
        </Link>
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

export default FollowerCard;