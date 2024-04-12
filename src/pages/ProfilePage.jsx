import { Container, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import ProfileHeader from '../components/ProfileHeader';
import ProfilePosts from '../components/ProfilePosts';
import ProfileTabs from '../components/ProfileTabs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAuthenticationHeaders } from '../utils/authentication';

const ProfilePage = () => {

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setAuthenticationHeaders(localStorage.getItem("jwt"));
      // <Navigate to={"/"}></Navigate>
    }
  }, []);

  const {user} = useSelector((state)=>{
    return state.user;
  })

  const [isAccount,setIsAccount] = useState(false);
  const params = useParams();
  // console.log(user);
  // console.log(params.id);

  
useEffect(()=>{

  if(user?._id === params.id)
  {
      setIsAccount(true);
  }
 
},[user?._id,params.id]);
  
  return (
    <>
      <Container  maxW={"container.lg"} py={5}>
        <Flex 
        py={10}
        px={4}
        pl={{base:4 , md:10}}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
        >
            <ProfileHeader/>
        </Flex>
        
        <Flex
        px={{base:2,sm:4}}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"gray.500"}
        direction={"column"}
        >
          <ProfileTabs/>
          <ProfilePosts isAccount={isAccount}/>
        </Flex>
      </Container>
    </>
  )
}

export default ProfilePage;