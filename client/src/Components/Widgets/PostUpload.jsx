import {
    EditOutlined,
    DeleteOutlined,

    ImageOutlined,
   
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "./FlexBetweeen";
  import Dropzone from "react-dropzone";
  import Photo from "./Photo";
  import Wrapper from "./Wrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "../../reduxStore/state";
  
  const PostUpload = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
  
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
   
    const media = useMediaQuery("(min-width: 1000px)");
    
  
    const handlePost = async () => {
      const formData = new FormData();
      const currentDate= new Date().toLocaleDateString();
    

      formData.append("userId", user._id);
      formData.append("date",currentDate);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
      console.log(formData);
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers:{
          authorization:`Bearer ${token}`
        },
        body: formData,
      });
      const posts = await response.json();
     
      dispatch( setPosts( {posts} ));
      setImage(null);
      setPost("");
    };
  
    return (

        <Box
        width="100%"
        padding="0rem 0rem 2rem 0rem"
        display={media ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
        flexBasis={media ? "100%" : undefined}
        mt={media ? undefined : "2rem"}
      >
        <Wrapper>
        <FlexBetween gap="1.5rem">
          <Photo image={picturePath} />
          <InputBase
            placeholder="Write Something.."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: '#f7f0dc',
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
           <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: 'gray' }} />
            <Typography
              color={'gray'}
              sx={{ "&:hover": { cursor: "pointer", color: 'white' } }}
            >
              Image
            </Typography>
          </FlexBetween>
        </FlexBetween>

        
        {isImage && (
          <Box
            border={`1px solid ${'white'}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed 
                    #787367
                    `}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Drag or drop your image here </p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween style={{justifyContent:'center'}}>
       
  
          <Button
            disabled={!post && !image}
            onClick={handlePost}
            sx={{
              color: "#97d1c6",
              backgroundColor: "#6f948d",
              borderRadius: "3rem",
              marginLeft:"0.5rem"
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </Wrapper>
        </Box>
      </Box>

        
      
    );
  };
  
  export default PostUpload;
  