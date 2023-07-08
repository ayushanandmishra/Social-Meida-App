import {
  
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider } from "@mui/material";
import Photo from "./Photo";
import FlexBetween from "./FlexBetweeen";
import Wrapper from "./Wrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


const UserProfile = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = '#060614';
    const medium = '#b8b8d4';
    const main = '#381347';

    const getUser = async () => {

        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
        aboutSelf,
        workingLocation,
        worksAt

    } = user;

    return (
        <Wrapper>
            {/* FIRST ROW */}
            <Box

                pb="1.1rem"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Photo image={picturePath} size="120px" />
                <FlexBetween gap="1rem">

                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1em 0em' }} >
                        <Typography
                            onClick={() => navigate(`/user/${userId}`)}
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: 'gray',
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </FlexBetween>
            </Box>

            <Divider />

            {/* SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>From</Typography>
                    <Typography fontWeight="600" color={dark}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>Works At</Typography>
                    <Typography fontWeight="600" color={dark}>{worksAt}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <HomeOutlinedIcon fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>Lives in</Typography>
                    <Typography fontWeight="600" color={dark}>{workingLocation}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                        About me!
                    </Typography>
                    <Typography color={medium}>{aboutSelf} </Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            {/* <Box p="1rem 0" style={{ textAlign: 'center' }}>
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <a href=""><img src={twitter} alt="twitter" /></a>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Twitter
                                </Typography>

                            </Box>
                        </FlexBetween>

                    </FlexBetween>

                    <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
                            <a href="" ><img src={linkedin} alt="linkedin" /></a>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Linkedin
                                </Typography>

                            </Box>
                        </FlexBetween>

                    </FlexBetween>

                </Box>
                <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                    <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
                            <a href="" ><img src={github} alt="linkedin" /></a>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Github
                                </Typography>

                            </Box>
                        </FlexBetween>

                    </FlexBetween>

                    <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
                            <a href="" ><img src={slack} alt="linkedin" /></a>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Slack
                                </Typography>

                            </Box>
                        </FlexBetween>

                    </FlexBetween>

                </Box>

            </Box> */}
        </Wrapper>
    );
};

export default UserProfile;
