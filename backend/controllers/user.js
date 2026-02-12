import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const signupUser = async (req, res) => {
  try {
    const { username, email, password, phone, image } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.status(401).json("User already create Please login");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
      phone: phone,
      profileImage: image,
    });

    await newUser.save();
    res.status(200).json("user created successfully");
  } catch (e) {
    console.log(e);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json("User not found Please signup");
    }

    const verifyPassword = await bcrypt.compare(password, foundUser.password);

    if (!verifyPassword) {
      return res.status(401).json("Wrong password !");
    }

    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.JWT_SECRETE,
    );
    res.status(200).json({ token: token });
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};
