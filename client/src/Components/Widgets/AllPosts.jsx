import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setPosts } from "../../reduxStore/state";
import { Posts } from "./Posts";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

export const AllPost=({userId,ishomePage=true})=>{ 

    const dispatch=useDispatch();
    const token=useSelector((state)=>state.token);
    const totalPosts=useSelector((state)=>state.posts);

  
    const getFeedPosts=async()=>
    {
     
        const feedPostrequest=await fetch(`http://localhost:3001/posts`,{
            method:"GET",
            headers:{
                authorization: `Bearer ${token}`
            }
        });
    
        const feedPosts=await feedPostrequest.json();
     
        dispatch(setPosts({posts:feedPosts}));
    }
   
   
    const getUserPosts=async()=>{ 

      
        const userPostrequest=await fetch(`http://localhost:3001/posts/${userId}`,
        {   
            method:"GET",
            headers:{
                authorization: `Bearer ${token}`
            }
        });
        
        const userPosts=await userPostrequest.json();
        console.log(userPosts);
        dispatch(setPosts({posts:userPosts}));
    }
  
    useEffect(()=>{
        if(ishomePage)
        {
         getFeedPosts();
        }
        else
        {
            getUserPosts();
        }
        
    },[])

    return(
        <div>
         
            {totalPosts.map(({
                _id,
                userId,
                firstName,
                lastName,
                description,
                picturePath,
                userPicturePath,
                likes,
                comments,
                date
            })=>{
                return <Posts key={_id} id={_id} userId={userId} firstName={firstName} lastName={lastName} description={description} picturePath={picturePath} userPicturePath={userPicturePath} likes={likes} comment={comments} date={date}/>
            })}
           
        </div>
    )

}