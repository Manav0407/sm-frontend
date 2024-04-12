// import {
//   Avatar,
//   AvatarGroup,
//   Flex,
//   VStack,
//   Text,
//   Button,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadUser } from "../Actions/User";
// import { clearErrors } from "../Reducer/User";
// import { useDisclosure } from "@chakra-ui/react";
// import { FollowersModal } from "./FollowersModal";
// import { FollowingModal } from "./FollowingModal";
// import { useParams } from "react-router-dom";

// const Header = () => {
//   const dispatch = useDispatch();
// const params = useParams();
//   const { error, user } = useSelector((state) => {
//     return state.user;
//   });

//   const [follow,setFollow] = useState(false);
//   const [myProfile,setMyProfile] = useState(false);

//   const followHandler = ()=>{
//     setFollow(!follow);
//   }

//   useEffect(()=>{
//     if(user._id === params.id)
//     {
//       setMyProfile(true);
//     }
//   },[params.id,user._id])

//   const {
//     isOpen: isFrOpen,
//     onOpen: onFrOpen,
//     onClose: onFrClose,
//   } = useDisclosure();

//   const {
//     isOpen: isFgOpen,
//     onOpen: onFgOpen,
//     onClose: onFgClose,
//   } = useDisclosure();

//   useEffect(() => {
//     if (error) {
//       dispatch(clearErrors(null));
//     }
//   }, [dispatch]);

//   // console.log(user);
//   return (
//     <Flex
//       gap={{ base: 4, sm: 10 }}
//       py={10}
//       direction={{ base: "column", sm: "row" }}
//     >
//       <AvatarGroup
//         size={{ base: "xl", md: "2xl" }}
//         justifySelf={"center"}
//         alignSelf={"flex-start"}
//         mx={"auto"}
//       >
//         <Avatar src={user?.avatar?.url} />
//       </AvatarGroup>

//       <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
//         <Flex
//           gap={4}
//           direction={{ base: "column", sm: "row" }}
//           justifyContent={{ base: "center", sm: "flex-start" }}
//           alignItems={"center"}
//           w={"full"}
//         >
//           <Text fontSize={{ base: "sm", md: "lg" }}>{user?.username}</Text>

//           <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
//             {
//                 myProfile ? 
//                 <Button>Edit Profile</Button>
//                 :(<Button onClick={followHandler}>{follow ? "Unfollow" : "Follow"}</Button>)
//             }
//           </Flex>
//         </Flex>

//         <Flex alignItems={"center"} gap={{ base: 1, md: 4 }}>
//           <Text fontSize={{ base: "xs", md: "sm" }}>
//             <Text as={"span"} fontWeight={"bold"} mr={1}>
//               {user?.posts.length}
//             </Text>
//             Posts
//           </Text>
//           <Text
//             fontSize={{ base: "xs", md: "sm" }}
//             onClick={onFrOpen}
//             cursor={"pointer"}
//           >
//             <Text as={"span"} fontWeight={"bold"} mr={1}>
//               {user?.followers.length}
//             </Text>
//             {isFrOpen ? (
//               <FollowersModal isOpen={isFrOpen} onClose={onFrClose} />
//             ) : null}
//             Followers
//           </Text>
//           <Text
//             fontSize={{ base: "xs", md: "sm" }}
//             onClick={onFgOpen}
//             cursor={"pointer"}
//           >
//             <Text as={"span"} fontWeight={"bold"} mr={1}>
//               {user?.followings.length}
//             </Text>
//             Followings
//           </Text>
//           {isFgOpen ? (
//             <FollowingModal isOpen={isFgOpen} onClose={onFgClose} />
//           ) : null}
//         </Flex>
//         <Flex alignItems={"center"} gap={4}>
//           <Text fontSize={"sm"} fontWeight={"bold"}>
//             {user?.username}
//           </Text>
//         </Flex>
//         <Text fontSize={"sm"}>Lorem ipsum dolor sit amet.</Text>
//       </VStack>
//     </Flex>
//   );
// };

// export default Header;
