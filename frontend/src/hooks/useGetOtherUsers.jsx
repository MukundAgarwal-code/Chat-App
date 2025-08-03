import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();    //use slice me store karane ke liye

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;     //backed me getotheruser route se phele middleware hai isiliye ye likhna hoga
                const res = await axios.get(`${BASE_URL}/api/v1/user`);
               //jo mil rha usko //redux  store ka userSlice me store
                console.log("other users -> ",res);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();    //jaise hi home page par visit ho waise hi ye wala func call ho jayega ek bar
    }, []  )//1 hi  bar yeh use effect chale

}

export default useGetOtherUsers