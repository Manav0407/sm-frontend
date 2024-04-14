import React, { useRef } from "react";
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
  useToast
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import { RegisterSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Actions/User";
import Home from "./Home";
import { FaRegImage } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase.js";

const initialValues = {
  username: "",
  gender: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const [img, setImg] = useState();
  const [imgName, setImgName] = useState("Upload Image...");
  const [imgPercent, setImgPercent] = useState(0);
  const [input, setInput] = useState({});

  
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
  const dispatch = useDispatch();
  
  useEffect(() => {
    img && uploadFile(img, "image");
  }, [img]);
  
  const uploadFile = async (file, fileType) => {
    const storage = getStorage(app);

    const folder = fileType === "image" ? "images/" : null;
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RegisterSchema,

      onSubmit: async (values, e) => {
        // console.log("thay che");
        const { username, email, password, avatar } = values;

        await dispatch(registerUser(username, email, password, input.image));
      },
    });

    const { isAuthenticated,error,message} = useSelector((state) => {
      return state.user;
    });

    // console.log(error)
    const toast = useToast();
    useEffect(()=>{
      if(message)
      {
        toast({
          title: "Register",
          description:`${message}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-left",
        });
      }
      if(error)
      {
        toast({
          title: "Register",
          description:`${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    },[message,error])

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
              Register
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
                    {/* <Box
                      h={"15vh"}
                      w={"15vh"}
                      border={"1px solid white"}
                      borderRadius={"50%"}
                      
                    > */}
                    {/* {console.log(input.image)} */}
                    {/* <Image src={input.image} h={"full"} w={"full"} objectFit={"cover"} /> */}
                    <Avatar size={"2xl"} src={input.image} />
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
                  <Box
                    w={"full"}
                    h={"full"}
                    ml={"45%"}
                    mt={5}
                  >
                    {imgPercent && imgPercent > 0 ? imgPercent===100 ? <IoMdDoneAll size={25} color="green"/> : imgPercent+"%": null}
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
                    placeholder="username"
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
                    placeholder="user@gmail.com"
                    border={"1px"}
                  ></Input>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.password && touched.password ? true : false}
                >
                  <Input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    id="password"
                    type="password"
                    placeholder="password"
                    border={"1px"}
                  ></Input>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    errors.confirm_password && touched.confirm_password
                      ? true
                      : false
                  }
                >
                  <Input
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="confirm_password"
                    id="confirm_password"
                    type="password"
                    placeholder="Confirm Password"
                    fontSize={14}
                    border={"1px"}
                  />
                  <FormErrorMessage>{errors.confirm_password}</FormErrorMessage>
                </FormControl>

                <Button
                  // onClick={isAuthenticated && submitToast}
                  mt={"4"}
                  type="submit"
                  colorScheme="blue"
                  size={"md"}
                  w={"full"}
                >
                  Register
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
            <Text>
              Have an account?{" "}
              <Link
                as={RouterLink}
                color={"blue"}
                fontWeight={1000}
                to={"/login"}
              >
                Login
              </Link>
            </Text>
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default Register;
