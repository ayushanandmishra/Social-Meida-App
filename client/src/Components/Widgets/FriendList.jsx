import { Box, Typography, } from "@mui/material";

import Wrapper from "./Wrapper";

import { useSelector,useDispatch } from "react-redux";
import { setFriends } from "../../reduxStore/state";
import { useEffect, useState } from "react";
import { Friend } from "./Friend";

export const FriendList=()=>{

    const user=useSelector((state)=>state.user);
    const token=useSelector((state)=>state.token);
    const dispatch=useDispatch();
    const userId=user._id;
   
    const friends=user.friends;

    const findFreinds=async()=>{

        const request=await fetch(`http://localhost:3001/users/${userId}/friends`,{
            method:'GET',
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        const response=await request.json();
        
        dispatch(setFriends({friends:response}));
    }

    useEffect(()=>{
        findFreinds()
    },[])
    

    return(
        <Wrapper>
            <Box style={{display:'flex',flexDirection:'column'}}>

               <Box style={{paddingLeft:'1.5rem'}}>
               <Typography variant="h5">
                    Friend List
                </Typography>
               </Box>
             {friends.map(({
                _id,
                firstName,
                lastName,
                occupation,
                picturePath
             })=>{
               return <Friend key={_id}  picturePath={picturePath} firstName={firstName} lastName={lastName} fid={_id} />
             })}
            </Box>
        </Wrapper>
    )

}