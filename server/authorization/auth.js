import jwt from "jsonwebtoken";
import axios from "axios"

export const verifytoken=(req,res,next)=>{

    try
    {
        const authHeader=req.header('authorization');
        console.log(authHeader);
    
        if(!authHeader)
        {
           return res.status(500).json({message:"NOT AUTHORIZED"});
        }
    
        const token=authHeader.split(" ")[1]; /* authHeader starts with Bearer word and then a space so we are splitting the word in 2 part and getting the second part*/
    
        jwt.verify(token,process.env.JWT_TOKEN_SEECRET,(err,user)=>{
            if(err)
            {
                res.status(403).json({err}); 
            }
    
            req.user=user;
            next();
        });
    }
    catch(err)
    {
        console.log({message:err.message});
    }

}

export const createChatUser=async(req,res,next)=>{

    try{

        const {
            firstName,
            lastName,
            email,
            picturePath
          } = req.body;

          const image=`http://localhost:3001/assets/${picturePath}`
          console.log(image);
        const r=await axios.put("https://api.chatengine.io/users/",
        {username:firstName,secret:firstName,first_name:firstName,email:email,last_name:lastName},
        {headers:{"private-key":"58f00d7c-01a0-4703-95e2-af98ea86dfd2"}})

         console.log(r.data);
         
      }
      catch(err)
      {
            console.log(err.message);
      }

      next();
}