import React, { useEffect,useState } from "react";
import {
  Avatar,
  Box,
  Text,
  Flex,
  Link,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { PiInstagramLogoThin } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { useMediaQuery } from "@chakra-ui/react";
import Toggle from "../../toggle";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../Actions/User";
import { CreatePost } from "./CreatePost";
import { Home } from "./Home";
import { Search } from "./Search";
import { Message } from "./Message";
import { Notification} from "./Notification";
import { Logout } from "./Logout";
import { clearError, clearMessage } from "../../Reducer/Post";
const SideBar = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(LogoutUser());
  };

  const {user} = useSelector((state)=>{
    return state.user;
  })
  // console.log(user?._id);
  const [avatar,setAvatar] = useState()

  useEffect(()=>{
    setAvatar(user?.avatar?.url)
  });

  const { loading, error, message } = useSelector((state) => {
    return state.post;
  });

  // console.log(message)
  // console.log(error)
const toast = useToast();
  useEffect(()=>{
    if(message)
      {
          toast({
            title:message,
            status:"success",
            message:message,
            duration:3000,
            position:"bottom-left",
            isClosable:true
          })
      }
      dispatch(clearMessage())
    if(error)
    {
      toast({
        title:error,
        status:"error",
        message:error,
        duration:5000,
        isClosable:true
      })
    } 
    dispatch(clearError())
  },[message,error]);



  return (
    <>
      <Box
        height={"100vh"}
        borderRight={"1px solid"}
        borderColor={"grey"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{ base: 2, md: 4 }}
        display={isLargerThan600 ? "block" : "none"}
        justifyContent={"space-between"}
      >
        <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
          <Link
            as={RouterLink}
            to={"/"}
            pl={2}
            display={{ base: "none", md: "block" }}
            cursor={"pointer"}
          >
            LOGO
          </Link>

          <Link
            as={RouterLink}
            to={"/"}
            p={2}
            display={{ base: "block", md: "none" }}
            cursor={"pointer"}
            borderRadius={6}
            _hover={{
              bg: "whiteAlpha.200",
            }}
            w={12}
          >
            <PiInstagramLogoThin size={"30px"} />
          </Link>

          <Flex direction={"column"} gap={5} cursor={"pointer"}>
            <Home/>
            <Search/>
            <CreatePost/>
            <Message/>
            <Notification/>

            <Box
            // onClick={onOpen}
            display={"flex"}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.200" }}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={{ base: "center", md: "flex-start" }}>
            <Toggle/>
          </Box>
          </Flex>
          <Link
            as={RouterLink}
            to={`/${user?._id}`}
            display={{ base: "none", md: "block" }}
            fontSize={"20px"}
          >
            <Flex
              p={"5%"}
              direction={"column"}
              w={"100%"}
              alignItems={"flex-start"}
              mt={"auto"}
              cursor={"pointer"}
            >
              <Flex
                mt={4}
                align={"center"}
                w={"100%"}
                _hover={{ bg: "whiteAlpha.200" }}
                borderRadius={6}
                p={2}
              >
                <Avatar size={"md"} src={avatar} mr={6} />

                <Flex>
                  <Box display={{ base: "none", md: "block" }}>Profile</Box>
                </Flex>
              </Flex>
            </Flex>
          </Link>

          <Link
            as={RouterLink}
            to={"/login"}
            display={"flex"}
            alignItems={"center"}
            gap={4}
            cursor={"pointer"}
            // _hover={{ bg: "whiteAlpha.200" }}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={{ base: "center", md: "flex-start" }}
            onClick={logoutHandler}
          >
            <Flex
              mt={4}
              align={"center"}
              w={"100%"}
              _hover={{ bg: "whiteAlpha.200" }}
              borderRadius={6}
              p={2}
            >
              <Flex>
                <CiLogout size={"30px"} />
                <Box display={{ base: "none", md: "block" }} ml={6}>
                  Logout
                </Box>
              </Flex>
            </Flex>
          </Link>
        </Flex>
        {/* </Flex> */}
      </Box>

      <Box
        width={"full"}
        borderTop={"1px solid"}
        borderColor={"grey"}
        position={"fixed"}
        bottom={"0%"}
        display={isLargerThan600 ? "none" : "block"}
        justifyContent={"space-between"}
        right={0}
        px={{ md: 3, sm: 2 }}
        overflow={"scroll"}
        bg={"black"}
        zIndex={100}
      >
        <Text></Text>
        <Flex
          direction={"row"}
          gap={{ md: 15, sm: 20}}
          w={"full"}
          height={"full"}
          justifyContent={"space-between"}
        >
          <Flex
            direction={"row"}
            gap={{ md: 14, sm: 15 }}
            cursor={"pointer"}
            justifyContent={"space-between"}
            w={"full"}
          >
            <Home/>
            <Search/>
            <CreatePost/>
            {/* <Message/> */}
            <Link
              as={RouterLink}
              to={`/${user?._id}`}
            >
              
            <Avatar size={"sm"} src={avatar} mt={1.5} />
            </Link>
            {/* <Notification/> */}
            <Logout/>
            
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
export default SideBar;
