import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
} from "@chakra-ui/react";
import Suggest from "../sggestUser/Suggest";

export const LikeModal = ({ isOpen:isLikeOpen, onOpen:onLikeOpen, onClose:onLikeClose, likes }) => {
  return (
    <>
      <Modal isOpen={likes.length!== 0 && isLikeOpen} onClose={onLikeClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Likes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {likes?.map((like) => (
              <Flex pb={4}>
              <Suggest 
                key={like._id}
                name={like.username}
                avatar={like.avatar.url}
                followers={like.followers.length}
              />
              </Flex>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
