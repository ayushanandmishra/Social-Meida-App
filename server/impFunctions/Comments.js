import Comment from "../models/Comments.js";


export const addComment=async(req,res)=>{

    try
    {
        const {userId,postId}=req.params;
        const {description,name,userPicturePath}=req.body;
        
        const newComment=new Comment({
            userId,
            postId,
            description,
            name,
            userPicturePath
        })

        await newComment.save();
        const comment=await Comment.find();

        res.status(201).json(comment);

    }
    catch(err)
    {
        console.log({message:err.message});
    }

}


export const getPostComment=async(req,res)=>{

    try
    {
        const {postId}=req.params;

        const comments=await Comment.find({postId});

        res.status(200).json(comments);

    }
    catch(err)
    {
        console.log({message:err.message});
    }

}


export const getAllComments=async(req,res)=>{

    try
    {
        const comments=await Comment.find();
       
        res.status(200).json(comments);

    }
    catch(err)
    {
        console.log({message:err.message});
    }

}


export const deleteComment=async(req,res)=>{
    
    try
    {
        const _id=req.params.id;
        const {postId}=req.params;
        const deleted=await Comment.findByIdAndDelete(_id,{new:true});
       
        res.status(200).json(deleted);

    }
    catch(err)
    {
        console.log({message:err.message});
    }

}

