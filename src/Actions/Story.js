import axios from "axios";
import { newStoryRequest, newStorySuccess ,newStoryFailure} from "../Reducer/Story";


export const createStory = (image) => async (dispatch) => {
    try {
      // console.log("bc");
      dispatch(newStoryRequest(image));
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/story/upload",
        {
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
          },
        withCredentials: true,
        }
      );
      dispatch(newStorySuccess(data.message));
    } catch (error) {
      dispatch(newStoryFailure(error));
    }
  };
  
