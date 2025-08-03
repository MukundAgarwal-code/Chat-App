import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import {useSelector} from "react-redux";


const OtherUsers = () => {
    // my custom hook ko call    (yeh store me store kara diya phir store se lelo)
    useGetOtherUsers();
    const {otherUsers} = useSelector(store=>store.user);
    if (!otherUsers) return; // early return in react
     
    return (
        <div className='overflow-auto flex-1'>
            {
                otherUsers?.map((user)=>{    //user ko otheruser.jsx me bhej diye
                    return (
                        <OtherUser key={user._id} user={user}/>
                    )
                })
            }
            
        </div>
    )
}

export default OtherUsers