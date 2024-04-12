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
  import { PiInstagramLogoThin } from "react-icons/pi";
  import { TiHome } from "react-icons/ti";
  import { IoSearchOutline } from "react-icons/io5";
  import { BiSolidMessageRoundedDetail } from "react-icons/bi";
  import { TbNewSection } from "react-icons/tb";
  import { IoMdNotifications } from "react-icons/io";
  import { CiLogout } from "react-icons/ci";
  import { useMediaQuery } from "@chakra-ui/react";
  import { useDisclosure } from "@chakra-ui/react";
  import {Link as RouterLink } from "react-router-dom";
  export const Home = () => {
  
    // const { isOpen, onOpen, onClose } = useDisclosure();
    
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
            to={"/"}
            display={"flex"}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.200" }}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            
            <TiHome size={"30px"} />
            <Box display={{ base: "none", md: "block" }}>Home</Box>
          </Link>
        </Tooltip>
  
        {/* <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
      </>
    );
  };
  