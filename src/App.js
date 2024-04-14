import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
import PageLayout from "./layouts/pagelayout/pageLayout";
import Stories from "./stories";
import ProfilePage from "./pages/ProfilePage";
import { useToast } from "@chakra-ui/react";
import Temp from "./components/Temp";
import EditProfile from "./components/EditProfile/EditProfile";
import UpdatePassword from "./components/updatePassword/UpdatePassword";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import { clearMessage } from "./Reducer/Post";
import { clearError } from "./Reducer/Post";
import { clearErrors } from "./Reducer/User";
import Search from "./components/search/Search";
import Message from "./components/messaging/Message";
function App() {
  const dispatch = useDispatch();

  // const toast = useToast();
  // const { message,error,loading } = useSelector((state) => {
  //   return state.post;
  // });

  // const {message:userMsg,error:userError} =useSelector((state)=>{
  //   return state.user;
  // })

  // console.log(userMsg);
  // const submitToast = (msg,x) => {
  //   toast({
  //     title: "",
  //     description: `${msg}`,
  //     status: x,
  //     duration: 3000,
  //     isClosable: true,
  //     position: "bottom-left",
  //   });
  // };

  // console.log(message);
  // const s = "success";
  // const e = "error";
  // useEffect(() => {
  //   if (message) {
  //     submitToast(message,s);
  //     // dispatch(clearMessage());
  //   }
  //   else if(userMsg)
  //   {
  //     submitToast(userMsg,s);
  //     dispatch(clearMessage());
  //   }
  //   else if(error)
  //   {
  //     submitToast(error,e);
  //   }
  //   else if(userError)
  //   {
  //     submitToast(userError,e);
  //     dispatch(clearErrors());
  //   }
   
  // },[message,userError,userMsg,error]);

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:id" element={<ProfilePage />} />
          <Route path="/editprofile" element={<EditProfile/>} />
          <Route path="/update/password" element={<UpdatePassword/>}/>
          <Route path="/forgot/password" element={<ForgotPassword/>} />
          <Route path="/password/reset/:id" element={<ResetPassword/>} />
          <Route path="/search" element={<Search/>}/>
        <Route path="/messages" element={<Message/>}/>
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
