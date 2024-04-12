import { Tooltip, Link, Box } from "@chakra-ui/react";

import { IoSearchOutline } from "react-icons/io5";

import { Link as RouterLink } from "react-router-dom";
export const Search = () => {
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
        <Link as={RouterLink} to={"/search"}>
          <Box
            // onClick={onOpen}
            display={"flex"}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.200" }}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <IoSearchOutline size={"30px"} />
            <Box display={{ base: "none", md: "block" }}>Search</Box>
          </Box>
        </Link>
      </Tooltip>
    </>
  );
};
