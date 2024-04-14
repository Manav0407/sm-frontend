import {
  Container,
  Flex,
  VStack,
  Skeleton,
  SkeletonCircle,
  Box,
  InputGroup,
  InputRightElement,
  Text

} from "@chakra-ui/react";
import FeedPost from "./feedPost";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../Actions/User";

const Post = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {loading,posts,error} = useSelector((state)=>{
    return state.postOfFollowing;
  });


  const dispatch = useDispatch();

// const date1 = new Date();
// console.log(posts)
// // console.log(date);
// const date2 = new Date(posts[4].createdAt);
// console.log((date1.getTime() - date2.getTime())/86400000);
// console.log(date - posts[0]?.createdAt);

// const { isAuthenticated,error:postError,message} = useSelector((state) => {
//   return state.post;
// });

// // console.log(error)
// const toast = useToast();
// useEffect(()=>{
//   if(message)
//   {
//     toast({
//       title: "",
//       description:`${message}`,
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//       position: "bottom-left",
//     });
//   }
//   dispatch(clearMessage());
//   if(error)
//   {
//     toast({
//       title: "",
//       description:`${error}`,
//       status: "error",
//       duration: 3000,
//       isClosable: true,
//       position: "bottom-left",
//     });
//   }
//   dispatch(clearError());
// },[message,error])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    dispatch(getFollowingPosts());
  }, [dispatch]); 


  return (
    <>
      {isLoading &&
        [0, 1, 2, 3].map((_, index) => {
          return (
           
            <Container maxW={"container.sm"} py={10} px={2} zIndex={1}>
              <Box>
                {/* <Header username={username} avatar={avatar} /> */}
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={4}
                >
                  <Flex gap={4} alignItems={"center"}>
                    <SkeletonCircle h={"50px"} w={"50px"} />
                    <Skeleton h={5} w={84} borderRadius={8}></Skeleton>
                    <Skeleton h={5} w={84} borderRadius={8}></Skeleton>
                  </Flex>
                  <Flex>
                    <Skeleton h={5} w={84} borderRadius={8}></Skeleton>
                  </Flex>
                </Flex>

                {/* <Main img={img} /> */}
                <Box my={2} borderRadius={4} overflow={"hidden"}>
                  <Skeleton w={"full"} h={"80vh"} />
                </Box>

                {/* <Footer username={username} /> */}
                <>
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Flex gap={4} alignItems={"center"}>
                      <Box
                        // h={10}
                        // w={10}
                        alignItems={"center"}
                        cursor={"pointer"}
                      >
                          <SkeletonCircle w={7} h={7}></SkeletonCircle>
                      </Box>
                      <Box>
                        <SkeletonCircle w={7} h={7}></SkeletonCircle>
                      </Box>
                      <Box>
                        <SkeletonCircle w={7} h={7}></SkeletonCircle>
                      </Box>
                    </Flex>
                    <Flex>
                      <SkeletonCircle w={7} h={7}></SkeletonCircle>
                    </Flex>
                  </Flex>
                  <Skeleton></Skeleton>
                  <Skeleton fontSize={"sm"}>
                     <Skeleton ></Skeleton>
                  </Skeleton>
                  <Skeleton fontSize={"sm"} color={"gray"}>
                  </Skeleton>

                  <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    w={"full"}
                    gap={2}
                  >
                    <InputGroup mb={4}>
                      <Skeleton
                        variant={"flushed"}
                        placeholder="Add a Comment..."
                        fontSize={14}
                      />
                      <InputRightElement>
                        <Skeleton
                          fontSize={14}
                          color={"blue.500"}
                          fontWeight={600}
                          cursor={"pointer"}
                          bg={"transparent"}
                        >
                          
                        </Skeleton>
                      </InputRightElement>
                    </InputGroup>
                  </Flex>
                </>
              </Box>
            </Container>
          );
        })}
      {!isLoading && (
        <Container maxW={"container.sm"} py={10} px={2} zIndex={1}>

          {
            posts && posts.length > 0 ? posts.map((post,index)=>(
            <FeedPost
            key={post?._id}
            postId={post?._id}
            posts={posts}
            img={post?.image.url}
            caption={post?.caption}
            likes={post?.likes}
            comments={post?.comments?.likes}
            commentArr={post?.comments}
            username={post?.owner?.username}
            ownerId={post?.owner._id}
            createdDate={post?.createdAt}
            userAvatar = {post?.owner?.avatar?.url}
          />
            )) : <Text>No Posts yet</Text>
          }
         
          
        </Container>
          )}
    </>
  );
};

export default Post;
