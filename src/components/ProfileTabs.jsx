import { Box, Flex ,Text} from '@chakra-ui/react'
import React from 'react'
import { BsGrid3X3 } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { FaUserTag } from "react-icons/fa";
const ProfileTabs = () => {
  return (
    <Flex
    w={"full"}
    justify={"center"}
    gap={{base:4,sm:10}}
    fontWeight={"bold"}
    textTransform={"uppercase"}
    >
        <Flex
        borderTop={"1px solid white"}
        alignItems={"center"}
        gap={1}
        p={3}
        cursor={"pointer"}

        >
            <Box fontSize={20}>
                <BsGrid3X3/>
            </Box>
            <Text fontSize={12} display={{base:"none",sm:"block"}}>
                Posts
            </Text>

        </Flex>

        <Flex
        alignItems={"center"}
        gap={1}
        p={3}
        cursor={"pointer"}

        >
            <Box fontSize={20}>
                <CiBookmark/>
            </Box>
            <Text fontSize={12} display={{base:"none",sm:"block"}}>
                Saved
            </Text>

        </Flex>

        <Flex
        alignItems={"center"}
        gap={1}
        p={3}
        cursor={"pointer"}

        >
            <Box fontSize={20}>
                <FaUserTag/>
            </Box>
            <Text fontSize={12} display={{base:"none",sm:"block"}}>
                Tagged
            </Text>

        </Flex>

    </Flex>
  )
}

export default ProfileTabs