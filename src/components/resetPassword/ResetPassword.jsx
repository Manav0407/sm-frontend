import React from "react";
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
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ResetPasswordSchema } from "../../schemas";
import {Link as RouterLink, useParams} from "react-router-dom";
import { resetPassword } from "../../Actions/User";
import {useEffect} from "react";

const initialValues = {
    password: "",
  };

const ResetPassword = () => {
  const dispatch = useDispatch();

  const params = useParams();
  // console.log(params.id)

  const {message,error} = useSelector((state)=>{
    return state.post
  })

  console.log(message);
  console.log(error)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ResetPasswordSchema,

      onSubmit: async (values, e) => {
        const { password } = values;
        // console.log(password)
        // dispatch(loginUser(email,password));
        dispatch(resetPassword(params.id,password));
      },
    });

    const toast = useToast();
    const submitToast = (msg) => {
      toast({
        title: "",
        description: `${msg}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    };
    useEffect(() => {
      if (error) {
        submitToast("Token is invalid or expired");
        // dispatch(clearMessage());
      }
     
    }, [message,error]);
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
              Reset Password
            </Heading>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
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

export default ResetPassword;
