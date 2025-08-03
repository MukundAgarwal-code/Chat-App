import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        onlineUsers:null,
    },
    reducers:{
        setAuthUser:(state,action)=>{           //login.jsx se la rhe hai
            state.authUser = action.payload;
        },
        setOtherUsers:(state, action)=>{        //useGetOtherusers ka hook se la rhe 
            state.otherUsers = action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        }
    }
});
export const {setAuthUser,setOtherUsers,setSelectedUser,setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;