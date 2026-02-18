import axios from "axios";
import { serverUrl } from "../App";
import { setuserData, setLoading } from "../redux/userSlice";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/currentUser`, {
      withCredentials: true,
    });
    dispatch(setuserData(result.data));
    console.log(result.data);
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      serverUrl + "/api/notes/generate-notes",
      payload,
      { withCredentials: true },
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
