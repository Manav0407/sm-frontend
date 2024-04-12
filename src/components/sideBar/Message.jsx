import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Tooltip,
    Link,
    Box,
    Button,
  
  } from "@chakra-ui/react";

  import { BiSolidMessageRoundedDetail } from "react-icons/bi";
  import {Link as RouterLink} from "react-router-dom";
 

  export const Message = () => {
  
    
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
            as ={RouterLink}
            to={"/messages"}
          >
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.200" }}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiSolidMessageRoundedDetail size={"30px"}/>
            <Box display={{ base: "none", md: "block" }}>Message</Box>
          </Box>
        </Link>
        </Tooltip>
  
      </>
    );
  };
  