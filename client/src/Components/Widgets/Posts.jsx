import { Box, Typography, IconButton, InputBase, Button,useMediaQuery } from "@mui/material";
import FlexBetween from "./FlexBetweeen";
import Wrapper from "./Wrapper";
import { useEffect, useState } from "react";
import { PostHeader } from "./PostHeader";
import { useSelector } from "react-redux";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import { Comments } from './Comments.jsx'
import { useDispatch } from "react-redux";
import { setPost,setComments } from "../../reduxStore/state";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { PostAdd } from "@mui/icons-material";




export const Posts = ({ id, userId, firstName, lastName, description, picturePath, userPicturePath, likes, date }) => {

    const currentDate = new Date().toLocaleDateString();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const matches = useMediaQuery('(min-width:600px)');
    
    const ide = user._id;
    const dispatch=useDispatch();
    const [commentToggle, setCommentToggle] = useState(false);

    
    const [comment, setComment] = useState([]);
    const [userComment, setUserComments] = useState("");
    const isLiked = Boolean(likes[user._id]);
    const [test,setTest]=useState(false);

    
    const likeCount = Object.keys(likes).length;


    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${id}/like`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        });
        const updatedPost = await response.json();
        setTest(!test);
        
        dispatch(setPost({ post: updatedPost }));
      };


    const addComment = async () => {

        const request = await fetch(`http://localhost:3001/comment/${ide}/${id}`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ description: userComment, name: `${user.firstName} ${user.lastName}`, userPicturePath: user.picturePath })
        });

        const response = await request.json();
        
        dispatch(setComments({comments:response}));
        

    }

    const AllComments = async () => {

        const request = await fetch(`http://localhost:3001/allcomments`, {

            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const response = await request.json();
       
        dispatch(setComments({comments:response}));

    }
    

    const getComments = async () => {

        const request = await fetch(`http://localhost:3001/comment/${id}`, {

            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const response = await request.json();
        
        setComment(response);
   

    }



    const handleComment = () => {
        addComment();
       
        setUserComments("");
    }

    useEffect(() => {
        AllComments();
        getComments();
    }, [])

 

    return (
        <Wrapper className="wrapper" style={{ marginBottom: '20px' }}>
            <Box>
                <Box>
                    <PostHeader fid={userId} firstName={firstName} lastName={lastName} picturePath={userPicturePath} date={date} />
                </Box>
                <Box style={{ marginLeft: '1.5rem', marginRight: '1.5rem', marginBottom: '1rem' }}>
                    <Typography fontSize={16} mb={1}>
                        {description}
                    </Typography>
                    <hr />
                    {picturePath && <img src={`http://localhost:3001/assets/${picturePath}`} alt="" width="100%"
                        height="auto" style={{ borderRadius: '15px' }}
                    />}
                </Box>

                <Box style={{ marginLeft: '1.5rem', marginRight: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton>
                            <ThumbUpRoundedIcon color="info" />
                        </IconButton>
                        <Typography>
                            {likeCount}
                        </Typography>
                    </Box>

                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton>
                            <ModeCommentIcon color="warning" />
                        </IconButton>
                        <Typography>
                            {comment.length}
                        </Typography>
                    </Box>

                </Box>

                <hr />
                <Box style={{ marginLeft: '1.5rem', marginRight: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Box>
                        <IconButton onClick={patchLike}>
                            {isLiked ? <ThumbUpOutlinedIcon color="secondary"/>:<ThumbUpOutlinedIcon />}
                            <Typography>
                                Like
                            </Typography>
                        </IconButton>

                    </Box>

                    <Box>
                        <IconButton onClick={() => {
                            setCommentToggle(!commentToggle);
                        }}>
                            {commentToggle?<ChatBubbleOutlineOutlinedIcon color="error" />:<ChatBubbleOutlineOutlinedIcon />}
                            <Typography>
                                Comment
                            </Typography>
                        </IconButton>

                    </Box>

                    <Box>
                        <IconButton>
                            <ShareOutlinedIcon />
                            <Typography>
                                Share
                            </Typography>
                        </IconButton>
                    </Box>

                </Box>
                <hr />

                {commentToggle && <Box style={{ display: 'flex' }}>
                    <InputBase
                        placeholder="Add a Comment..."
                        onChange={(e) => setUserComments(e.target.value)}
                        value={userComment}
                        sx={{
                            width: "100%",
                            backgroundColor: '#f7f0dc',
                            borderRadius: "2rem",
                            padding: "0.4rem 1rem",
                        }}
                    />
                    {matches? <Button
                        disabled={!userComment}
                        onClick={handleComment}
                        sx={{
                            color: "#97d1c6",
                            backgroundColor: "#6f948d",
                            borderRadius: "1rem",
                            marginLeft: "0.5rem",
                            
                        }}
                    >
                        Comment
                    </Button>:<IconButton disabled={!userComment}
                        onClick={handleComment}><PostAdd/></IconButton>}
                   
                </Box>} 


               {commentToggle && <Comments ide={ide} postIden={id} /> }

            </Box>

        </Wrapper>
    )

}