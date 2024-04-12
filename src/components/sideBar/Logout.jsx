import {
 
  Tooltip,
  Link,
  Box,
 
} from "@chakra-ui/react";

import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../Actions/User";
import { Navigate, Link as RouterLink } from "react-router-dom";

export const Logout = () => {

    const dispatch = useDispatch();
    const logoutHandler = () => {
      dispatch(LogoutUser());
    };

const {isAuthenicated} =useSelector((state)=>{
  return state.user;
})

// if(!isAuthenicated)
// {
//   return <Navigate to={"/login"}/>
// }
  
  return (
    <>
      <Tooltip
        hasArrow
        label={"New Post"}
        placement="right"
        ml={1}
        openDelay={300}
        display={{ base: "block", md: "none" }}
      >
         <Link
            as={RouterLink}
            // to={"/login"}
            display={"flex"}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.200" }}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            
            <CiLogout size={"30px"} onClick={logoutHandler}/>
            <Box display={{ base: "none", md: "block" }}>Logout</Box>
          </Link>
      </Tooltip>

      
    </>
  );
};
