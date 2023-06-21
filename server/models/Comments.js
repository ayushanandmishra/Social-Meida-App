import mongoose from "mongoose";


const commentSchema=mongoose.Schema(
    {
        postId:String,
        userId:String,
        description:String,
        name:String,
        userPicturePath:String
    }
)

const Comment=mongoose.model("Comment",commentSchema);
export default Comment;