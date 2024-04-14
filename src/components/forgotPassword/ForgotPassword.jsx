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
import { useContext, useEffect, useState } from "react";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
// import { LoginSchema } from '../schemas';
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordSchema } from "../../schemas";
import { forgotPassword } from "../../Actions/User";
import { clearError, clearMessage } from "../../Reducer/Post";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { isAuthenticated,error,message} = useSelector((state) => {
    return state.post;
  });

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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ForgotPasswordSchema,

      onSubmit: async (values, e) => {
        const { email } = values;
        // console.log(email);
        // dispatch(loginUser(email,password));
        dispatch(forgotPassword(email));
      },
    });

  return (
    <>
      <Center w={"100vw"} h={"100vh"}>
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
              Forgot Password
            </Heading>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl
                  isInvalid={errors.email && touched.email ? true : false}
                >
                  <Input
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    id="email"
                    type="text"
                    placeholder="user@gmail.com"
                    border={"1px"}
                  ></Input>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <Button
                  mt={"4"}
                  type="submit"
                  colorScheme="blue"
                  size={"md"}
                  w={"full"}
                  isLoading={""}
                >
                  Send
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
            <Text
              fontSize={"xlg"}
              align={"center"}
              // mt={"6"}
              // mb={3}
            >
              <Link
                as={RouterLink}
                color={"blue"}
                fontWeight={"medial"}
                textDecor={"underline"}
                // _hover={{background:"teal.100"}}
                to={"/"}
              >
                Go To Home
              </Link>
            </Text>
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default ForgotPassword;
