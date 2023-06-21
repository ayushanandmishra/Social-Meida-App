import User from "../models/User.js";

export const getUser=async(req,res)=>{

    try
    {
    
        const {userId}=req.params;
       
        const user=await User.findById(userId);
       
        res.status(201).json(user);
    }
    catch(err)
    {
        console.log({messageeee:err.message});
    }

}


export const getUserFriend=async(req,res)=>
{ 
    try
    {
        const {userId}=req.params;
        const user=await User.findById(userId);
        const friendIds=user.friends;
      

        const friends=await Promise.all(friendIds.map((id)=>{
            return User.findById(id)
        }))
               

        const friendsData=friends.map(({_id,firstName,lastName,picturePath})=>{
            return {_id,firstName,lastName,picturePath}
        })

     

        res.status(201).json(friendsData);
    
    
    }
    catch(err)
    {
        console.log({message:err.message});
    }
}

export const addRemoveFriends=async(req,res)=>
{
    try
    {
        const {userId,fid}=req.params;
        console.log(fid);
        const user=await User.findById(userId);
        const friend=await User.findById(fid);
       console.log(friend);

        if (user.friends.includes(fid)) {
            user.friends = user.friends.filter((id) => id !== fid);
            friend.friends = friend.friends.filter((id) => id !== userId);
          } else {
            user.friends.push(fid);
            friend.friends.push(userId);
          }
          await user.save();
          await friend.save();
      
          const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
          );
          const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );
      
          res.status(200).json(formattedFriends);
    }
    catch(err)
    {
      console.log({message:err.message});
    }
}