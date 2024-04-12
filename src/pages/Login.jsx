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
import "../index.css";
import { useFormik } from "formik";
import { LoginSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Actions/User";
import { setAuthenticationHeaders } from "../utils/authentication";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setAuthenticationHeaders(localStorage.getItem("jwt"));
      // <Navigate to={"/"}></Navigate>
    }
  }, []);

  const dispatch = useDispatch();

  const { isAuthenticated, message, error, user } = useSelector((state) => {
    return state.user;
  });

  const toast = useToast();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,

      onSubmit: async (values, e) => {
        const { email, password } = values;

        dispatch(loginUser(email, password));
      },
    });

  console.log(isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

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
              Login
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
              // mb={3}
            >
              Don't have an account?{" "}
              <Link
                as={RouterLink}
                color={"blue"}
                fontWeight={"medial"}
                textDecor={"underline"}
                // _hover={{background:"teal.100"}}
                to={"/register"}
              >
                Register
              </Link>
            </Text>
            <Text>OR</Text>
            <Link
              as={RouterLink}
              color={"blue"}
              fontWeight={"medial"}
              textDecor={"underline"}
              //  _hover={{background:"teal.50"}}
              to={"/forgot/password"}
            >
              Forgot Password
            </Link>
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default Login;
