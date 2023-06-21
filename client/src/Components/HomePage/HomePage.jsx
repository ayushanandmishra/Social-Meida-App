import { setLogout } from "../../reduxStore/state"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "../NavBar/Navbar2";
import UserProfile from "../Widgets/Profile";
import { Box, useMediaQuery } from "@mui/material";
import PostUpload from "../Widgets/PostUpload";
import { Friend } from "../Widgets/Friend";
import { FriendList } from "../Widgets/FriendList";
import { Posts } from "../Widgets/Posts";
import { AllPost } from "../Widgets/AllPosts";
import "./Homepage.css"

export default function HomePage() {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setLogout());

        navigate('/');
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
                    <UserProfile userId={user._id} picturePath={user.picturePath} />
                    
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                        mt={isNonMobileScreens ? undefined : "2rem"}>
                            
                    <PostUpload picturePath={user.picturePath} />
                    <AllPost userId={user._id}/>
                </Box>

                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                   <FriendList/>
                    
                </Box>             

            </Box>
            

        </Box>

    )
}