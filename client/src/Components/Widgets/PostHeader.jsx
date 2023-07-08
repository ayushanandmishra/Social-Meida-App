import { Box, Typography, Divider,Button } from "@mui/material";
import Photo from "./Photo";
import FlexBetween from "./FlexBetweeen";
import Wrapper from "./Wrapper";

import { useSelector,useDispatch } from "react-redux";
import { setFriends } from "../../reduxStore/state";

import { useNavigate } from "react-router-dom";


export const PostHeader=({fid,picturePath,firstName,lastName,date})=>{

    
    const user=useSelector((state)=>state.user);
    const token=useSelector((state)=>state.token);
    const currentDate= new Date().toLocaleDateString();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const userId=user._id;
    const friends=user.friends;


    const dark = '#060614';
    const medium = '#b8b8d4';
    const main = '#381347';

    const isFriend=()=>
    {
        for(let f of friends)
        {
            if(f._id===fid)
            {
                return true;
            }
        }
        return false;
    }
    
    

    const handleFriends=async()=>
    {
       
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

    dispatch(setFriends({friends:response})); 

    }

    const handleNavigate=()=>{

        navigate(`/user/${fid}`);
    }

    return(
        <Box style={{backgroundColor:'rgba(250, 234, 234, 0)'}}>
            <Wrapper style={{backgroundColor:'rgba(250, 245, 245, 0.1)'}}>
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
                    <Typography marginLeft={1} fontSize={14} color={dark}>
                      Posted On: {date}
                    </Typography>
                    </Box> 
                    </Box>
                    {(fid!==userId ) && (isFriend()?<Button variant="outlined" color="error" onClick={handleFriends}>Remove</Button>:<Button variant="outlined" color="success" onClick={handleFriends}>Add Friend</Button>) /*the patchFriend function is async so you cant send it easy was*/}
                    
                </FlexBetween>
            </Wrapper>
        </Box>
    )

}