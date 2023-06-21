import { Box,Typography,Button } from "@mui/material"
import FlexBetween from "./FlexBetweeen"
import { useSelector } from "react-redux"


export const Comments=({comments,ide,allComments})=>{

    const token=useSelector((state)=>state.token);
    const c=useSelector((state)=>state.comments);
   
    const deleteComment=async(_id)=>{

        const request=await fetch(`http://localhost:3001/comment/${_id}`,{
            method:'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        const response=await request.json();
        handleState(response);
    }

    return(
        <Box style={{ marginLeft: '1.5rem', marginRight: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

        {c.map(({ _id,description, name,userId }) => {
        return (

            <FlexBetween key={_id} style={{ backgroundColor: 'red', width: '80%', borderRadius: '5px'}}>
                <div style={{display:'flex',overflow:'hidden',maxWidth:'100%'}}>
                <Typography>
                    {name} :
                </Typography>
                <Typography noWrap={true}>
                    {description}
                </Typography>
                </div>
              
                {(ide===userId) && <Button onClick={()=>{deleteComment(_id)}}>Delete</Button>}
            </FlexBetween>

        )
    })}
        </Box>
    )
}