import { Box, Container, Flex, HStack, Text,Link,useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Toggle from "../toggle";
import Stories from "../stories";
import Post from "../Posts/post";
import { distance2D } from "framer-motion";
import SuggestUser from "../sggestUser/suggestUser";
import { Link as RouterLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts } from "../Actions/User";
import { clearMessage } from "../Reducer/Post";
import { setAuthenticationHeaders } from "../utils/authentication";
const Home = () => {

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setAuthenticationHeaders(localStorage.getItem("jwt"));
      // <Navigate to={"/"}></Navigate>
    }
  }, []);

  const toast = useToast();
  const dispatch = useDispatch();
  const {message} = useSelector((state)=>{
    return state.post;
  })
  return (
    <>
      <Container maxW={"100vw"} p={0} m={0}>
        <Flex  justifyContent={"space-between"}>
          <Box w={["100vw", "100vw", "54vw", "54vw"]} py={5}>
            <Box
              W={"full"}
              h={100}
              display={"flex"}
              m={0}
              p={0}
              overflow={"scroll"}
              alignItems={"center"}
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Stories />
            </Box>
            <Post/>
          </Box>
          <Box flex={3} display={{ base: "none", lg: "block" }} minW={"25vw"} p={8}>
            <SuggestUser />
          </Box>
        </Flex>
        
      </Container>
    </>
  );
};

export default Home;
