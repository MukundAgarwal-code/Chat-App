import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";
import { useEffect } from "react";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user); // Get the currently selected user from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true; // Send cookies with the request
        // Get messages of the selected user
        const res = await axios.get(
          `${BASE_URL}/api/v1/message/${selectedUser?._id}`
        );
        dispatch(setMessages(res.data)); // Save messages in Redux
      } catch (error) {
        console.log(error); // Log error if request fails
      }
    };
    fetchMessages(); // Run function when selected user changes
  }, [selectedUser?._id, setMessages]); // Re-run when user changes
};

export default useGetMessages;
