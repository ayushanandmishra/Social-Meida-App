import { Box,Typography,Button,IconButton,useMediaQuery } from "@mui/material"
import FlexBetween from "./FlexBetweeen"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setComments } from "../../reduxStore/state"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom"


export const Comments=({ide,postIden})=>{

    const token=useSelector((state)=>state.token);
    const c=useSelector((state)=>state.comments);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const filteredComments=c.filter(({postId})=>{
        return postId===postIden
    })

   

    const reduxDeleteComment=(commetId)=>{
        const d=c.filter(({_id})=>{
            return _id!==commetId
        });
        console.log(d);
        dispatch(setComments({comments:d}));
    }

    const deleteComment=async(_id)=>{

        reduxDeleteComment(_id);
        const request=await fetch(`http://localhost:3001/comment/${_id}`,{
            method:'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        const response=await request.json();
    }


    const handleNavigate=(fid)=>{

        navigate(`/user/${fid}`);
    }

    return(
        <Box style={{ marginLeft: '1.5rem', marginRight: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center',maxWidth:'100%' }} >

        {filteredComments.map(({ _id,description, name,userId }) => {
        return (

            <FlexBetween key={_id}  style={{  width: '80%', borderRadius: '5px',height:'auto',padding:'5px',marginTop:'0.5rem'}}>
                <div style={{display:'flex',maxWidth:'100%'}}>
                <Typography onClick={()=>{handleNavigate(userId)}} style={{fontFamily: 'Poppins',marginRight:'0.2rem',backgroundColor: '#faf4cf',padding:'0.3rem',borderRadius:'3px'}}
                      sx={{
                        "&:hover": {
                            color: 'gray',
                            cursor: "pointer",
                        },
                    }}>
                    {name} :
                </Typography>
                <Typography style={{fontFamily: 'Poppins',backgroundColor: '#faf4cf',padding:'0.3rem',maxWidth:'100%',borderRadius:'3px'}}>
                    {description}
                </Typography>
                </div>
                
                {(ide===userId) && <IconButton style={{marginLeft:'0.5rem'}} color="error" onClick={()=>{deleteComment(_id)}}><DeleteOutlineOutlinedIcon/></IconButton>}
            </FlexBetween>
           

        )
    })}
        </Box>
    )
}