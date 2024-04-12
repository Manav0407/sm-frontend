import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch,useSelector } from "react-redux";
import { getAllUsers,loadUser } from "../../Actions/User";
import Suggest from "../../sggestUser/Suggest";
import SearchUser from "./SearchUser";
import { useEffect } from "react";
import { setAuthenticationHeaders } from "../../utils/authentication";


const Search = () => {
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setAuthenticationHeaders(localStorage.getItem("jwt"));
      // <Navigate to={"/"}></Navigate>
    }
  }, []);

  const dispatch = useDispatch()

  const [username,setUserName] = useState();

  const {user} = useSelector((state)=>{
    return state.user;
  });

  const { users, loading } = useSelector((state) => {
    return state.allUsers;
  });
  const submitHandler =(e)=>{
    e.preventDefault();
    setUserName(e.target.value);
    dispatch(getAllUsers(username));
    // dispatch(loadUser());
  }
  // console.log(username);


  return (
    <>
      <Center h={"100vh"}>
        <Flex direction={"column"} gap={4}>
          <Box
            border={"2px solid gray"}
            borderRadius={4}
            padding={9}
            h={"2xl"}
            w={["sm", "md", "lg", "xl"]}
          >
            <Heading
              className="typewriter"
              mb={"4"}
              size={"lg"}
              textAlign={"center"}
            >
              Search
            </Heading>

            <form onSubmit={submitHandler}>
              <VStack spacing={4}>
                <FormControl isInvalid={""}>
                  <Input 
                  type="search"
                  // name="search"
                  required
                  value={username}
                  onChange={submitHandler}
                  ></Input>
                </FormControl>
                <Button
                  mt={"4"}
                  type="submit"
                  colorScheme="blue"
                  size={"md"}
                  w={"full"}
                  isLoading={""}
                >
                  Search
                </Button>
              </VStack>
            </form>
            {
              users && users.length > 0 && 
              users.map((item)=>(
                <Box mt={4}>
                <SearchUser
                key={item?._id}
                userId={item?._id}
                name={item?.username}
                followers={item?.followers?.length}
                avatar={item?.avatar?.url}
                />
                </Box>
              ))
            }
          </Box>
        </Flex> 
      </Center>
    </>
  );
};

export default Search;
