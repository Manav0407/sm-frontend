import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Input,
  FormControl,
  Button,
  useToast,
  Box,
  Progress,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { IoMdDoneAll } from "react-icons/io"; 
import app from "../../firebase";
import { createStory } from "../../Actions/Story";
import { loadUser } from "../../Actions/User";
import { clearMessage } from "../../Reducer/Post";

export const StoryModal = ({
  isOpen: isAddOpen,
  onOpen: onAddOpen,
  onClose: onAddClose,
}) => {
  const [img, setImg] = useState();
  const [imgName, setImgName] = useState("Upload Image...");
  const [imgPercent, setImgPercent] = useState(0);
  const [input, setInput] = useState({});
  const [inputImage, setInputImage] = useState();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(e.target.files[0]);
      setImgName(file.name);
      // console.log(reader.result);
    };
  };
  useEffect(() => {
    img && uploadFile(img, "image");
  }, [img]);

  const uploadFile = async (file, fileType) => {
    const storage = getStorage(app);

    const folder = fileType === "image" ? "images/" : null;
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImgPercent(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          setInput((prev) => {
            return {
              ...prev,
              [fileType]: downloadURL,
            };
          });
        });
      }
    );
  };

  const { message } = useSelector((state) => {
    return state.story;
  });

  // console.log(message);
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createStory(input.image));
    dispatch(loadUser());
  };
  const handleClick = (e) => {
    setInputImage(null);
  };

  const toast = useToast();

  const submitToast = (msg) => {
    toast({
      title: "",
      description: `${msg}`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  useEffect(() => {
    if (message) {
      submitToast(message);
      dispatch(clearMessage());
    }
  },[message]);
  return (
    <>
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent bg={"black"}>
          <ModalHeader>Add Story</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={submitHandler}>
              <FormControl>
                <Input
                  type="file"
                  //   hidden
                  //   ref={imgRef}
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Image src={input?.image} mt={5} />
                </FormControl>
                {imgPercent > 0 ? (
                  <Progress hasStripe value={imgPercent} size="sm" mt={4} />
                ) : null}
                {imgPercent === 100 ? (
                  <Box ml={"94%"} mt={3}>
                    <IoMdDoneAll size={25} color="green" />
                  </Box>
                ) : null}
                <Button
                  colorScheme="blue"
                  type="submit"
                  onClick={handleClick}
                  mt={6}
                  ml={"84%"}
                >
                  Post
                </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
