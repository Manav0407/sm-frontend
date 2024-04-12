import { Avatar, Flex ,Text,Link} from '@chakra-ui/react'
import {Navigate, Link as RouterLink} from 'react-router-dom';
import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../Actions/User';
const SuggestUserHeader = () => {

  const {user, isAuthenticated} = useSelector((state)=>{
    return state.user;
  })

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(LogoutUser());
  };
  
  // console.log(user);   
  // console.log(avatar);
  // console.log( isAuthenticated)
  const [avatar,setAvatar] = useState();

  useEffect(()=>{
    setAvatar(user?.avatar?.url);
  },[user])

  if(!isAuthenticated){
      return <Navigate to={"/login"}/>
  }

  return (
    <>
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
         
          
            <Flex alignItems={"center"} gap={2}>
              <Link 
              as={RouterLink}
              to={`/${user?._id}`}
              >
              <Avatar size={"lg"} src={avatar}/>
              </Link>
              <Link
              as={RouterLink}
              to={`/${user?._id}`}
              >

                <Text fontSize={18} fontWeight={'bold'}>{user?.username}</Text>
              </Link>
            </Flex>

          <Link
          as={RouterLink}
          to="/login"
          fontSize={"md"}
          color={"blue.400"}
          cursor={"pointer"}
          onClick={logoutHandler}
        > 
        
        Log out</Link>
        </Flex>
    </>
  )
}

export default SuggestUserHeader;