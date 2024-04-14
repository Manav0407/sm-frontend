import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Text,
  Link,
  Heading,
  Input,
  VStack,
  FormErrorMessage,
  Avatar,
  Image,
  useToast,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import { UpdateProfileSchema } from "../../schemas";
import { useDispatch, useSelector } from "react-redux";
import { FaRegImage } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { IoMdDoneAll } from "react-icons/io";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProfile } from "../../Actions/User";
import { clearError, clearMessage } from "../../Reducer/Post";

const initialValues = {
  username: "",
  gender: "",
  email: "",
  password: "",
  confirm_password: "",
};

const EditProfile = () => {
  const [img, setImg] = useState();
  const [imgName, setImgName] = useState("Upload Image...");
  const [imgPercent, setImgPercent] = useState(0);
  const [input, setInput] = useState({});
  const [fileId, setFileId] = useState();

  const { user } = useSelector((state) => {
    return state.user;
  });

  const {message,error} = useSelector((state)=>{
    return state.post;
  });

  // const { isAuthenticated,error,message:useMsg} = useSelector((state) => {
  //   return state.user;
  // });

  // console.log(error)
  const toast = useToast();
  useEffect(()=>{
    if(message)
    {
      toast({
        title: "",
        description:`${message}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    dispatch(clearMessage());
    if(error)
    {
      toast({
        title: "",
        description:`${error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    dispatch(clearError());
  },[message,error])
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(e.target.files[0]);
      setImgName(file.name);
    };
  };
// console.log(message);
//   console.log(imgName);
const imgRef = useRef(null);
const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleChange,handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: UpdateProfileSchema,
      onSubmit: async (values) => {
        const { username, email} = values;

        console.log(username);
        //   await dispatch(registerUser(username, email, password, input.image));
        console.log("thay chhe")
        dispatch(updateProfile(username,email,input.image));
      },
    });



  useEffect(() => {
    img && uploadFile(img, "image");
  }, [img]);

  const uploadFile = async (file, fileType) => {
    const storage = getStorage(app);

    const folder = fileType === "image" ? "images/" : null;
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // console.log(fileName);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImgPercent(Math.round(progress));

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

          setInput((prev) => {
            return {
              ...prev,
              [fileType]: downloadURL,
            };
          });
        });
      }
    );
  };

  return (
    <>
      <Center w={"100vw"} h={"100vh"}>
        {/* <Progress size='xs' isIndeterminate /> */}
        <Flex direction={"column"} gap={4}>
          <Box
            border={"2px solid gray"}
            borderRadius={4}
            padding={9}
            maxW={"md"}
          >
            <Heading
              className="typewriter"
              mb={"4"}
              size={"lg"}
              textAlign={"center"}
            >
              Edit Profile
            </Heading>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl
                  isInvalid={errors.username && touched.username ? true : false}
                >
                  <Flex
                    w={"full"}
                    // border={"1px solid white"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Avatar
                      size={"2xl"}
                      src={input.image ? input.image : user?.avatar?.url}
                    />
                    {/* </Box> */}
                  </Flex>
                  <Input
                    type="file"
                    name="avatar"
                    hidden
                    ref={imgRef}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Box w={"full"} h={"full"} ml={"45%"} mt={5}>
                    {imgPercent && imgPercent > 0 ? (
                      imgPercent == 100 ? (
                        <IoMdDoneAll size={25} color="green" />
                      ) : (
                        imgPercent + "%"
                      )
                    ) : null}
                  </Box>
                  <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    onClick={() => imgRef.current.click()}
                  >
                    <FaRegImage
                      size={25}
                      style={{ marginTop: "10px", marginLeft: "5px" }}
                      cursor={"pointer"}
                    />
                    <Text
                      mt={"6px"}
                      p={2}
                      cursor={"pointer"}
                      _hover={{ color: "blue.300" }}
                    >
                      Profile Image
                    </Text>
                  </Flex>
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errors.username && touched.username ? true : false}
                >
                  <Input
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={"username"}
                    id="username"
                    type="text"
                    placeholder={user?.username}
                    border={"1px"}
                  ></Input>
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errors.email && touched.email ? true : false}
                >
                  <Input
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    id="email"
                    type="email"
                    placeholder={user?.email}
                    border={"1px"}
                  ></Input>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <Button
                  // onClick={isAuthenticated && submitToast}
                  mt={"4"}
                  type="submit"
                  colorScheme="blue"
                  size={"md"}
                  w={"full"}
                >
                  Update
                </Button>
              </VStack>
            </form>
          </Box>

          <Box
            border={"2px solid gray"}
            borderRadius={4}
            padding={6}
            maxW={"md"}
            textAlign={"center"}
          >
            <Flex>
              <Link
                as={RouterLink}
                color={"blue"}
                fontWeight={1000}
                to={"/"}
              >
                <Button mr={5}>
                Go To Home
                </Button>
              </Link>
              <Link
                as={RouterLink}
                color={"blue"}
                fontWeight={1000}
                to={"/update/password"}
              >
                <Button>
                Change Password
                </Button>
              </Link>
              </Flex>
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default EditProfile;
