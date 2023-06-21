import { setLogout } from "../../reduxStore/state"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "../NavBar/Navbar2";
import UserProfile from "../Widgets/Profile";
import { Box, useMediaQuery } from "@mui/material";
import PostUpload from "../Widgets/PostUpload";
import { useParams } from "react-router-dom";
import { Friend } from "../Widgets/Friend";
import { FriendList } from "../Widgets/FriendList";
import { Posts } from "../Widgets/Posts";
import { AllPost } from "../Widgets/AllPosts";
import { useEffect, useState } from "react";
import './Userpage.css'

export default function UserPage()
{
    const [user, setUser] = useState({});
    const { userId } = useParams();
    const principalUser=useSelector((state)=>state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
   
    const [canPost,setCanPost]=useState(false);
    const getUser = async () => {
      
      const response = await fetch(`http://localhost:3001/users/profile/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data);
      setUser(data);
      
    };
  
    useEffect(() => {
      getUser();
      setCanPost(()=>{
        if(userId===principalUser._id)
        {
          return true;
        }
        return false;
      })
    }, []); 

    if (!user) {
      return null;
  }

    

        return (
            <Box>
            <PrimarySearchAppBar />
            <Box
                
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
               
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                   <UserProfile userId={userId} picturePath={user.picturePath} /> 
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                        mt={isNonMobileScreens ? undefined : "2rem"}>
                  {canPost && <PostUpload picturePath={user.picturePath}/>}
                    <AllPost userId={userId} ishomePage={false}/>
                </Box>
                          

            </Box>

        </Box>
        )
}