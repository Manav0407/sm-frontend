import { Image,Box } from '@chakra-ui/react'
import Footer from './Footer'
import Header from './Header'

const Main = ({img,username,avatar}) => {
  return (
    <>
        <Box my={2} borderRadius={4} overflow={"hidden"}>
             <Image src={img} w={"full"} h={"80vh"}/>
        </Box>
    </>                                                     
  )
}

export default Main