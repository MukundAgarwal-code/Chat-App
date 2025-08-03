import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",  // Slice name for Redux
    initialState:{
        messages: null, // Store all chat messages
    },
    reducers:{
        // Update messages in state
        setMessages: (state, action) => {
            state.messages = action.payload; 
        }
    }
});

export const { setMessages } = messageSlice.actions; // Export action
export default messageSlice.reducer; // Export reducer



//This slice stores chat messages in Redux.

//setMessages is used to update the messages (e.g., when we fetch from the API).