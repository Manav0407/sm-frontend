import {
  Flex,
  Icon,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaComment, FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { addComment, likePost } from "../Actions/Post";
import { getFollowingPosts, getMyPosts, getUserPosts } from "../Actions/User";
import { LikeModal } from "../components/LikeModal";
import { CommentModal } from "../components/CommentModal";
import { useParams } from "react-router-dom";

const Footer = ({
  username,
  isProfilePage,
  postId,
  likes,
  commentArr,
  commentId,
  posts,
  userId,
  isAccount = false,
}) => {
  const [like, setLike] = useState(false);
  const [commentVal, setCommentVal] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return state.user;
  });
  const params = useParams();
  const handleLike = async () => {
    console.log("thay che")
    setLike(!like);
    await dispatch(likePost(postId));

    if (isAccount) {
      console.log("my post");
      // dispatch(getFollowingPosts());

    } else {
      dispatch(getFollowingPosts());
      dispatch(getMyPosts());
      dispatch(getUserPosts(params.id))

    }
    // console.log(postId);
  };

  const handleComment = async (e) => {
    await dispatch(addComment(postId, commentVal));
    dispatch(getFollowingPosts());
    dispatch(getMyPosts());
    dispatch(getUserPosts(params.id))

  };

  useEffect(() => {
    likes?.forEach((element) => {
      if (element?._id === user?._id) {
        setLike(true);
      }
    });
  }, [likes, user?._id]);

  const {
    isOpen: isLikeOpen,
    onOpen: onLikeOpen,
    onClose: onLikeClose,
  } = useDisclosure();
  const {
    isOpen: isComOpen,
    onOpen: onComOpen,
    onClose: onComClose,
  } = useDisclosure();

  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"} mt={"auto"}>
        <Flex gap={4} alignItems={"center"}>
          <Box
            onClick={handleLike}
            // h={10}
            // w={10}
            alignItems={"center"}
            cursor={"pointer"}
          >
            {like ? (
              <Icon as={FaHeart} color={"red"} w={8} h={8}></Icon>
            ) : (
              <Icon as={CiHeart} w={8} h={8}></Icon>
            )}
          </Box>
          <Box
          onClick={onComOpen}
          cursor={"pointer"}
          >
            <Icon as={FaComment} w={7} h={7}></Icon>
          </Box>
          <Box>
            <Icon as={FaShare} w={7} h={7}></Icon>
          </Box>
        </Flex>
        <Flex>
          <Icon as={CiBookmark} w={7} h={7}></Icon>
        </Flex>
      </Flex>
      <Text onClick={onLikeOpen} cursor={"pointer"} >
        {likes?.length}{" "}likes
      </Text>
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"}>
            {commentArr[0]?.user?.username}{" "}
            <Text as={"span"}>{commentArr[0]?.comment}</Text>
          </Text>
          <Text
            onClick={onComOpen}
            cursor={"pointer"}
            fontSize={"sm"}
            color={"gray"}
          >
            view all {commentArr?.length} comments.
          </Text>
          {/* { console.log("com",commentArr)} */}
          {isLikeOpen ? (
            <LikeModal
              isOpen={isLikeOpen}
              onClose={onLikeClose}
              likes={likes}
            />
          ) : null}
          {isComOpen ? (
            <CommentModal
              isOpen={isComOpen}
              onClose={onComClose}
              commentArr={commentArr}
              posts={posts}
              commentId={commentId}
              likes={likes}
              postId={postId}
              isAccount={isAccount}
              userId={userId}
            />
          ) : null}
        </>
      )}

      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"full"}
        gap={2}
      >
        <InputGroup mb={4}>
          <Input
            variant={"flushed"}
            placeholder="Add a Comment..."
            fontSize={14}
            value={commentVal}
            onChange={(e) => setCommentVal(e.target.value)}
          />
          <InputRightElement>
            <Button
              fontSize={14}
              color={"blue.500"}
              fontWeight={600}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
              onClick={()=>{
                handleComment();
                setCommentVal("")}}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </>
  );
};

export default Footer;
