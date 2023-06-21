import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Registering the account*/
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      aboutSelf,
      workingLocation,
      worksAt


    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        picturePath,
        friends,
        location,
        occupation,
        aboutSelf,
        workingLocation,
        worksAt
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.status(500).json({ message: "User doesn't exist" });
    }
    /*the salt data is inside the password so we dont need to give salt as well while comapring*/
    const passwordMatch =await bcrypt.compare(password, findUser.password);
    

    if (!passwordMatch)
    {
      return res.status(400).json({ msg: "Invalid credentials. " });
    } 


    const objectToSerialize = { id: findUser._id };

    const accessToken = jwt.sign(
      objectToSerialize,
      process.env.JWT_TOKEN_SEECRET
    );

    delete findUser.password;
    res.status(200).json({ user: findUser, token: accessToken });
  
    

  } catch (err) {
    res.status(500).json(err);
  }
};
