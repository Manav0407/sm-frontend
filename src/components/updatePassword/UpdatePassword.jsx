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
import { useContext, useState } from "react";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import { UpdatePasswordSchema } from "../../schemas"; 
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/User";

const initialValues = {
  oldpassword: "",
  newpassword: "",
};

const UpdatePassword = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => {
    return state.user;
  });

  const toast = useToast();

//   const submitToast = (message) => {
//     toast({
//       title: "Login",
//       description: `${message}`,
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//       position: "bottom-left",
//     });
//   };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: UpdatePasswordSchema,
    
      onSubmit: async (values, e) => {
        // console.log(values)
        const { oldpassword, newpassword } = values;
        dispatch(updatePassword(oldpassword, newpassword))
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
              size={"md"}
              textAlign={"center"}
            >
                Change Password
            </Heading>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl
                  isInvalid={errors.password && touched.password ? true : false}
                >
                  <Input
                    value={values.oldpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="oldpassword"
                    id="oldpassword"
                    type="password"
                    placeholder="old password"
                    border={"1px"}
                  ></Input>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.password && touched.password ? true : false}
                >
                  <Input
                    value={values.newpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="newpassword"
                    id="newpassword"
                    type="password"
                    placeholder="New password"
                    border={"1px"}
                  ></Input>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  mt={"4"}
                  type="submit"
                  colorScheme="blue"
                  size={"md"}
                  w={"full"}
                  isLoading={""}
                >
                  Login
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
            >
              <Link
                as={RouterLink}
                color={"blue"}
                fontWeight={"medial"}
                textDecor={"underline"}
                _hover={{ background: "teal.100" }}
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

export default UpdatePassword;
