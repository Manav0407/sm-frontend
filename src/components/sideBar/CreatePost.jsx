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
  Textarea,
  Input,
  Flex,
  Text,
  Image,
  useToast,
  FormControl,
  Progress,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { FaRegImage } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newPost } from "../../Actions/Post";
import { IoMdDoneAll } from "react-icons/io"; 
// import "firebase/compat/storage";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { getMyPosts, loadUser } from "../../Actions/User";

export const CreatePost = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState();
  const [img, setImg] = useState();
  const [imgName, setImgName] = useState("Upload Image...");
  const [imgPercent, setImgPercent] = useState(0);
  const [input, setInput] = useState({});


  const dispatch = useDispatch();
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(e.target.files[0]);
      setImgName(file.name);
      // console.log(reader.result);
    };
  };
  const imgRef = useRef(null);


  useEffect(() => {
    img && uploadFile(img, "image");
  }, [img]);


  const uploadFile = async (file, fileType) => {
    const storage = getStorage(app);

    const folder = fileType === "image" ? "images/" : null;
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImgPercent(Math.round(progress)) ;

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          setInput((prev)=>{
            return{
              ...prev,
              [fileType]: downloadURL,
            }
          })
        
        });

      }
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("caption");
    await dispatch(newPost(caption,input.image));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  useEffect(()=>{
    if(error)
    {
      toast({
        title:error,
        status:"error",
        message:error.message,
        duration:5000,
        isClosable:true
      })

      if(message)
      {
          toast({
            title:message,
            status:"success",
            message:message.message,
            duration:5000,
            isClosable:true
          })
      }
    }
  })

  const { loading, error, message } = useSelector((state) => {
    return state.post;
  });

  // console.log(loading );
  // console.log(error );
  // console.log(message);
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
        <Box
          onClick={onOpen}
          display={"flex"}
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.200" }}
          borderRadius={6}
          p={2}
          w={"full"}
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <PlusSquareIcon h={30} w={30} />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Box>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"black"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalBody>
            <ModalCloseButton />
            <form onSubmit={submitHandler}>
              <FormControl>
                <Textarea
                  placeholder="Post Caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <Input
                  type="file"
                  hidden
                  ref={imgRef}
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Image src={input.image} mt={5} />
                <Flex>
                  <FaRegImage
                    size={25}
                    style={{ marginTop: "10px", marginLeft: "5px" }}
                    cursor={"pointer"}
                    onClick={() => imgRef.current.click()}
                  />
                  <Text mt={"10px"} ml={3}>
                    {imgName}{" "}
                  </Text>
                </Flex>
              </FormControl>
              {
                imgPercent > 0 ?(
              <Progress hasStripe value={imgPercent} size='sm' mt={4}/>
                ) : null
              }
              {
                imgPercent === 100 ?(
              <Box ml={"94%"} mt={3}>
              <IoMdDoneAll size={25} color="green"/>
              </Box>
                ) : null
}
              <Box>
              <Button type="submit" colorScheme="blue" mt={6} ml={"84%"}>
                Post
              </Button>
              </Box>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
