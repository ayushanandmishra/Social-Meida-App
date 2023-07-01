import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { login, register } from "./impFunctions/Signup.js";
import { verifytoken,createChatUser } from "./authorization/auth.js";
import { createPost,getFeedPost,getUserPost,likePost } from "./impFunctions/Post.js";
import { getUser,getUserFriend,addRemoveFriends} from "./impFunctions/User.js";
import { addComment,getPostComment,deleteComment, getAllComments } from "./impFunctions/Comments.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   return cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
    //return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


/*POST ROUTES*/
app.post("/auth/register",upload.single('picture'),createChatUser,register);
app.post("/posts",upload.single('picture'),verifytoken,createPost);


app.post("/auth/login",login);

app.get("/users/:userId",getUser);
app.get("/users/profile/:userId",getUser);
app.get("/users/:userId/friends",getUserFriend);

app.patch("/users/:userId/:fid",addRemoveFriends);

app.get("/posts",getFeedPost);
app.get("/posts/:userId",getUserPost);

app.post("/comment/:userId/:postId",addComment);

app.get("/comment/:postId",getPostComment);
app.get("/allcomments",getAllComments);
app.delete("/comment/:id",deleteComment);


app.patch("/posts/:id/like",likePost);
// const data={
//   firstName: "Ayush", 
//     lastName: "Anand",
//     email: "aaaaaaa@gmail.com",
//     password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
//     picturePath: "p1.jpeg",
//     friends: [],
//     location: "San Fran, CA",
//     occupation: "Software Engineer",
// }

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(data);
    // Post.insertMany(posts);


  })
  .catch((error) => console.log(`${error} did not connect`));

