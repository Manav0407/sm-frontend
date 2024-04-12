import { Box, Grid, Skeleton, VStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, getUserPosts, getUserProfile } from "../Actions/User";
import { useParams } from "react-router-dom";

const ProfilePosts = (userId) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const dispatch = useDispatch();
  const { loading, error, posts } = useSelector((state) => {
    return state.myPost;
  });

  const { user } = useSelector((state) => {
    return state.user;
  });

  const params = useParams();

  const [myAccount, setMyAccount] = useState(false);

  useEffect(() => {
    if (user?._id === params.id) {
      setMyAccount(true);
    }
  });

  useEffect(() => {
    if (user?._id === params?.id) {
      // console.log(1);
      dispatch(getMyPosts());
    } else {
      // console.log(2);
      dispatch(getUserPosts(params.id));
      dispatch(getUserProfile(params.id));
    }
  }, [dispatch, user?._id, params.id]);

  const { posts: userPosts } = useSelector((state) => {
    return state.userPost;
  });

  // console.log(userPosts);
  // console.log("asd",myAccount);

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1,1fr)",
        md: "repeat(3,1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2, 3, 4, 5].map((_, index) => {
          return (
            <VStack key={index} alignItems={"flex-start"} gap={4}>
              <Skeleton w={"full"}>
                <Box h={"300px"}>content wrapped</Box>
              </Skeleton>
            </VStack>
          );
        })}

      {!isLoading &&
        myAccount === true &&
        (posts && posts.length > 0 ? (
          posts.map((post) => (
            // console.log(post.owner),
            <ProfilePost
              userId={post?.owner}
              key={post?._id}
              img={post?.image?.url}
              likes={post?.likes}
              like={post?.likes?.length}
              postId={post?._id}
              comment={post?.comments?.length}
              commentsArr={post?.comments}
            />
          ))
        ) : (
          <Text>No Posts Yet</Text>
        ))}

{!isLoading &&
        myAccount === false &&
        (userPosts && userPosts.length > 0 ? (
          userPosts.map((post) => (
            // console.log(post.owner),
            <ProfilePost
              userId={post?.owner}
              key={post?._id}
              img={post?.image?.url}
              likes={post?.likes}
              like={post?.likes?.length}
              postId={post?._id}
              comment={post?.comments?.length}
              commentsArr={post?.comments}
            />
          ))
        ) : (
          <Text>No Posts Yet</Text>
        ))}
    </Grid>
  );
};

export default ProfilePosts;
