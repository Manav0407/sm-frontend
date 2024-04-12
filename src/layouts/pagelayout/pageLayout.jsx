import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SideBar from "../../components/sideBar/sideBar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const params = useParams()
  return (
    <Flex>
      {pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/editprofile" &&
      pathname !== "/update/password" &&
      pathname !== "/forgot/password" &&
      !pathname.includes("/password/reset") &&
      pathname !== "/messages"

        ? (
        <Box w={{ base: "0px", md: "240px" }} m={0} p={0}>
          <SideBar />
        </Box>
      ) : null}
      <Box
        flex={1}
        w={{ base: "calc(100% - 70px)", md: "calc(100%-240px)" }}
        m={0}
        p={0}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
