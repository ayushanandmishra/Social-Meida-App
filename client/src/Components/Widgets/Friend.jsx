import { Box, Typography, Divider,Button } from "@mui/material";
import Photo from "./Photo";
import FlexBetween from "./FlexBetweeen";
import Wrapper from "./Wrapper";

import { useSelector,useDispatch } from "react-redux";
import { setFriends } from "../../reduxStore/state";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Friend=({fid,picturePath,firstName,lastName})=>{

    const [toggle,setToggle]=useState(true);
    const user=useSelector((state)=>state.user);
    const token=useSelector((state)=>state.token);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const userId=user._id;
    const friends=user.friends;

    // const isFriend=()=>
    // {
    //     for(let f of friends)
    // {
    //     if(f===fid)
    //     {
    //         return true;
    //     }
    // }
    // return false;
    // }
    
    
    const handleNavigate=()=>{

        navigate(`/user/${fid}`);
    }

    const handleFriends=async()=>
    {
        setToggle(!toggle);
        console.log("handle");
    const request=await fetch(`http://localhost:3001/users/${userId}/${fid}`,
    {
        method:'PATCH',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-type':'application/json'
        }
    })

    

    const response=await request.json();
    console.log(response);
    dispatch(setFriends({friends:response})); 

    }

    return(
        <Box>
            <Wrapper>
                <FlexBetween>
                    <Box style={{display:'flex', alignItems:'center'}}>
                    <Photo image={picturePath}/>
                    <Box>
                    <Typography onClick={handleNavigate} marginLeft={1} variant="h6"
                            
                            color={'#060614'}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: 'gray',
                                    cursor: "pointer",
                                },
                            }}>
                    {firstName} {lastName} 
                    </Typography>
                    <Typography marginLeft={1} color={'#b8b8d4'}>
                        Educator
                    </Typography>
                    </Box> 
                    </Box>
                    {toggle?<Button variant="outlined" color="error" onClick={handleFriends}>Remove</Button>:<Button variant="outlined" color="success" onClick={handleFriends}>Add Friend</Button> /*the patchFriend function is async so you cant send it easy was*/}
                    
                </FlexBetween>
            </Wrapper>
        </Box>
    )

}